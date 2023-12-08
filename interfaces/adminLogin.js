import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { collection, getDocs } from 'firebase/firestore';
import { useFirestore } from '../firebase/config';

const AdminLogin = ({ navigation }) => {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [hostels, setHostels] = useState([]);

  // Fetch hostels from Firestore on component mount
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const querySnapshot = await getDocs(collection(useFirestore, 'Hostels'));
        const hostelList = [];
        querySnapshot.forEach((doc) => {
          const { name } = doc.data();
          hostelList.push({ label: name, value: name });
        });

        // Append the newly fetched hostels to the existing ones
        setHostels((prevHostels) => [...prevHostels, ...hostelList]);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, [useFirestore]);

  const handleLogin = () => {
    // Add authentication logic here
    // For simplicity, leaving it empty for now
    navigation.navigate('AdminDashboard');
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={hostels}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder="Select Hostel"
        searchPlaceholder="Search..."
        value={selectedHostel}
        onChange={(item) => {
          setSelectedHostel(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />

      <TextInput style={styles.input} placeholder="Username" />

      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: '80%',
    marginVertical: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AdminLogin;
