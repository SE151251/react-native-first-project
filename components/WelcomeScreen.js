import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [firtName, onChangeFirstName] = useState('');
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Welcome to Little Lemon</Text>
      <Text style={styles.regularText}>Wellcome to login applicaton</Text>
      <TextInput
        style={styles.inputBox}
        value={firtName}
        onChangeText={onChangeFirstName}
        placeholder={'First Name'}
        onFocus={() => {
          Alert.alert('First name is focussed');
        }}
        onBlur={() => {
          Alert.alert('First name is now blurred');
        }}></TextInput>

      <Pressable onPress={() => navigation.navigate('Menu')}>
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
    fontSize: 30,
    color: '#EDEFEE',
    textAlign: 'center',
    marginVertical: 8,
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEf',
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
export default WelcomeScreen;
