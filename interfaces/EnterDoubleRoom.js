// EnterDoubleRoom.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { auth, useFirestore } from '../firebase/config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const EnterDoubleRoom = ({ navigation }) => {
  const [availableRooms, setAvailableRooms] = useState('');
  const [fullPriceOfDouble, setFullPriceOfDouble] = useState('');
  const [originalAvailableRooms, setOriginalAvailableRooms] = useState('');
  const [originalFullPriceOfDouble, setOriginalFullPriceOfDouble] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Fetch the current user's email
        const currentUserEmail = auth.currentUser.email;

        // Check if the current user's email exists in the 'Admin' collection
        const querySnapshot = await getDocs(collection(useFirestore, 'Admin'));
        let isAdmin = false;
        let userAvailableRooms = '';
        let userFullPriceOfDouble = '';

        querySnapshot.forEach((doc) => {
          const adminEmail = doc.data().email;
          if (adminEmail === currentUserEmail) {
            isAdmin = true;
            userAvailableRooms = doc.data().NumberofAvailableDoubleRooms;
            userFullPriceOfDouble = doc.data().FullPriceofDouble;
          }
        });

        // If the current user is an admin, proceed to fetch the data
        if (isAdmin) {
          setAvailableRooms(userAvailableRooms);
          setOriginalAvailableRooms(userAvailableRooms);
          setFullPriceOfDouble(userFullPriceOfDouble);
          setOriginalFullPriceOfDouble(userFullPriceOfDouble);
        } else {
          // Handle unauthorized access or redirect to another screen
          console.warn('Unauthorized access to user data');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, [auth, useFirestore]);

  const handleSave = async () => {
    try {
      const currentUserEmail = auth.currentUser.email;

      // Look for the document with the current user's email
      const querySnapshot = await getDocs(collection(useFirestore, 'Admin'));
      let userDocRef;

      querySnapshot.forEach((doc) => {
        const adminEmail = doc.data().email;
        if (adminEmail === currentUserEmail) {
          userDocRef = doc.ref; // Found the document reference
        }
      });

      // Check if the user document was found
      if (!userDocRef) {
        console.warn('No document found for the current user.');
        return;
      }

      // Check if the available rooms or full price has changed
      if (availableRooms !== originalAvailableRooms || fullPriceOfDouble !== originalFullPriceOfDouble) {
        // Parse the input values to integers
        const updatedAvailableRooms = parseInt(availableRooms, 10);
        const updatedFullPriceOfDouble = parseInt(fullPriceOfDouble, 10);

        // Check if parsing is successful
        if (!isNaN(updatedAvailableRooms) && !isNaN(updatedFullPriceOfDouble)) {
          // Update the fields using updateDoc
          await updateDoc(userDocRef, {
            NumberofAvailableDoubleRooms: updatedAvailableRooms,
            FullPriceofDouble: updatedFullPriceOfDouble,
          });

          // Navigate back to the previous screen
          navigation.goBack();
        } else {
          console.warn('Invalid input. Please enter valid numbers.');
        }
      } else {
        console.warn('No changes to save.');
      }
    } catch (error) {
      console.error('Error saving room data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Enter Double Room" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={styles.label}>Number of Available Double Rooms:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={availableRooms.toString()}
          onChangeText={(text) => setAvailableRooms(text)}
        />

        <Text style={styles.label}>Full Price of a Single Room:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={fullPriceOfDouble.toString()}
          onChangeText={(text) => setFullPriceOfDouble(text)}
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
