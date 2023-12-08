// AdminDashboard.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';

const availableRooms = [
  { id: 1, type: 'Single Room', info: 'Comfortable single room with amenities' },
  { id: 2, type: 'Double Room', info: 'Spacious double room for couples or friends' },
];

const AdminDashboard = ({ navigation }) => {
  const handleRoomClick = (roomId) => {
    if (roomId === 1) {
      navigation.navigate('EnterSingleRoom');
    } else if (roomId === 2) {
      navigation.navigate('EnterDoubleRoom');
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Admin Dashboard" />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Available Rooms</Title>
          {availableRooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={styles.roomCard}
              onPress={() => handleRoomClick(room.id)}
            >
              <Card>
                <Card.Content>
                  <Title>{room.type}</Title>
                  <Paragraph>{room.info}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Bookings')}
      >
        View Bookings
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('BookingFee')}
      >
        Edit Booking Fee
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  roomCard: {
    marginBottom: 8,
  },
  button: {
    margin: 16,
  },
});

export default AdminDashboard;
