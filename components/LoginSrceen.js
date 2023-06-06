import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';

import { Pressable } from 'react-native-web';
const LoginScreen = ({ Navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Welcome to Little Lemon</Text>
      <Text style={styles.regularText}>Login to continue </Text>

      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={onChangeEmail}
        placeholder={'Email'}
        clearButtonMode={'always'}></TextInput>
      <TextInput
        label="password"
        style={styles.inputBox}
        value={password.value}
        onChangeText={onChangePassword}
        secureTextEntry={true}
        placeholder="Password"
        clearButtonMode={'always'}></TextInput>

      <Pressable onPress={() => Navigation.navigate('Menu')}>
        <Text style={{ color: 'red' }}>View Menu</Text>
      </Pressable>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    padding: 40,
    fontSize: 38,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEE',
    textAlign: 'center',
  },

  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: 'EDEFEE',
    backgroundColor: '#EDEFEE',
  },
});
export default LoginScreen;
