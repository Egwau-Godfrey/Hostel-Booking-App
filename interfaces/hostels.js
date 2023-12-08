import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useFirestore } from '../firebase/config';

const Hostels = ({ route, navigation }) => {
  const { location } = route.params;
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const q = query(collection(useFirestore, 'Hostels'), where('Location', '==', location));
        const querySnapshot = await getDocs(q);
        const hostelList = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const hostelName = data.name; // the field name is 'name'
          hostelList.push(hostelName);
        });

        setHostels(hostelList);
        
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, [useFirestore, location]);

  const navigateToHostelDetails = (hostelName) => {
    navigation.navigate('HostelDetails', { location, hostelName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{location} Hostels:</Text>
      {hostels.map((hostel, index) => (
        <TouchableOpacity
          key={index}
          style={styles.hostelButton}
          onPress={() => navigateToHostelDetails(hostel)}
        >
          <Text style={styles.hostelButtonText}>{hostel}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  hostelButton: {
    backgroundColor: 'green',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'flex-start',
  },
  hostelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Hostels;
