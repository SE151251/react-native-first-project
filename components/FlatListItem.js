import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
const menuItemsToDisplay = [
  {
    name: "Hummus",
    price: "$5.00",
    id: "1A",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Moutabal",
    price: "$5.00",
    id: "2B",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Falafel",
    price: "$7.50",
    id: "3C",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Marinated Olives",
    price: "$5.00",
    id: "4D",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Kofta",
    price: "$5.00",
    id: "5E",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Eggplant Salad",
    price: "$8.50",
    id: "6F",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Lentil Burger",
    price: "$10.00",
    id: "7G",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Smoked Salmon",
    price: "$14.00",
    id: "8H",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Kofta Burger",
    price: "$11.00",
    id: "9I",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
  {
    name: "Turkish Kebab",
    price: "$15.50",
    id: "10J",
    image:
      "https://noithatbinhminh.com.vn/wp-content/uploads/2022/12/anh-hoa-dep-nhat-the-gioi-2.jpg",
  },
];
// let dataFavourite = []

const FlatListItems = () => {
  const dispatch = useDispatch()
  const dataFetch = useSelector((state) => state.data)
  console.log("fetch data: ",dataFetch);
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("myObject");
      const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : [];    
      dispatch({type: "SET_DATA", payload: parsedValue})  
    } catch (error) {
      console.log("Error loading data:", error);
      dispatch({type: "SET_DATA", payload: []})
    }
  };
  useEffect(() => {
    loadData();
    console.log("load data");
  }, []);
  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      price={item.price}
      image={item.image}
      id={item.id}
      data={dataFetch}
    />
  );
  return dataFetch ? (
    <View style={menuStyles.container}>
      <FlatList
        data={menuItemsToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  ) : (
    <Text>Loading</Text>
  );
};
const Item = ({ name, price, image, id, data }) => {
  const dispatch = useDispatch()
  const dataFetch = useSelector((state) => state.data)
  const [isLike, setIsLike] = useState(dataFetch.find((i) => i.id === id) ? true : false );
  useEffect(() => {
    setIsLike(dataFetch.find((i) => i.id === id) ? true : false);
  }, [dataFetch]);
  const handleFavourite = async (id) => {
    try {
      const check = dataFetch.find((i) => i.id === id);
      if (check) {
        const newDataAfterRemove = dataFetch.filter((i) => i.id !== id);
        const jsonValue = JSON.stringify(newDataAfterRemove);
        await AsyncStorage.clear();
        await AsyncStorage.setItem("myObject", jsonValue);
        dispatch({type: "REMOVE_DATA", payload: newDataAfterRemove})  
        setIsLike(isLike ? false : true);
        console.log("Remove successful");
        return;
      }
      const obj = menuItemsToDisplay.find((i) => i.id === id);
      dataFetch.push(obj);
      console.log("add: ",dataFetch);
      const jsonValue = JSON.stringify(dataFetch);
      await AsyncStorage.clear();
      await AsyncStorage.setItem("myObject", jsonValue);
      dispatch({type: "ADD_DATA", payload: [...dataFetch]})
      setIsLike(isLike ? false : true);
      console.log("Add successful");
    } catch (error) {
      console.log("Error saving data:", error);
      setIsLike(false);
    }
  };

  return (
    <View style={menuStyles.innerContainer}>
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      <Text style={menuStyles.itemText}>{name}</Text>
      <Text style={menuStyles.itemText}>{price}</Text>
      <TouchableOpacity onPress={() => handleFavourite(id)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isLike ? (
            <Ionicons name="ios-heart-sharp" size={24} color="black" />
          ) : (
            <Ionicons name="ios-heart-outline" size={24} color="black" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
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

export default FlatListItems;
