import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchResults from '../../components/SearchResults';
const Employees = ({navigation}) => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          'https://8e1a-2405-201-201c-8115-fd09-4cce-43c8-2d49.ngrok-free.app/employees',
        );
        setEmployees(response.data);
      } catch (error) {
        console.log('error fetching employee data', error);
      }
    };
    fetchEmployeeData();
  }, []);

  console.log(employees);
  return (
    // <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{color: '#000', fontSize: 25, textAlign: 'center'}}>
          Search Employees
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
             <TouchableOpacity onPress={()=>navigation.navigate('HomeScreen')}>

          <AntDesign name="arrowleft" size={24} color={'#000'} />
             </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between'
            }}>
            
            <AntDesign name="search1" size={24} color={'#000'} />
            <TextInput
              placeholder="Search"
              value={input}
              onChangeText={text => setInput(text)}
            />
            {employees.length > 0 && (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddDetails')}>
                  <AntDesign name="plus" size={30} color={'#000'} />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {employees.length > 0 ? (
          <SearchResults data={employees} input={input} setInput={setInput} />
        ) : (
          <View>
            <Text>No Results</Text>
            <Text>Press on the plus button</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddDetails')}>
              <AntDesign name="plus" size={30} color={'#000'} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    // </ScrollView>
  );
};

export default Employees;

const styles = StyleSheet.create({});
