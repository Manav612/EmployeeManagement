const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');
const port = 3001;
const http = require("http")
const server = http.createServer(app);
const {Server}=require("socket.io")
const io = new Server(server)
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
  .connect(
    'mongodb+srv://manavproject6:Project123@cluster0.iemysft.mongodb.net/',
  )
  .then(() => console.log('connectdddd'))
  .catch(e => console.log(e));
// mongoose.connect('mongodb+srv://admin:admin123@cluster0.zr6n7bw.mongodb.net/Cluster0?retryWrites=true&w=majority').then(()=>console.log("connected")).catch((e)=>console.log("error",e))
console.log('hello');

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming messages from the client
  socket.on('send-message', (message) => {
    console.log(`Message from client: ${message}`);

    // Broadcast the message to all connected clients
    io.emit('recive-message', message);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  socket.on('send_message',(data)=>{
    console.log("data",data);
    io.emit('recived_message',data);
  })
  socket.on('Accept_Request',(data)=>{
    console.log("data",data);
    io.emit('Send_Request',data);
  })
  socket.on('Accept_start_code',(data)=>{
    console.log("data",data);
    io.emit('Send_start_code',data);
  })
  socket.on('Complete_code',(data)=>{
    console.log("data",data);
    io.emit('Send_complete_code',data);
  })
  socket.on('Complete_Busy',(data)=>{
    console.log("hreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    console.log("data",data);
    io.emit('Send_complete_Busy',data);
  })
  socket.on('Reject',(data)=>{
    console.log("data",data);
    io.emit('Reject_Send',data);
  })
  socket.on('Review_Complete',(data)=>{
    console.log("data",data);
    io.emit('Send_Review_Complete',data);
  })
  socket.on('Review_Cancel',(data)=>{
    console.log("data",data);
    io.emit('Send_Review_Cancel',data);
  })
  socket.on('Complete_payment',(data)=>{
    console.log("data",data);
    io.emit('Send_complete_payment',data);
  })
  socket.on('Location_ChangeSP',(data)=>{
    console.log("data",data);
    io.emit('Send_Location_ChangeSP',data);
  })
  socket.on('Location_ChangeCLI',(dataa)=>{
    console.log("came```````````````````````````````````````");
    console.log("dataofCLI",dataa);
    io.emit('Send_Location_ChangeCLI',dataa);
  })
  socket.on('send_categories',(categories)=>{
    io.emit('broadcast_categories',categories)
  })
  socket.on('send_changing_data',(changingData)=>{
    io.emit('recived_changing_data',changingData)
  })
    socket.on('disconnect',()=>{
     console.log("user disconnected");
    })
});



server.listen(port, () => {
  console.log('Server is running on port 3001');
});

const Employee = require('./models/employee');
const Attendance = require('./models/attendance');
// endpoint to register a employee

app.post('/addEmployee', async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      joiningDate,
      dateOfBirth,
      phoneNumber,
      activeEmployee,
      address,
      createdAt,
      salary,
    } = req.body;

    // create a new Employee
    console.log(designation, employeeName);

    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      joiningDate,
      dateOfBirth,
      phoneNumber,
      activeEmployee,
      address,
      createdAt,
      salary,
    });

    await newEmployee.save();
    res
      .status(201)
      .json({message: 'Employee saved successfully', employee: newEmployee});
  } catch (error) {
    console.log('Error creating employee', error);
    res.status(500).json({message: 'Failed to add an employee'});
  }
});

// endpoint to fetch all employees

app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({message: 'Failed to retrieve the employee'});
  }
});

// endpoint to mark attendance for specific employee

app.post('/attendance', async (req, res) => {
  try {
    const {employeeId, employeeName, date, status} = req.body;

    const existingAttendance = await Attendance.findOne({
      employeeId,
      employeeName,
      date,
      status,
    });

    if (existingAttendance) {
      existingAttendance.status = status;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      const newAttendance = new Attendance({
        employeeId,
        employeeName,
        date,
        status,
      });
      await newAttendance.save();
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    res.status(500).json({message: 'Failed to mark attendance'});
  }
});

app.get('/attendance', async (req, res) => {
  try {
    const {date} = req.query;
    const attendance = await Attendance.find({date: date});
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({message: 'Failed to retrieve attendance'});
  }
});

app.get("/attendance-report-all-employees", async (req, res) => {
  try {
    const { month, year } = req.query;

    console.log("Query parameters:", month, year);
    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
      console.log("SSs",startDate);
    const endDate = moment(startDate).endOf("month").toDate();
    // console.log("asdasd",end);

    // Aggregate attendance data for all employees and date range
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.year),
                ],
              },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$employeeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $lookup: {
          from: "employees", // Name of the employee collection
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails", // Unwind the employeeDetails array
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          holiday:1,
          name: "$employeeDetails.employeeName",
          designation:"$employeeDetails.designation",
          salary: "$employeeDetails.salary",
          employeeId: "$employeeDetails.employeeId",
        },
      },
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Error generating the report" });
  }
});

// Add this route after the "/attendance-report-all-employees" route

app.get("/attendance-report-employee/:employeeId", async (req, res) => {
  try {
    const { month, year } = req.query;
    const employeeId = req.params.employeeId;

    console.log("Query parameters:", month, year, "Employee ID:", employeeId);

    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Aggregate attendance data for the specific employee and date range
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.year),
                ],
              },
              {
                $eq: ["$employeeId", mongoose.Types.ObjectId(employeeId)],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$employeeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $lookup: {
          from: "employees", // Name of the employee collection
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails", // Unwind the employeeDetails array
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          holiday: 1,
          name: "$employeeDetails.employeeName",
          designation: "$employeeDetails.designation",
          salary: "$employeeDetails.salary",
          employeeId: "$employeeDetails.employeeId",
        },
      },
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Error generating the report" });
  }
});
