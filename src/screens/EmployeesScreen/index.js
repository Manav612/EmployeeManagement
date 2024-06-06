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
          ' https://c567-2405-201-201c-88b2-30d8-6613-8e13-db4a.ngrok-free.app/employees',
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
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{color: '#000', fontSize: 25, textAlign: 'center',marginVertical:10}}>
          Search Employees
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems: 'center',
            paddingHorizontal:20
          }}>
             <TouchableOpacity onPress={()=>navigation.goBack()}>

          <AntDesign name="arrowleft" size={24} color={'#000'} />
             </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'center',
              width:150,
              gap:20,
              borderRadius:20
            }}>
            
            <AntDesign name="search1" size={24} color={'#000'} />
            <TextInput
              style={{width:100}}
              placeholder="Search"
              value={input}
              onChangeText={text => setInput(text)}
            />
           
          </TouchableOpacity>
          {employees.length > 0 && (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddDetails')}>
                  <AntDesign name="plus" size={30} color={'#000'} />
                </TouchableOpacity>
              </View>
            )}
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
  );
};

export default Employees;

const styles = StyleSheet.create({});
