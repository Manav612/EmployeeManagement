import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import socketServices from '../../Socket/socket';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MarkAttendance = ({ navigation }) => {
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

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(
                    'https://0aac-2409-40c1-1000-60d3-8c4d-c12-1a17-e330.ngrok-free.app/employees',
                );
                setEmployees(response.data);
            } catch (error) {
                console.log('error fetching employee data', error);
            }
        };
        fetchEmployeeData();
    }, []);

    const [attendance, setAttendance] = useState([]);
    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(
                `https://0aac-2409-40c1-1000-60d3-8c4d-c12-1a17-e330.ngrok-free.app/attendance`,
                {
                    params: {
                        date: cd.format('MMMM D,YYYY'),
                    },
                },
            );
            setAttendance(response.data);
        } catch (error) {
            console.log('error fetching attendance data', error);
        }
    };
    useEffect(() => {
        fetchAttendanceData();
    }, [cd]);
    useEffect(() => {
        socketServices.initializeSocket()
        socketServices.on('recive-message', (data) => {
            console.log('data', data);
            fetchAttendanceData();

        })
    }, [])

    const employeeWithAttendance = employees.map(employee => {
        const attendanceRecord = attendance.find(
            record => record.employeeId === employee.employeeId,
        );
        return {
            ...employee,
            status: attendanceRecord ? attendanceRecord.status : '',
        };
    });

    return (
        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={{gap: 20, flexDirection: 'row', paddingVertical: 20,alignItems:'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>

                    <AntDesign name="arrowleft" size={24} color={'#000'} />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontSize: 25, textAlign: 'center' }}>
                    Mark Attendance
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                    alignItems: 'center',
                    marginVertical: 10,
                }}>
                <Text
                    style={{
                        color: '#000',
                        borderWidth: 1,
                        width: 90,
                        fontSize: 20,
                        textAlign: 'center',
                    }}
                    onPress={goToPrevDay}>
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
                    onPress={goToNextDay}>
                    Next Page
                </Text>
            </View>
            <View>
                {employeeWithAttendance.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            flexDirection: 'row',
                            gap: 10,
                            alignItems: 'center',
                            marginVertical: 10,
                            justifyContent: 'space-between',
                        }}
                        onPress={() =>
                            navigation.navigate('user', {
                                name: item.employeeName,
                                id: item.employeeId,
                                salary: item?.salary,
                                designation: item?.designation,
                            })
                        }>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                gap: 20,
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
                                <Text style={styles.FirstLetter}>
                                    {item?.employeeName?.charAt(0)}
                                </Text>
                            </View>
                            <View>
                                <Text>{item?.employeeName}</Text>
                                <Text>
                                    {item?.designation} ({item?.employeeId})
                                </Text>
                            </View>
                        </View>
                        {item?.status && (
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 8,
                                    backgroundColor: '#FF6984',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text style={{ color: '#fff', fontSize: 14 }}>
                                    {item?.status}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default MarkAttendance;

const styles = StyleSheet.create({
    FirstLetter: {
        color: '#fff',
        fontSize: 25,
        textAlign: 'center',
    },
});
