import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import FavouriteList from './components/FavouriteList';
import FlatListItems from './components/FlatListItem';
const Stack = createNativeStackNavigator();

import { createDrawerNavigator } from '@react-navigation/drawer';
import DetailScreen from './components/DetailScreen';
// const Drawer = createDrawerNavigator ();
// export default function App() {
//   return (
//   <NavigationContainer>
//   <Drawer.Navigator
//   useLegacyImplementation
//   screenOptions={{ drawerPosition: "right" }}>
//   <Drawer.Screen name="Welcome" component={WelcomeScreen} />
//   <Drawer.Screen name="Menu" component={FlatListItems} />
//   </Drawer.Navigator>
//   </NavigationContainer>
//   );
//  }

//  const Drawer = createDrawerNavigator();
 const Tab = createBottomTabNavigator();
 
 const App = () => {
   return (
     <NavigationContainer>
     <Tab.Navigator>
        <Tab.Screen name="Home" component={MainStack} />
        <Tab.Screen name="Like" component={FavouriteList} />
      </Tab.Navigator>
       {/* <Drawer.Navigator initialRouteName="Home">
         <Drawer.Screen name="Home" component={TabNavigator} />
         <Drawer.Screen name="Favourite List" component={FavouriteList} />
       </Drawer.Navigator> */}
     </NavigationContainer>
   );
 };
 const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListItem" component={FlatListItems} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
//  const TabNavigator = () => {
//    return (
//      <Tab.Navigator>
//        <Tab.Screen name="Home 2" component={FlatListItems} />
//        <Tab.Screen name="Like" component={FavouriteList} />
//      </Tab.Navigator>
//    );
//  };
 
 export default App;
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
