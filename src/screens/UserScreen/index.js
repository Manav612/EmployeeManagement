import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRoute, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import Octicons from 'react-native-vector-icons/Octicons';
import TouchID from 'react-native-touch-id';
import socketServices from '../../Socket/socket';
import { useNavigation } from '@react-navigation/native';

const User = (props) => {
  const navigation = useNavigation(); 
  const [isAuth, setIsAuth] = useState(false);
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  // const handleBiometric = ()=>{
  //   TouchID.isSupported(optionalConfigObject).then((biometryType)=>{
  //     if (biometryType === 'FaceID') {
  //       console.log('FaceID is supported.');

  //   } else {
  //       console.log('TouchID is supported.');
  //       if(isAuth){
  //         return null
  //       }
  //       TouchID.authenticate('',optionalConfigObject).then((success)=>{
  //         console.log('Success',success);
  //         setIsAuth(success);
  //       }).catch(err=>{
  //           BackHandler.exitApp();
  //       })
  //   }
  //   })
  //   submitAttendance();
  // }
  const handleBiometric = () => {
    TouchID.isSupported(optionalConfigObject).then(biometryType => {
      if (biometryType === 'FaceID') {
        console.log('FaceID is supported.');
      } else {
        console.log('TouchID is supported.');
        if (isAuth) {
          return null;
        }
        TouchID.authenticate('', optionalConfigObject)
          .then(success => {
            console.log('Success', success);
            setIsAuth(success);
            setTimeout(() => {
              submitAttendance();
            }, 3000);
          })
          .catch(err => {
            BackHandler.exitApp();
          });
      }
    });
  };

  const {name, id, salary, designation} = props.route.params;
  const [attendanceStatus, setAttendanceStatus] = useState('present');

  const [cd, setCD] = useState(moment());
  const goToNextDay = () => {
    const nextDate = moment(cd).add(1, 'days');
    setCD(nextDate);
  };
  const goToPrevDay = () => {
    const prevDate = moment(cd).subtract(1, 'days');
    setCD(prevDate);
  };

  const formatDate = date => {
    return date.format('MMMM D,YYYY');
  };

  useEffect(() => {
    console.log("-------------------------------------------");
    socketServices.initializeSocket();
    console.log("////////////////////////////");
    
  }, []);

  const submitAttendance = async () => {
    const data="done0";
    socketServices.emit('send-message',data);
   
    try {
      const attendanceData = {
        employeeId: id,
        employeeName: name,
        date: cd.format('MMMM D,YYYY'),
        status: attendanceStatus,
      };
      const response = await axios.post(
        'https://8e1a-2405-201-201c-8115-fd09-4cce-43c8-2d49.ngrok-free.app/attendance',
        attendanceData,
      );
      if (response.status === 200) {
        Alert.alert(`Attendance Submitted Successfully for ${name}`);
        console.log('==============>>>>>>> Attendance  Submitted Successfully');

        navigation.goBack();
        
      }
    } catch (error) {
      console.log('error while submitting attendance', error);
    }
    
  };
  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
      <View style={{flex: 1, paddingVertical: '5%', paddingHorizontal: '5%'}}>
        <Text style={{color: '#000', fontSize: 25, textAlign: 'center'}}>
          User Details
        </Text>
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
              width: 60,
              textAlign: 'center',
            }}
            onPress={goToPrevDay}>
            Prev Page
          </Text>
          <Text style={{color: '#000'}}>{formatDate(cd)}</Text>
          <Text
            style={{
              color: '#000',
              borderWidth: 1,
              width: 60,
              textAlign: 'center',
            }}
            onPress={goToNextDay}>
            Next Page
          </Text>
        </View>
        <TouchableOpacity
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
            <Text style={styles.FirstLetter}>{name?.charAt(0)}</Text>
          </View>
          <View>
            <Text>{name}</Text>
            <Text>
              {designation} ({id})
            </Text>
          </View>
        </TouchableOpacity>
        <Text>Salary : {salary}</Text>
        <Text>ATTENDANCE</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAttendanceStatus('present')}>
            {attendanceStatus === 'present' ? (
              <Octicons name="dot-fill" size={20} color={'#000'} />
            ) : (
              <Octicons name="dot" size={20} color={'#000'} />
            )}
            <Text>Present</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAttendanceStatus('absent')}>
            {attendanceStatus === 'absent' ? (
              <Octicons name="dot-fill" size={20} color={'#000'} />
            ) : (
              <Octicons name="dot" size={20} color={'#000'} />
            )}
            <Text>Absent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAttendanceStatus('halfday')}>
            {attendanceStatus === 'halfday' ? (
              <Octicons name="dot-fill" size={20} color={'#000'} />
            ) : (
              <Octicons name="dot" size={20} color={'#000'} />
            )}
            <Text>halfday</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAttendanceStatus('holiday')}>
            {attendanceStatus === 'holiday' ? (
              <Octicons name="dot-fill" size={20} color={'#000'} />
            ) : (
              <Octicons name="dot" size={20} color={'#000'} />
            )}
            <Text>holiday</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            width: 100,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'aqua',
          }}
          onPress={() => handleBiometric()}>
          <Text>Submit Attendance</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default User;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  FirstLetter: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
});
