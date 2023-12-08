// Import necessary components from React and React Native
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AdminLogin from './adminLogin';
import StudentSignup from './studentsignup';
import Dashboard from './dashboard';

// Create a functional component for the login page
const Login = ({ navigation }) => {
  // State variables to store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login button press
  const handleLogin = () => {
    // Add authentication logic here
    // For simplicity, let's just navigate to a dashboard page
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Username input field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />

      {/* Password input field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      {/* Login button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Link to Admin login */}
      <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
        <Text style={styles.link}>Admin Login</Text>
      </TouchableOpacity>

      {/* Link to Student signup */}
      <TouchableOpacity onPress={() => navigation.navigate('StudentSignup')}>
        <Text style={styles.link}>Student Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the components
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
  link: {
    color: 'blue',
    marginVertical: 10,
  },
});

// Export the Login component
export default Login;
