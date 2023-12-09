import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from '../firebase/config';
import Dashboard from './dashboard';

const StudentSignup = ({ navigation }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  const handleSignup = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Access user from userCredential
      const user = userCredential.user;
  
      // Add student data to Firestore
      await addDoc(collection(useFirestore, 'Students'), {
        firstname,
        lastname,
        email,
        phone,
        userId: user.uid, // Add user ID to student data
      });
  
      console.log('Signup successful');
      navigation.navigate('Dashboard'); // Navigate to a different screen after successful signup
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  
  

  return (
    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} behavior="padding" enabled keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(text) => setFirstname(text)}
          value={firstname}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setLastname(text)}
          value={lastname}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default StudentSignup;
