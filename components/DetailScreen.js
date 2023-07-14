import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useEffect } from "react";
import {Card, Chip, Text } from 'react-native-paper';
import {
  StyleSheet,
  Image,
  // Text,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
const DetailScreen = () => {
  const route = useRoute();
  const {  name,
    image,
    price,
    category,
    weight,
    rating,
    color,
    bonus,
    origin} = route.params;
  const [dataFetch, setDataFetch] = useState([]);
  const [isLike, setIsLike] = useState(dataFetch.find((i) => i.name === name) ? true : false );
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
      loadData();
    } else {
      console.log("Detail screen is not focused");
    }
  }, [isFocused]);
  useEffect(() => {
    setIsLike(dataFetch.find((i) => i.name === name) ? true : false);
  }, [dataFetch]);
  const handleFavourite = async () => {
    try {
      const check = dataFetch.find((i) => i.name === name);
      if (check) {
        const newDataAfterRemove = dataFetch.filter((i) => i.name !== name);
        const jsonValue = JSON.stringify(newDataAfterRemove);       
        await AsyncStorage.setItem("myObject", jsonValue);       
        setIsLike(isLike ? false : true);
        console.log("Remove successful");
        return;
      }    
      dataFetch.push({ name: name,
        weight: weight,
        rating: rating,
        price: price,
        image: image,
        color: color,
        bonus: bonus,
        origin: origin,
        category: category});
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
  return (

    <ScrollView>
    <Card style={menuStyles.container} mode="outlined">

    <Image source={{uri: image}} style={{width: 372, height: 300}} resizeMode="contain" />
    <Card.Content>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
      <Text variant="titleLarge" style={{textAlign:"center", marginBottom: 10}}>{name}</Text>
      <TouchableOpacity onPress={() => handleFavourite()}>
        <View style={{marginTop: 2, marginLeft: 5}}>
           {isLike ? (
            <Ionicons name="ios-heart-sharp" size={24} color="red" />
          ) : (
            <Ionicons name="ios-heart-outline" size={24} color="red" />
          )}
        </View>
      </TouchableOpacity>
      </View>
      <Chip style={{width: 120,  backgroundColor:"#FFFF33", marginTop:10}}>Price: {price}</Chip>
      <Chip style={{width: 120,  backgroundColor:"#FFFF33", marginTop:10}}>Weight: {weight}</Chip>
      <Chip style={{width: 120,  backgroundColor:"#FFFF33", marginTop:10}}>Rating: {rating}</Chip>
      <Chip style={{width: 120,  backgroundColor:"#FFFF33", marginTop:10}}>Color: {color}</Chip>
      <Chip style={{width: 120,  backgroundColor:"#FFFF33", marginTop:10}}>Bonus: {bonus}</Chip>
      <Chip style={{width: 200,  backgroundColor:"#FFFF33", marginTop:10}}>Origin: {origin}</Chip>
      <Chip style={{width: 200,  backgroundColor:"#33FFFF", marginTop:10}}>Category: {category}</Chip>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
  </Card>
  </ScrollView>
  )
}
const menuStyles = StyleSheet.create({
  container: {
    margin: 10,
    //paddingBottom:50
  }
});
export default DetailScreen