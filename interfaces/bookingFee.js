// BookingFeeScreen.js
import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

const BookingFeeScreen = ({ navigation }) => (
  <View>
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title="Edit Booking Fee" />
    </Appbar.Header>

    {/* Add form to edit booking fee here */}
  </View>
);

export default BookingFeeScreen;
