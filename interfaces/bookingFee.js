import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { auth, useFirestore } from '../firebase/config'; 
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const BookingFeeScreen = ({ navigation }) => {
  const [bookingFee, setBookingFee] = useState('');
  const [originalBookingFee, setOriginalBookingFee] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingFee = async () => {
      try {
        // Fetch the current user's email
        const currentUserEmail = auth.currentUser.email;

        // Check if the current user's email exists in the 'Admin' collection
        const querySnapshot = await getDocs(collection(useFirestore, 'Admin'));
        let isAdmin = false;
        let userBookingFee = '';

        querySnapshot.forEach((doc) => {
          const adminEmail = doc.data().email;
          if (adminEmail === currentUserEmail) {
            isAdmin = true;
            userBookingFee = doc.data().BookingFee;
          }
        });

        // If the current user is an admin, proceed to fetch the booking fee
        if (isAdmin) {
          setBookingFee(userBookingFee);
          setOriginalBookingFee(userBookingFee);
        } else {
          // Handle unauthorized access or redirect to another screen
          console.warn('Unauthorized access to BookingFeeScreen');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking fee:', error);
      }
    };

    fetchBookingFee();
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
  
      // Check if the booking fee has changed
      if (bookingFee !== originalBookingFee) {
        // Parse the input value to an integer
        const updatedBookingFee = parseInt(bookingFee, 10);
  
        // Check if parsing is successful
        if (!isNaN(updatedBookingFee)) {
          // Update the booking fee field using updateDoc
          await updateDoc(userDocRef, {
            BookingFee: updatedBookingFee,
          });
  
          // Navigate back to the previous screen
          navigation.goBack();
        } else {
          console.warn('Invalid Booking Fee. Please enter a valid number.');
        }
      } else {
        console.warn('No changes to save.');
      }
    } catch (error) {
      console.error('Error saving booking fee:', error);
    }
  };
  
  
  
  

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Edit Booking Fee" />
        <Appbar.Action
          icon="content-save"
          onPress={handleSave}
          disabled={bookingFee === originalBookingFee}
        />
      </Appbar.Header>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Booking Fee"
          keyboardType="numeric"
          value={bookingFee.toString()}
          onChangeText={(text) => setBookingFee(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

export default BookingFeeScreen;
