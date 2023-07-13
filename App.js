import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import FavouriteList from "./components/FavouriteList";
import FlatListItems from "./components/FlatListItem";
const Stack = createNativeStackNavigator();
import { PaperProvider } from "react-native-paper";
import DetailScreen from "./components/DetailScreen";
import { Ionicons } from "@expo/vector-icons";
import WelcomeScreen from "./components/WelcomeScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            // headerShown:false,
            headerStyle: styles.header,
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "home";
              } else if (route.name === "Favourite") {
                iconName = "heart";
              }else if(route.name === "Another"){
                iconName = "heart";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={MainStack} />
          <Tab.Screen name="Favourite" component={FavouriteList} />
          <Tab.Screen name="Another" component={WelcomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
const MainStack = () => {
  return (
    <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <Stack.Screen name="ListItem" component={FlatListItems} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Favourite" component={FavouriteList} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00ffff",
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default App;
