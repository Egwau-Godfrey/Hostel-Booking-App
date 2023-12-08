// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './interfaces/login';
import AdminLogin from './interfaces/adminLogin';
import StudentSignup from './interfaces/studentsignup';
import Dashboard from './interfaces/dashboard';
import Hostels from './interfaces/hostels';
import HostelDetails from './interfaces/hosteldetails';
import AdminDashboard from './interfaces/adminDashboard';
import BookingsScreen from './interfaces/bookings';
import BookingFeeScreen from './interfaces/bookingFee';
import EnterSingleRoom from './interfaces/EnterSingleRoom';
import EnterDoubleRoom from './interfaces/EnterDoubleRoom';
import StudentBooking from './interfaces/StudentBookings';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="StudentSignup" component={StudentSignup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Hostels" component={Hostels} />
        <Stack.Screen name="HostelDetails" component={HostelDetails} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
        <Stack.Screen name="BookingFee" component={BookingFeeScreen} />
        <Stack.Screen name="EnterSingleRoom" component={EnterSingleRoom} />
        <Stack.Screen name="EnterDoubleRoom" component={EnterDoubleRoom} />
        <Stack.Screen name="StudentBooking" component={StudentBooking} />
        {/* Add other screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
