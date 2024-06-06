import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Summary = ({navigation}) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [cd, setCD] = useState(moment());

  useEffect(() => {
    fetchAttendanceReport(cd); // Pass the current month to the fetch function
  }, [cd]);

  const goToNextMonth = () => {
    const nextMonth = moment(cd).add(1, 'months');
    setCD(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(cd).subtract(1, 'months');
    setCD(prevMonth);
  };

  const formatDate = date => {
    return date.format('MMMM, YYYY');
  };

  const fetchAttendanceReport = async selectedMonth => {
    try {
      const response = await axios.get(
        ` https://c567-2405-201-201c-88b2-30d8-6613-8e13-db4a.ngrok-free.app/attendance-report-all-employees`,
        {
          params: {
            month: selectedMonth.month() + 1,
            year: selectedMonth.year(),
          },
        },
      );

      setAttendanceData(response.data.report);
      console.log('Attendance data fetched successfully');
    } catch (error) {
      console.log('Error fetching attendance');
    }
  };

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>

      <View style={{ gap: 20, flexDirection: 'row', paddingVertical: 20, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={'#000'} />
        </TouchableOpacity>
        <Text style={{ color: '#000', fontSize: 25, textAlign: 'center' }}>
          Summary Report of Employees
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text
          style={{
            color: '#000',
            borderWidth: 1,
            width: 90,
            fontSize: 20,
            textAlign: 'center',
          }}
          onPress={goToPrevMonth}>
          Prev Page
        </Text>
        <Text style={{ color: '#000', fontSize: 20 }}>{formatDate(cd)}</Text>
        <Text
          style={{
            color: '#000',
            borderWidth: 1,
            width: 90,
            fontSize: 20,
            textAlign: 'center',
          }}
          onPress={goToNextMonth}>
          Next Page
        </Text>
      </View>
      {/* <Button title='Filter Data'/>
      <FilteredEmployees/> */}

      <View>
        {attendanceData.map((item, index) => (
          <View key={index} style={{ flex: 1 }}>
            <View
              key={index}
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: '#4b6cb7',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.FirstLetter}>{item?.name?.charAt(0)}</Text>
              </View>
              <View>
                <Text>{item?.name}</Text>
                <Text>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 10,
                margin: 5,
                padding: 5,
                backgroundColor: '#A1FFCE',
                borderRadius: 5,
              }}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Present</DataTable.Title>
                  <DataTable.Title>Absent</DataTable.Title>
                  <DataTable.Title>Halfday</DataTable.Title>
                  <DataTable.Title>Holiday</DataTable.Title>
                  <DataTable.Title>Non Working Days</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{item?.present}</DataTable.Cell>
                  <DataTable.Cell>{item?.absent}</DataTable.Cell>
                  <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                  <DataTable.Cell>{item?.holiday}</DataTable.Cell>
                  <DataTable.Cell>4</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  head: { color: '#000', fontSize: 25, textAlign: 'center' },
  letter: { color: '#000', textAlign: 'center' },
  FirstLetter: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
});
