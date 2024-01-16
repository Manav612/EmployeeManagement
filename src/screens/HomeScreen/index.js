import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React,{useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging'
import socketServices from '../../Socket/socket';

const HomeScreen = ({navigation}) => {
  useEffect(()=>{
    getDeviceToken();
  },[])


  const getDeviceToken = async ()=>{
    await messaging().registerDeviceForRemoteMessages();
const token = await messaging().getToken();
console.log("DeviceToken : ",token);
  }
  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#7F7FD5', '#E9E4F0']}
          style={{flex: 1, paddingHorizontal: '5%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: '3%',
            }}>
            <Feather name="bar-chart" size={24} color={'#000'} />
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000'}}>
              Employee Management System
            </Text>
            <Entypo name="lock" size={24} color={'#000'} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: '5%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#D3CCE3',
                padding: 12,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%',
              }}
              onPress={() => navigation.navigate('employees')}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Ionicons name="people" size={20} color={'#000'} />
              </View>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Employee List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#D3CCE3',
                padding: 12,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%',
              }}
              onPress={() => navigation.navigate('markAttendance')}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Ionicons name="people" size={20} color={'#000'} />
              </View>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Mark Attendance
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: '5%',
              backgroundColor: '#fff',
              borderRadius: 7,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 60,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#D3CCE3',
                marginVertical: '2%',
                marginHorizontal: '2%',
                paddingHorizontal: '2%',
              }}>
              <Ionicons name="newspaper-outline" size={24} color={'#000'} />
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Attendance Report
              </Text>
              <AntDesign name="right" size={24} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 60,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#D3CCE3',
                marginVertical: '2%',
                marginHorizontal: '2%',
                paddingHorizontal: '2%',
              }}
              onPress={() => navigation.navigate('summary')}>
              <Ionicons name="newspaper-outline" size={24} color={'#000'} />
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Summary Report
              </Text>
              <AntDesign name="right" size={24} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 60,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#D3CCE3',
                marginVertical: '2%',
                marginHorizontal: '2%',
                paddingHorizontal: '2%',
              }}>
              <Ionicons name="newspaper-outline" size={24} color={'#000'} />
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                All Generate Report
              </Text>
              <AntDesign name="right" size={24} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 60,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#D3CCE3',
                marginVertical: '2%',
                marginHorizontal: '2%',
                paddingHorizontal: '2%',
              }}>
              <Ionicons name="newspaper-outline" size={24} color={'#000'} />
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                OverTime Employee Report
              </Text>
              <AntDesign name="right" size={24} color={'#000'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: '5%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#BE93CF',
                padding: 12,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Ionicons name="people" size={20} color={'#000'} />
              </View>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Attendance Criteria
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#BE93CF',
                padding: 12,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Feather name="bar-chart" size={20} color={'#000'} />
              </View>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Increased Workflow
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: '2%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#BE93CF',
                padding: 12,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Ionicons name="people" size={20} color={'#000'} />
              </View>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Cost Savings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#BE93CF',
                padding: 12,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                width: '45%',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Feather name="bar-chart" size={20} color={'#000'} />
              </View>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Employee Performance
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
