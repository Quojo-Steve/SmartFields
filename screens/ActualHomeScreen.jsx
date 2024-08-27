import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import all from "../assets/images/all.png";
import sensors from "../assets/images/sensors.png";
import disease from "../assets/images/disease.png";
import solve from "../assets/images/solve.png";
import ai from "../assets/images/ai.png";

export default function ActualHomeScreen({ navigation }) {
  const { currentUser } = useContext(AuthContext);
  const [selectedOption, setselectedOption] = useState("Yearly");
  const categories = [
    { name: "Yearly" },
    { name: "Monthly" },
    { name: "Daily" },
  ];

  const postCategories = [
    { name: "All", image: all, count: 324, high: true },
    { name: "Sensors", image: sensors, count: 719, high: true },
    { name: "AI Detection", image: ai, count: 1, high: false },
    { name: "Diseases", image: disease, count: 215, high: true },
    { name: "Solutions", image: solve, count: 15, high: false },
  ];

  //   console.log(currentUser)
  return (
    <SafeAreaView>
      <ScrollView className="min-h-full">
        <View className="p-4 pt-10">
          <View className="flex flex-row justify-between items-center">
            <View>
              <Text className="font-semibold text-[25px] capitalize">
                Hi, {currentUser?.username} 👋
              </Text>
              <Text className="text-[16px] ">SmartFields, Agric made easy</Text>
            </View>
            <View>
              {currentUser?.picturePath ? (
                <Image
                  source={{
                    uri: currentUser.picturePath,
                  }}
                  className="w-[60px] h-[60px] rounded-full object-cover bg-gray-200"
                />
              ) : (
                <Image
                  source={{
                    uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
                  }}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
              )}
            </View>
          </View>
          <View className="bg-[#0F2B2C] p-6 mt-8 rounded-[10px]">
            <View className="flex flex-row justify-between">
              <View className="flex flex-col gap-2">
                <Text className="text-[#F5F5F5] text-[12px]">Total Scans</Text>
                <Text className="text-[#EFCC17] font-semibold text-[20px]">
                  52,627
                </Text>
              </View>
              <View className="flex flex-col gap-2">
                <Text className="text-[#F5F5F5] text-[12px] capitalize">
                  Total posts
                </Text>
                <Text className="text-[#F5F5F5] font-semibold text-[20px]">
                  287
                </Text>
              </View>
              <View className="flex flex-col gap-2">
                <Text className="text-[#F5F5F5] text-[12px] capitalize">
                  Total likes
                </Text>
                <Text className="text-[#F5F5F5] font-semibold text-[20px]">
                  752,900
                </Text>
              </View>
            </View>
            <View className="flex flex-row mt-10 justify-between">
              {categories.map((option, index) => (
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#FFFFFF" : "white",
                    },
                  ]}
                  onPress={() => {
                    setselectedOption(option.name);
                  }}
                  key={index}
                  className={`rounded-[30px] px-4 min-w-[50px] h-[30px] ${
                    selectedOption == option.name && "bg-[#FFFFFF]"
                  } flex justify-center items-center`}
                >
                  <Text
                    className={`${
                      selectedOption == option.name
                        ? "text-black "
                        : "text-[#FFFFFF]"
                    } text-[14px]`}
                  >
                    {option.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View className="mt-10">
            <View>
              <Text className="capitalize text-[16px] font-semibold">
                Post categories
              </Text>
            </View>
            <View className="pt-8 flex flex-row flex-wrap gap-8 justify-between">
              {postCategories.map((item, index) => (
                <View
                  key={index}
                  className="shadow-2xl py-4  w-[100px] border rounded-[10px] border-[#0000002d] flex flex-col justify-center items-center"
                >
                  <Image
                    source={item.image || all}
                    className="w-[24px] h-[24px] object-cover"
                  />
                  <Text className="font-semibold text-[14px] mt-2">
                    {item.name}
                  </Text>
                  <Text className="font-semibold text-[20px] text-[#7D7B7B] mt-2">
                    {item.count}
                  </Text>
                  <Text
                    className={`font-semibold text-[12px] ${
                      item.high ? "text-[#05C54B]" : "text-[#E41414]"
                    }  mt-2`}
                  >
                    {item.high ? "High %" : "Low %"}
                  </Text>
                </View>
              ))}
              <TouchableOpacity className="shadow-2xl py-4 bg-[#B7F3CD] w-[100px] border rounded-[10px] border-[#50D480] flex flex-col justify-center items-center" onPress={()=> navigation.navigate("createBlog")}>
                <Text className="font-semibold text-[12px] text-[#048232] text-center mt-2">
                  Create more posts
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="h-[150px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
