const express = require('express');
const cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3001;
app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
  console.log('a user connected');
// setTimeout(() => {
//   // socket.send("event triggered")
//   // we can also send data like object or things
//   let obj={
//     channame:"jefbhbfh",
//     fhfbh:"hhffjnjknjfn",
//     message:"obh sentttttt",
//   }
//   // sending data from server to client
//   socket.emit('customEvent',{
//     data:obj
//   })
// }, 4000);
// reciveing data from client
// socket.on('clientEvent',(data)=>{
//   console.log("client data recevides",data)
// })

});
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}/`);
});
