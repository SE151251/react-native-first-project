import React from 'react';

import { View, Text, StyleSheet, SectionList, Pressable } from 'react-native';

const menuItemsToDisplay = [
  {
    title: 'Appetizers',
    data: [
      { name: 'Hummus', price: '$5.00' },
      { name: 'Moutabal', price: '$5.00' },
      { name: 'Falafel', price: '$7.50' },
      { name: 'Marinated Olives', price: '$5.00' },
      { name: 'Kofta', price: '$5.00' },
      { name: 'Eggplant Salad', price: '$8.50' },
    ],
  },
  {
    title: 'Main Dishes',
    data: [
      { name: 'Guacamole', price: '$6.00' },
      { name: 'Caprese Skewers', price: '$8.00' },
      { name: 'Bruschetta', price: '$7.50' },
      { name: 'Spinach Artichoke Dip', price: '$6.50' },
      { name: 'Stuffed Mushrooms', price: '$9.00' },
      { name: 'Crispy Calamari', price: '$10.00' },
    ],
  },
  {
    title: 'Sides',
    data: [
      { name: 'Chicken Wings', price: '$9.00', id: '11K' },
      { name: 'Potato Skins', price: '$8.50' },
      { name: 'Shrimp Cocktail', price: '$10.50' },
      { name: 'Cheese Sticks', price: '$6.50' },
      { name: 'Crispy Tofu Bites', price: '$7.00' },
      { name: 'Stuffed Jalapenos', price: '$7.50' },
    ],
  },
  {
    title: 'Desserts',
    data: [
      { name: 'Spring Rolls', price: '$6.50' },
      { name: 'Edamame', price: '$4.50' },
      { name: 'Chicken Satay', price: '$8.00' },
      { name: 'Pita and Dips', price: '$7.50' },
      { name: 'Cheese Hoang', price: '$12.00' },
      { name: 'Fried Pickles', price: '$10.50' },
    ],
  },
];

const Item = ({ name, price }) => (
  // <View>
  //   <Text>{name}</Text>
  //   <Text>{price}</Text>
  // </View>
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.itemText}>{name}</Text>
    <Text style={menuStyles.itemText}>{price}</Text>
  </View>
);

const MenuItems = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Item name={item.name} title={item.title} price={item.price} />
  );
  // const seperatorLine = () => <View style={menuStyles.seperatorLine}></View>;

  const renderSectionHeader = ({ section: { title } }) => {
    <View style={menuStyles.headerStyles}>
      <Text style={menuStyles.sectionHeader}>{title}</Text>
    </View>;
  };

  return (
    <View style={menuStyles.container}>
      <SectionList
        sections={menuItemsToDisplay}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        // ItemSeparatorComponent={seperatorLine}
      ></SectionList>

      <Pressable
        onPress={() => {
          navigation.navigate('Wellcome');
        }}>
        <Text style={{ color: 'red' }}>Hello </Text>
      </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#F4CE14',
    fontSize: 20,
  },
  seperatorLine: {
    borderWidth: 0.5,
    borderColor: 'white',
    margin: 10,
  },
  headerStyles: { backgroundColor: '#F4CE14' },
  sectionHeader: {
    color: 'back',
    fontSize: 26,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});

export default MenuItems;
