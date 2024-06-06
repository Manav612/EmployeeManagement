import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';
const AddDetails = ({ navigation }) => {
  const [name, setName] = useState('');
  const [eid, setEid] = useState('');
  const [dob, setDOB] = useState('');
  const [m, setM] = useState('');
  const [j, setJ] = useState('');
  const [s, setS] = useState('');
  const [a, setA] = useState('');
  const [d, setD] = useState('');
  const handleregister = async () => {
    const employeeData = {
      employeeName: name,
      employeeId: eid,
      designation: d,
      joiningDate: j,
      dateOfBirth: dob,
      phoneNumber: m,
      activeEmployee: true,
      address: a,
      salary: s,
    };
    console.log(employeeData);

    const response = await axios
      .post(
        ' https://c567-2405-201-201c-88b2-30d8-6613-8e13-db4a.ngrok-free.app/addEmployee',
        employeeData,
      )
      .then(response => {
        Alert.alert(
          'registration successful',
          'you have been register successfully',
        );
        setName(''),
          setEid(''),
          setDOB(''),
          setM(''),
          setJ(''),
          setA(''),
          setS(''),
          setD('');
      })
      .catch(error => {
        Alert.alert('registration failed', 'please try again');
        console.log('registration fail', error);
      });
    console.log('emplloyeeeeeeee', response);
  };
  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
      <View style={{}}>
        <View style={{ gap: 20, flexDirection: 'row', paddingVertical: 20, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color={'#000'} />
          </TouchableOpacity>
          <Text style={{ color: '#000', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
            Add new Employee
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            Full Name (First and last Name)
          </Text>
          <TextInput
            style={{
              padding: 10,
              marginVertical: '5%',
              borderWidth: 1,
              borderRadius: 5,
            }}
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor={'#000'}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            Employee Id
          </Text>
          <TextInput
            style={{
              padding: 10,
              marginVertical: '5%',
              borderWidth: 1,
              borderRadius: 5,
            }}
            onChangeText={text => setEid(text)}
            value={eid}
            placeholderTextColor={'#000'}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            designation
          </Text>
          <TextInput
            style={{
              padding: 10,
              marginVertical: '5%',
              borderWidth: 1,
              borderRadius: 5,
            }}
            onChangeText={text => setD(text)}
            value={d}
            placeholderTextColor={'#000'}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            Mobile Number
          </Text>
          <TextInput
            style={{
              padding: 10,
              marginVertical: '5%',
              borderWidth: 1,
              borderRadius: 5,
            }}
            onChangeText={text => setM(text)}
            value={m}
            placeholderTextColor={'#000'}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            Date Of Birth
          </Text>
          <TextInput
            style={{
              padding: 10,
              marginVertical: '5%',
              borderWidth: 1,
              borderRadius: 5,
            }}
            onChangeText={text => setDOB(text)}
            value={dob}
            placeholderTextColor={'#000'}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            joining Date
          </Text>
          <TextInput
            style={{
              padding: 10,
              marginVertical: '5%',
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholderTextColor={'#000'}
            onChangeText={text => setJ(text)}
            value={j}
          />
        </View>
        <View
          style={{
            marginVertical: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            Active Employee
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            True
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            salary
          </Text>
          <TextInput
            style={{
              padding: 10,
              marginVertical: '5%',
              borderWidth: 1,
              borderRadius: 5,
            }}
            onChangeText={text => setS(text)}
            placeholderTextColor={'#000'}
            value={s}
          />
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
            Address
          </Text>
          <TextInput
            style={{
              padding: 10,
              marginVertical: '5%',
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholderTextColor={'#000'}
            onChangeText={text => setA(text)}
            value={a}
          />
        </View>
        <TouchableOpacity style={{ width: 150, justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 10, backgroundColor: '#000' }} onPress={handleregister}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Add Employee</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddDetails;

const styles = StyleSheet.create({});
