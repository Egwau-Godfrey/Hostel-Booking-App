import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebase/config';

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Verify if the email ends with "@admin.com"
      if (!email.endsWith('@admin.com')) {
        console.error('Invalid email. Please use an admin email.');
        return;
      }

      // Authenticate user using Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Access the user from userCredential
      const user = userCredential.user;

      // For simplicity, you can navigate to the AdminDashboard component after successful login
      navigation.navigate('AdminDashboard');
    } catch (error) {
      // Handle login error
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

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
});

export default AdminLogin;
