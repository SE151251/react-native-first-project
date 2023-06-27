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
  const { name, price, image, like, id, category, description} = route.params;
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
      dataFetch.push({id: id, name: name, price: price, image: image, category: category, description: description});
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
  console.log("data in detail: ",category, description);
  return (
    // <View>     
    //   <Text>DetailScreen</Text>
    //   <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
    //   <Text >{name}</Text>
    //   <Text >{price}</Text>
    //   <TouchableOpacity onPress={() => handleFavourite()}>
    //     <View style={{ flexDirection: "row", alignItems: "center" }}>
    //       {isLike ? (
    //         <Ionicons name="ios-heart-sharp" size={24} color="black" />
    //       ) : (
    //         <Ionicons name="ios-heart-outline" size={24} color="black" />
    //       )}
    //     </View>
    //   </TouchableOpacity>
    // </View>
    <ScrollView>
    <Card style={menuStyles.container} mode="outlined">
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */} 
    <Image source={image} style={{width: 372, height: 300}} resizeMode="contain" />
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
      <Text variant="bodyMedium">{description}</Text>
      <Chip style={{width: 120,  backgroundColor:"#FFFF33", marginTop:10}}>Price: {price}</Chip>
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