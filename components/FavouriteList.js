import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, Chip, Text } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
const Item = ({ name, price, image, id, data, setDataFetch, navigation}) => {
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
    <>
    <View style={menuStyles.innerContainer}>
      <View style={{flexDirection:"row"}}>
      <Image source={image} style={{ width: 100, height: 100, marginRight: 20 }} resizeMode="contain" />
      <View style={{flexDirection:"column", justifyContent:"center"}}>
      <Text variant="titleLarge" style={{marginBottom:10, marginLeft: 5}}>{name}</Text>
      <Chip style={{width: 120, backgroundColor:"#fbcfcd"}}>Price: {price}</Chip>
      </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(id)}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons style={menuStyles.icon} name="ios-heart-sharp" size={24} color="red" />
        </View>
      </TouchableOpacity>
    </View>
  </>
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
      'Xóa hết thiệt hả?',
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
    <Text variant="headlineMedium" style={{textAlign:"center", color:"#03C8DF", marginTop:10}}>╰❥Your Favorite List︵✰</Text> 
        <FlatList
         style={{flex: .935}}
          data={dataFetch}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        ></FlatList>
         <Button  mode="contained-tonal" style={{flex: .065, borderRadius:0}} buttonColor="#FA6B6B" onPress={handleDelete} icon="trash-can-outline">Clear All</Button>
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
    backgroundColor:"#FFF"
  },
  innerContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 15
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDescription:{
   marginLeft: 10
  },
  itemName: {
    color: "black",
    fontSize: 20,
  },
  itemPrice: {
    color: "black",
    fontSize: 20,
    marginTop:40
  },
  icon:{
    paddingTop:40
  },
  deleteButton: {
    position:"relative",
    bottom: 0
  }
});

export default FavouriteList;
