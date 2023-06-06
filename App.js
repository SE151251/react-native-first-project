import 'react-native-gesture-handler';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import MenuItems from './components/MenuItems';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginSrceen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
//import { NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator ();
export default function App() {
  return (
  <NavigationContainer>
  <Drawer.Navigator
  useLegacyImplementation
  screenOptions={{ drawerPosition: "right" }}>
  <Drawer.Screen name="Welcome" component={WelcomeScreen} />
  <Drawer.Screen name="Menu" component={MenuItems} />
  </Drawer.Navigator>
  </NavigationContainer>
  );
 }


// const Tab = createBottomTabNavigator()
// export default function App() {
//   return (
//   <NavigationContainer>
//   <Tab.Navigator
//   screenOptions={({ route }) => ({
//   tabBarIcon: ({ focused, color, size }) => {
//   let iconName;
//   if (route.name === 'Welcome') {
//   iconName = focused
//   ? 'ios-information-circle'
//   : 'ios-information-circle-outline';
//   } else if (route.name === 'Menu') {
//   iconName = 'ios-list';
//   }
//   return <Ionicons name={iconName} size={size} color={color} />;
//   },
//   tabBarActiveTintColor: 'tomato',
//   tabBarInactiveTintColor: 'gray',
//   })}>
//   <Tab.Screen name="Welcome" component={WelcomeScreen} />
//   <Tab.Screen name="Menu" component={MenuItems} />
//   </Tab.Navigator>
//   </NavigationContainer>
//   );
//  }
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Wellcome">
//         <Stack.Screen
//           name="Wellcome"
//           options={{ title: 'Hello' }}
//           component={WelcomeScreen}
//         />
//         <Stack.Screen name="Menu" component={MenuItems} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#333333',
//   },
//   footerContainer: { backgroundColor: '#333333' },
// });
