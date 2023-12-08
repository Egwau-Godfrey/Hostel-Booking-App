// BookingsScreen.js
import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

const BookingsScreen = ({ navigation }) => (
  <View>
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="User Bookings" />
    </Appbar.Header>

    {/* Display user bookings here */}
  </View>
);

export default BookingsScreen;
