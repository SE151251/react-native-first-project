import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Chip, Text } from "react-native-paper";
const menuItemsToDisplay = [
  {
    name: "Hoa Sen",
    price: "$5.00",
    id: "1A",
    description:"Hoa sen, biểu tượng văn hóa của Việt Nam, là một loài hoa đặc trưng với vẻ đẹp tinh tế và ý nghĩa sâu sắc. Với những cánh hoa trắng tinh khôi, sen nổi bật giữa vùng nước lộng lẫy. Mỗi cánh hoa chứa đựng sự thanh cao, lòng nhân ái và khát vọng tự do. Hoa sen tượng trưng cho sự trường tồn và trở nên mạnh mẽ dưới mặt nước đen tối. Nó đại diện cho sự tinh khiết và sự giải thoát khỏi cám dỗ trong cuộc sống. Hoa sen, với vẻ đẹp dịu dàng và ý nghĩa sâu sắc, thể hiện sự cao quý và vẻ đẹp thiêng liêng của Việt Nam.",
    category:"Normal flower",
    image:
      require('../assets/hoa_sen.jpg'),
  },
  {
    name: "Hoa Lan",
    price: "$5.00",
    id: "2B",
    description:"Hoa lan, một trong những loài hoa quý tộc và lộng lẫy nhất, mang trong mình vẻ đẹp kiêu sa và độc đáo. Với những cánh hoa tinh tế, hoa lan tỏa hương thơm quyến rũ, thu hút mọi ánh nhìn. Sắc màu của lan đa dạng, từ trắng tinh khôi, hồng nhẹ nhàng đến vàng rực rỡ và tím quý phái. Hoa lan tượng trưng cho sự quý phái, sự thịnh vượng và may mắn. Nó thể hiện tinh thần kiên cường và sự mạnh mẽ, vượt qua mọi khó khăn để nở rộ trong tình cảnh khắc nghiệt. Hoa lan là biểu tượng của sự cao quý, tinh tế và đẳng cấp, làm tôn vinh vẻ đẹp tự nhiên và nghệ thuật trong thế giới hoa.",
    category:"Normal flower",
    image:
      require('../assets/hoa_lan.jpg'),
  },
  {
    name: "Hoa Cúc",
    price: "$7.50",
    id: "3C",
    description:"Hoa cúc, với vẻ đẹp đơn giản và tự nhiên, mang đến cảm giác tươi mới và thanh bình. Những cánh hoa cúc nhỏ xinh, màu sắc đa dạng từ trắng, vàng, cam, đỏ đều tạo nên một khối màu tươi sáng và hài hòa. Hoa cúc tượng trưng cho sự trong sạch, tinh khiết và sự thanh cao. Nó thể hiện sự giản dị, sự chân thành và lòng nhân ái. Hoa cúc còn mang ý nghĩa của niềm vui và hạnh phúc, là biểu tượng của sự trân trọng cuộc sống và tình yêu thương. Với vẻ đẹp giản dị và ý nghĩa sâu sắc, hoa cúc trở thành một điểm nhấn tuyệt vời trong các bó hoa và mang đến sự tươi mới cho mọi không gian.",
    category:"Normal flower",
    image:
      require('../assets/hoa_cuc.jpg'),
  },
  {
    name: "Hoa Ly",
    price: "$5.00",
    id: "4D",
    description:"Hoa ly là một loài hoa tuyệt đẹp với những đóa hoa hình cầu hoặc hình chuông, có những màu sắc rực rỡ như đỏ, vàng, cam, hồng và trắng. Với những cánh hoa hoa lệ và mùi hương thơm ngát, hoa ly tạo nên một khung cảnh thú vị và quyến rũ. Hoa ly tượng trưng cho sự tinh tế, sự cao quý và sự hoàn hảo. Nó biểu thị sự kiên nhẫn và sự mạnh mẽ, vì hoa ly cần thời gian để trưởng thành trước khi nở rộ. Hoa ly còn mang ý nghĩa của sự thịnh vượng, may mắn và tình yêu tươi đẹp. Với vẻ đẹp tuyệt đỉnh và ý nghĩa sâu sắc, hoa ly làm cho không gian trở nên phong cách và tinh tế.",
    category:"Normal flower",
    image:
      require('../assets/hoa_ly.jpg'),
  },
  {
    name: "Hoa Tulip",
    price: "$5.00",
    id: "5E",
    description:"Hoa tulip, với những đài hoa đặc trưng và hình dáng đẹp mắt, là biểu tượng của sự tươi mới và nét đẹp tinh tế. Có rất nhiều màu sắc tulip khác nhau, từ trắng, đỏ, vàng, hồng, cam đến tím, mỗi màu mang ý nghĩa riêng. Tulip tượng trưng cho sự hoàn mỹ, tình yêu và hy vọng. Nó thể hiện sự tinh khiết và sự tự do trong tình yêu. Hoa tulip còn biểu thị sự tươi trẻ và sự thịnh vượng. Với vẻ đẹp đặc biệt và ý nghĩa sâu sắc, hoa tulip là một biểu tượng của sự rạng rỡ và sự phong cách trong thế giới hoa.",
    category:"Normal flower",
    image:
      require('../assets/hoa_tulip.jpg'),
  },
  {
    name: "Hoa Đào",
    price: "$8.50",
    id: "6F",
    description:"Hoa đào, hoa quý tộc của mùa xuân, là biểu tượng tinh túy của sự tươi mới và thịnh vượng. Với những cánh hoa tơi tả, màu hồng, trắng hoặc đỏ, hoa đào tạo nên một cảnh sắc tuyệt đẹp và lãng mạn. Đào tượng trưng cho sự nảy nở, sự phục hưng và sự hy vọng. Nó biểu thị sự tinh khiết và sự thanh cao. Hoa đào còn mang ý nghĩa của tình yêu và hạnh phúc gia đình. Với vẻ đẹp độc đáo và ý nghĩa sâu sắc, hoa đào làm tăng thêm vẻ trang trọng và phong cách cho mọi không gian, và là điểm nhấn đặc biệt trong các lễ hội mùa xuân.",
    category:"Normal flower",
    image:
      require('../assets/hoa_dao.jpg'),
  },
  {
    name: "Hoa Mai",
    price: "$10.00",
    id: "7G",
    description:"Hoa mai, là biểu tượng đặc trưng của mùa xuân, là một loài hoa thân thuộc và đẹp mắt. Với những cánh hoa màu vàng tươi sáng, hoa mai tỏa ra một sức sống rực rỡ và sự tươi mới. Mai tượng trưng cho sự phát triển và sự thịnh vượng. Nó biểu thị sự mạnh mẽ và sự kiên nhẫn, vì hoa mai nở rộ khi mọi thứ còn ngập trong cái lạnh của mùa đông. Hoa mai còn mang ý nghĩa của sự may mắn và thành công. Với vẻ đẹp tinh tế và ý nghĩa sâu sắc, hoa mai làm cho không gian trở nên tươi vui và đầy sức sống, và góp phần tạo nên không khí phấn khởi trong mỗi dịp xuân về.",
    category:"Normal flower",
    image:
      require('../assets/hoa_mai.jpg'),
  },
  {
    name: "Hoa Hồng",
    price: "$14.00",
    id: "8H",
    description:"Hoa hồng, biểu tượng vĩnh cửu của tình yêu và sắc đẹp, là một loài hoa tuyệt đẹp và quý giá. Với những cánh hoa mềm mại và hương thơm quyến rũ, hoa hồng mang đến sự lãng mạn và tình cảm. Hồng tượng trưng cho tình yêu chân thành và sự đam mê mãnh liệt. Mỗi màu sắc của hoa hồng mang ý nghĩa riêng, từ đỏ tượng trưng cho tình yêu đam mê, trắng biểu thị sự trong sạch và tinh khiết, hồng nhẹ nhàng cho sự hoà hợp và hạnh phúc. Hoa hồng còn biểu thị sự cao quý và sự đẳng cấp. Với vẻ đẹp lộng lẫy và ý nghĩa sâu sắc, hoa hồng là một biểu tượng vĩnh cửu của tình yêu và làm say đắm lòng người trong mỗi dịp đặc biệt.",
    category:"Normal flower",
    image:
      require('../assets/hoa_hong.jpg'),
  },
  {
    name: "Hoa Hướng Dương",
    price: "$11.00",
    id: "9I",
    description:"Hoa hướng dương, với những đóa hoa lớn, màu vàng sáng và các cánh hoa tươi tắn, là biểu tượng của sự tươi vui, năng lượng và lòng trung thành. Hoa hướng dương luôn hướng về phía mặt trời và theo dõi chuyển động của nó, tượng trưng cho sự lạc quan và sự sáng láng. Nó biểu thị sự tự tin và sự mạnh mẽ, vì những cây hướng dương có khả năng đứng vững trong gió và nắng nóng. Hoa hướng dương còn mang ý nghĩa của sự tôn trọng và tình yêu thương. Với vẻ đẹp rực rỡ và ý nghĩa sâu sắc, hoa hướng dương là biểu tượng của sự sống và tạo ra không gian tươi vui và sáng sủa.",
    category:"Normal flower",
    image:
    require('../assets/hoa_huong_duong.jpg'),
  },
  {
    name: "Hoa Hậu",
    price: "$ ∞",
    id: "10J",
    description:"Người phụ nữ Việt Nam là những người mang trong mình sự đa năng, sức mạnh và tình yêu thương. Họ là những người phụ nữ vô cùng kiên cường, chịu khó và sáng tạo trong công việc và gia đình. Người phụ nữ Việt Nam có nền văn hóa lâu đời và truyền thống gia đình sâu sắc, họ có vai trò quan trọng trong việc nuôi dưỡng và giáo dục con cái, gìn giữ và truyền bá những giá trị truyền thống cho thế hệ sau. Họ cũng đóng góp đáng kể vào sự phát triển kinh tế và xã hội của đất nước, tham gia vào nhiều lĩnh vực như giáo dục, y tế, nghệ thuật, kinh doanh và chính trị. Người phụ nữ Việt Nam mang trong mình sự mạnh mẽ, sự tự tin và lòng nhân ái, là nguồn động lực quan trọng cho sự phát triển và tiến bộ của quốc gia.",
    category:"Vip Pro flower",
    image:
    require('../assets/hoa_hau.jpg'),
  },
];
// let dataFavourite = []

const FlatListItems = ({ navigation }) => {
  const [dataFetch, setDataFetch] = useState();
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
      console.log("Flatlist screen is focused => Load data in FlatList screen");
    } else {
      // Thực hiện các tác vụ khi màn hình không được tập trung
      console.log("FlatList screen is not focused");
    }
  }, [isFocused]);
  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      price={item.price}
      image={item.image}
      id={item.id}
      category={item.category}
      description={item.description}
      dataFetch={dataFetch}
      navigation={navigation}
      setDataFetch={setDataFetch}
    />
  );
  return dataFetch ? (
    <View style={menuStyles.container}>
      <Text variant="headlineMedium" style={{textAlign:"center", color:"#03C8DF", marginTop:10}}>︵✿List Flower‿✿</Text>      
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
const Item = ({
  name,
  price,
  image,
  id,
  category,
  description,
  navigation,
  dataFetch,
  setDataFetch,
}) => {
  const [isLike, setIsLike] = useState(
    dataFetch.find((i) => i.id === id) ? true : false
  );
  useEffect(() => {
    setIsLike(dataFetch.find((i) => i.id === id) ? true : false);
  }, [dataFetch]);
  const handleFavourite = async (id) => {
    try {
      const check = dataFetch.find((i) => i.id === id);
      if (check) {
        const newDataAfterRemove = dataFetch.filter((i) => i.id !== id);
        const jsonValue = JSON.stringify(newDataAfterRemove);
        await AsyncStorage.setItem("myObject", jsonValue);
        setDataFetch(newDataAfterRemove);
        setIsLike(isLike ? false : true);
        console.log("Remove successful");
        return;
      }
      const obj = menuItemsToDisplay.find((i) => i.id === id);
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
            id: id,
            name: name,
            image: image,
            price: price,
            category: category,
            description: description,
            like: isLike,
            dataFetch: dataFetch
          });
        }}
      >
        <Image source={image} style={{ width: 100, height: 100 }} resizeMode="contain"/>
        <View style={menuStyles.itemDescription}>
        {/* <Text style={menuStyles.itemName}>{name}</Text> */}
        <Text variant="titleLarge" style={{marginLeft: 3}}>{name}</Text>
        {/* <Text style={menuStyles.itemPrice}>Price: {price}</Text> */}
        <Chip style={menuStyles.itemPrice}>Price: {price}</Chip>
        </View>     
      </Pressable>
      <TouchableOpacity  onPress={() => handleFavourite(id)}>
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
    backgroundColor:"#fff"
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
   marginLeft: 20,
   marginTop:10
  },
  itemName: {
    color: "black",
    fontSize: 20,
  },
  itemPrice: {
    marginTop:10,
    width: 120,
    backgroundColor:"#fbcfcd"
  },
  icon:{
    paddingTop:40
  }
});

export default FlatListItems;
