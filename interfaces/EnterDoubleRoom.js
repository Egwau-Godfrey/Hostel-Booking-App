// EnterDoubleRoom.js
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const EnterDoubleRoom = () => {
  const [availableRooms, setAvailableRooms] = useState('');

  const handleSave = () => {
    // Implement logic to save the number of available double rooms
    // For simplicity, we'll log it to the console
    console.log(`Saved: ${availableRooms} Double Rooms`);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Enter Double Room" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={styles.label}>Number of Available Double Rooms:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={availableRooms}
          onChangeText={(text) => setAvailableRooms(text)}
        />

        <Button
          mode="contained"
          style={styles.saveButton}
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EnterDoubleRoom;
