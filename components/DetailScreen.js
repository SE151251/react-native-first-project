import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const DetailScreen = () => {
  const route = useRoute();
  const { name, price, image, like, id} = route.params;
  const [dataFetch, setDataFetch] = useState([]);
  const [isLike, setIsLike] = useState(dataFetch.find((i) => i.id === id) ? true : false );
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("myObject");
      const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : [];
      setDataFetch(parsedValue);
    } catch (error) {
      console.log("Error loading data:", error);
      setDataFetch();
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Thực hiện các tác vụ khi màn hình được tập trung
      loadData();
      console.log("Detail screen is focused => Load data in Detail screen");
    } else {
      // Thực hiện các tác vụ khi màn hình không được tập trung
      console.log("Detail screen is not focused");
    }
  }, [isFocused]);
  useEffect(() => {
    setIsLike(dataFetch.find((i) => i.id === id) ? true : false);
  }, [dataFetch]);
  const handleFavourite = async () => {
    try {
      const check = dataFetch.find((i) => i.id === id);
      if (check) {
        const newDataAfterRemove = dataFetch.filter((i) => i.id !== id);
        console.log("remove in detail: ",newDataAfterRemove);
        const jsonValue = JSON.stringify(newDataAfterRemove);       
        await AsyncStorage.setItem("myObject", jsonValue);       
        setIsLike(isLike ? false : true);
        console.log("Remove successful");
        return;
      }    
      dataFetch.push({id: id, name: name, price: price, image: image});
      console.log("add: ",dataFetch);
      const jsonValue = JSON.stringify(dataFetch);
      await AsyncStorage.setItem("myObject", jsonValue);
      setIsLike(isLike ? false : true);
      console.log("Add successful");
    } catch (error) {
      console.log("Error saving data:", error);
      setIsLike(false);
    }
  };
  
  console.log(name, price, isLike);
  return (
    <View>     
      <Text>DetailScreen</Text>
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      <Text >{name}</Text>
      <Text >{price}</Text>
      <TouchableOpacity onPress={() => handleFavourite()}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {isLike ? (
            <Ionicons name="ios-heart-sharp" size={24} color="black" />
          ) : (
            <Ionicons name="ios-heart-outline" size={24} color="black" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default DetailScreen