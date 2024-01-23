import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebase/config';
import AdminLogin from './adminLogin';
import StudentSignup from './studentsignup';
import Dashboard from './dashboard';

const Login = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => setemail(text)}
          value={email}
        />

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

        <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
          <Text style={styles.link}>Admin Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('StudentSignup')}>
          <Text style={styles.link}>Student Signup</Text>
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
    paddingVertical: 20,
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

export default Login;
