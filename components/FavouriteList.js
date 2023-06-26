import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
const Item = ({ name, price, image, id, data, setDataFetch }) => {
  const removeItem = async (id) => {
    try {
      const newList = data.filter((i) => i.id !== id);
      const jsonValue = JSON.stringify(newList);
      await AsyncStorage.setItem("myObject", jsonValue);
      setDataFetch(newList)
    } catch (error) {
      console.log("Error remove data:", error);
    }
  };
  return (
    <View style={menuStyles.innerContainer}>
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      <Text style={menuStyles.itemText}>{name}</Text>
      <Text style={menuStyles.itemText}>{price}</Text>
      <TouchableOpacity onPress={() => removeItem(id)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="ios-heart-sharp" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const FavouriteList = () => {
  const [dataFetch,setDataFetch] = useState([])
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      // Thực hiện các tác vụ khi màn hình được tập trung    
      loadData();
      console.log("Favourite screen is focused => load data in Favorite screen");
    } else {
      console.log('Favourite screen is not focused');
    }
  }, [isFocused]);
  const handleDelete = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', onPress: clearData, style: 'destructive' }
      ]
    );
  };
  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      setDataFetch()
    } catch (error) {
      console.log("Error clearing data:", error);
    }
  };
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("myObject");
      const obj = jsonValue != null ? JSON.parse(jsonValue) : null;
      setDataFetch(obj)
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };
  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      price={item.price}
      image={item.image}
      id={item.id}
      data={dataFetch}
      setDataFetch={setDataFetch}
    />
  );
  console.log(dataFetch);
  if (dataFetch) {
    return (
      <View style={menuStyles.container}>
        <Button onPress={handleDelete} title="Clear"></Button>
        <FlatList
          data={dataFetch}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        ></FlatList>
      </View>
    );
  } else {
    return <Text>Empty list</Text>;
  }
};

// Add styles to the component
const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    color: "#F4CE14",
    fontSize: 20,
  },
});

export default FavouriteList;
