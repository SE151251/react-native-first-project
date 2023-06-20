import { View, Text,Image,
  TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const DetailScreen = () => {
  const dispatch = useDispatch()
  const dataFetch = useSelector((state) => state.data)
  const route = useRoute();
  const { name, price, image, like, id } = route.params;
  const [isLike, setIsLike] = useState(like ? true : false );
  console.log(like);
  const handleFavourite = async () => {
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
      const obj = dataFetch.find((i) => i.id === id);
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