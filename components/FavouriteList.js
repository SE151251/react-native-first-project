import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
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
  setDataFetch,
  data,
  navigation,
}) => {
  const removeItem = async (name) => {
    try {
      const newList = data.filter((i) => i.name !== name);
      const jsonValue = JSON.stringify(newList);
      await AsyncStorage.setItem("myObject", jsonValue);
      if (newList.length === 0) {
        return setDataFetch();
      }
      setDataFetch(newList);
    } catch (error) {
      console.log("Error remove data:", error);
    }
  };
  return (
    <>
      <View style={menuStyles.innerContainer}>
        <Pressable
          style={menuStyles.item}
          onPress={() => {
            navigation.navigate("Detail", {
              name: name,
              weight: weight,
              rating: rating,
              price: price,
              image: image,
              color: color,
              bonus: bonus,
              origin: origin,
              category: category,
              like: true,
              dataFetch: data,
            });
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{uri: image}}
              style={{ width: 100, height: 100, marginRight: 20 }}
              resizeMode="contain"
            />
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text
                variant="titleMedium"
                style={{ marginBottom: 10, marginLeft: 5 }}
              >
                {name}
              </Text>
              <Chip style={{ width: 120, backgroundColor: "#fbcfcd" }}>
                Price: {price}
              </Chip>
              
            </View>
          </View>
        </Pressable>

        <TouchableOpacity onPress={() => removeItem(name)}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              style={menuStyles.icon}
              name="ios-heart-sharp"
              size={24}
              color="red"
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const FavouriteList = ({ navigation }) => {
  const [dataFetch, setDataFetch] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      // Thực hiện các tác vụ khi màn hình được tập trung
      loadData();
    } else {
      console.log("Favourite screen is not focused");
    }
  }, [isFocused]);
  const handleDelete = () => {
    Alert.alert("Xác nhận", "Xóa hết thiệt hả?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: clearData, style: "destructive" },
    ]);
  };
  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      setDataFetch();
    } catch (error) {
      console.log("Error clearing data:", error);
    }
  };
  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("myObject");
      const obj = jsonValue != null ? JSON.parse(jsonValue) : [];
      setDataFetch(obj.length === 0 ? null : obj);
    } catch (error) {
      console.log("Error loading data:", error);
    }
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
      data={dataFetch}
      navigation={navigation}
      setDataFetch={setDataFetch}
    />
  );
  if (dataFetch) {
    return (
      <View style={menuStyles.container}>
        <Text
          variant="headlineMedium"
          style={{ textAlign: "center", color: "#03C8DF", marginTop: 10 }}
        >
          Your Favorite List
        </Text>
        <FlatList
          style={{ flex: 0.935 }}
          data={dataFetch}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
        ></FlatList>

        {dataFetch.length > 1 && (
          <Button
            mode="contained-tonal"
            style={{ flex: 0.065, borderRadius: 0 }}
            buttonColor="#FA6B6B"
            onPress={handleDelete}
            icon="trash-can-outline"
          >
            Clear All
          </Button>
        )}
      </View>
    );
  } else {
    return (
      <Text style={{ textAlign: "center", marginTop: "40%" }}>
        <AntDesign name="frowno" size={24} color="black" />
        Empty List
      </Text>
    );
  }
};

// Add styles to the component
const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
    marginLeft: 10,
  },
  itemName: {
    color: "black",
    fontSize: 20,
  },
  itemPrice: {
    color: "black",
    fontSize: 20,
    marginTop: 40,
  },
  icon: {
    paddingTop: 40,
  },
  deleteButton: {
    position: "relative",
    bottom: 0,
  },
});

export default FavouriteList;
