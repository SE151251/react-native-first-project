import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Categories } from "../dataChange";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Chip, Text } from "react-native-paper";
const listCategories = ["All", "Cattleya", "Phalaenopsis", "Dendrobium"];

const FlatListItems = ({ navigation }) => {
  const [dataFetch, setDataFetch] = useState(null);
  const [dataInit, setDataInit] = useState();
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
      setDataInit(Categories);     
    } else {
      console.log("FlatList screen is not focused");
    }
  }, [isFocused]);

  const handleFilter = (key) => {
    if (key === "All") {
      setDataInit(Categories);
      return;
    }
    const dataFilter = Categories.filter((d) => d.category === key);
    setDataInit(dataFilter);
  };

  const renderItem = ({ item }) => (
    <Item
      name={item.name}   
      weight={item.weight}
      rating={item.rating}
      price={item.price}
      image={item.image}
      color={item.color}
      bonus={item.bonus}
      origin={item.origin}
      category={item.category}
      dataFetch={dataFetch}
      navigation={navigation}
      setDataFetch={setDataFetch}
    />
  );
  return dataFetch !== null ? (
    <View style={menuStyles.container}>
      <Text
        variant="headlineMedium"
        style={{
          textAlign: "center",
          color: "#03C8DF",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        List Flower
      </Text>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
            borderTopWidth: 1,
          }}
        >
          <Ionicons name="filter" size={24} color="black" />
          <Text variant="titleMedium" style={{ margin: 10 }}>
            Filter by category
          </Text>
        </View>

        <FlatList
          data={listCategories}
          keyExtractor={(item) => item}
          horizontal={true}
          style={{ height: 60, borderBottomWidth: 1, marginBottom: 20 }}
          renderItem={({ item }) => (
            <View>
              <Chip
                style={{ marginRight: 10, marginLeft: 10, height: 40 }}
                onPress={() => handleFilter(item)}
              >
                {item}
              </Chip>
            </View>
          )}
        />
      </View>
      <FlatList
        data={dataInit}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  ) : (
    <Text>Loading</Text>
  );
};
const Item = ({
  name,
  image,
  price,
  category,
  weight,
  rating,
  color,
  bonus,
  origin,
  navigation,
  dataFetch,
  setDataFetch,
}) => {
  const [isLike, setIsLike] = useState(
    dataFetch.find((i) => i.name === name) ? true : false
  );
  useEffect(() => {
    setIsLike(dataFetch.find((i) => i.name === name) ? true : false);
  }, [dataFetch]);
  const handleFavourite = async (name) => {
    try {
      const check = dataFetch.find((i) => i.name === name);
      if (check) {
        const newDataAfterRemove = dataFetch.filter((i) => i.name !== name);
        const jsonValue = JSON.stringify(newDataAfterRemove);
        await AsyncStorage.setItem("myObject", jsonValue);
        setDataFetch(newDataAfterRemove);
        setIsLike(isLike ? false : true);
        console.log("Remove successful");
        return;
      }
      const obj = Categories.find((i) => i.name === name);
      dataFetch.push(obj);
      const jsonValue = JSON.stringify(dataFetch);
      await AsyncStorage.setItem("myObject", jsonValue);
      setDataFetch(dataFetch);
      setIsLike(isLike ? false : true);
      console.log("Add successful");
    } catch (error) {
      console.log("Error saving data:", error);
      setIsLike(false);
    }
  };

  return (
    <View style={menuStyles.innerContainer}>
      <Pressable
        style={menuStyles.item}
        onPress={() => {
          navigation.navigate("Detail", {        
            name:name,
            weight:weight,
            rating:rating,
            price:price,
            image:image,
            color:color,
            bonus:bonus,
            origin:origin,
            category:category,
            like: isLike,
            dataFetch: dataFetch,
          });
        }}
      >
        <Image
          // source={image}
          source={{ uri: image }}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
        <View style={menuStyles.itemDescription}>
          <Text variant="titleMedium" style={{ marginLeft: 3 }}>
            {name}
          </Text>
          <Chip style={menuStyles.itemPrice}>Price: {price}</Chip>
          <Chip style={menuStyles.itemPrice}>{category}</Chip>
        </View>
      </Pressable>
      <TouchableOpacity onPress={() => handleFavourite(name)}>
        <View style={menuStyles.icon}>
          {isLike ? (
            <Ionicons name="ios-heart-sharp" size={24} color="red" />
          ) : (
            <Ionicons name="ios-heart-outline" size={24} color="red" />
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
    backgroundColor: "#fff",
  },
  filter: {
    flex: 2,
    backgroundColor: "#fff",
  },
  innerContainer: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDescription: {
    marginLeft: 20,
    //marginTop: 10,
  },
  itemName: {
    color: "black",
    fontSize: 20,
  },
  itemPrice: {
    marginTop: 10,
    width: 120,
    backgroundColor: "#fbcfcd",
  },
  itemPrice: {
    marginTop: 10,
    width: 150,
    backgroundColor: "#fbcfcd",
  },
  icon: {
    paddingTop: 40,
  },
});

export default FlatListItems;
