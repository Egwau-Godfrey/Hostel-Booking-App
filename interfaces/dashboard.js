import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '../firebase/config';

const Dashboard = ({ navigation }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(useFirestore, 'Hostels'));
        const locationList = [];

        querySnapshot.forEach((doc) => {
          const { Location } = doc.data(); // Update to uppercase "Location"
          if (!locationList.includes(Location)) {
            locationList.push(Location);
          }
        });

        setLocations(locationList);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [useFirestore]);

  const navigateToHostels = (location) => {
    navigation.navigate('Hostels', { location });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Location:</Text>
      {locations.map((location, index) => (
        <TouchableOpacity
          key={index}
          style={styles.locationButton}
          onPress={() => navigateToHostels(location)}
        >
          <Text style={styles.locationButtonText}>{location}</Text>
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
  locationButton: {
    backgroundColor: 'blue',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'flex-start',
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Dashboard;

