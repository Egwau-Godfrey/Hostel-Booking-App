// HostelDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { storage } from '../firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const HostelDetails = ({ route }) => {
  const { location, hostelName } = route.params;
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const storageRef = ref(storage, `${hostelName}.jpg`);
    getDownloadURL(storageRef).then((url) => {
      setImageUrl(url);
    });
  }, [hostelName]);

  const handleBook = () => {
    // Implement the booking logic here
    // For now, navigate to the StudentBooking page
    navigation.navigate('StudentBooking');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hostel Details:</Text>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.hostelImage} />}
      <Text style={styles.detailText}>{`Location: ${location}`}</Text>
      <Text style={styles.detailText}>{`Hostel Name: ${hostelName}`}</Text>

      {/* Book button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  hostelImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HostelDetails;
