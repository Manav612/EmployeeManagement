import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddDetails from '../screens/AddDetailsScreen';
import MarkAttendance from '../screens/MarkAttendanceScreen';
import User from '../screens/UserScreen';
import Summary from '../screens/SummaryScreen';
import Employees from '../screens/EmployeesScreen';
import SocketComponent from '../Socket/socket';


const Stack = createStackNavigator();

export const NavigationHandler = () => {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="employees" component={Employees} />
            <Stack.Screen name="AddDetails" component={AddDetails} />
            <Stack.Screen name="markAttendance" component={MarkAttendance} />
            <Stack.Screen name="user" component={User} />
            <Stack.Screen name="summary" component={Summary} />
            

        </Stack.Navigator>
    )
}