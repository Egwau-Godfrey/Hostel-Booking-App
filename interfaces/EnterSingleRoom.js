// EnterSingleRoom.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { auth, useFirestore } from '../firebase/config';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const EnterSingleRoom = ({ navigation }) => {
  const [availableRooms, setAvailableRooms] = useState('');
  const [fullPriceOfSingle, setFullPriceOfSingle] = useState('');
  const [originalAvailableRooms, setOriginalAvailableRooms] = useState('');
  const [originalFullPriceOfSingle, setOriginalFullPriceOfSingle] = useState('');
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
        let userFullPriceOfSingle = '';

        querySnapshot.forEach((doc) => {
          const adminEmail = doc.data().email;
          if (adminEmail === currentUserEmail) {
            isAdmin = true;
            userAvailableRooms = doc.data().NumberofAvailableSingleRooms;
            userFullPriceOfSingle = doc.data().FullPriceofSingle;
          }
        });

        // If the current user is an admin, proceed to fetch the data
        if (isAdmin) {
          setAvailableRooms(userAvailableRooms);
          setOriginalAvailableRooms(userAvailableRooms);
          setFullPriceOfSingle(userFullPriceOfSingle);
          setOriginalFullPriceOfSingle(userFullPriceOfSingle);
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
      if (availableRooms !== originalAvailableRooms || fullPriceOfSingle !== originalFullPriceOfSingle) {
        // Parse the input values to integers
        const updatedAvailableRooms = parseInt(availableRooms, 10);
        const updatedFullPriceOfSingle = parseInt(fullPriceOfSingle, 10);

        // Check if parsing is successful
        if (!isNaN(updatedAvailableRooms) && !isNaN(updatedFullPriceOfSingle)) {
          // Update the fields using updateDoc
          await updateDoc(userDocRef, {
            NumberofAvailableSingleRooms: updatedAvailableRooms,
            FullPriceofSingle: updatedFullPriceOfSingle,
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
        <Appbar.Content title="Enter Single Room" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text style={styles.label}>Number of Available Single Rooms:</Text>
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
          value={fullPriceOfSingle.toString()}
          onChangeText={(text) => setFullPriceOfSingle(text)}
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
});

export default EnterSingleRoom;
