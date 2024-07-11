import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import {
  HomeIcon,
  ClockIcon,
  UserIcon,
  NewspaperIcon,
  CameraIcon,
} from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  return (
    <View className="absolute w-full flex justify-between items-center bottom-10 px-4">
      <View className="flex justify-between items-center flex-row w-full py-4 px-8 rounded-[50px] bg-[#FFFFFF] shadow-md h-[95px]">
        <View className="flex flex-row justify-between items-center w-[30%]">
          <Pressable className="flex flex-col items-center">
            <View className="flex justify-center items-center gap-2">
              <Image
                source={require("../assets/images/home.png")}
                className="h-[24px] w-[24px]"
              />
              <Text className="text-[#7D7B7B] text-[12px] font-[600]">
                Home
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("blog")}
            className="flex flex-col items-center"
          >
            <View className="flex justify-center items-center gap-2">
              <Image
                source={require("../assets/images/blog.png")}
                className="h-[24px] w-[24px]"
              />
              <Text className="text-[#7D7B7B] text-[12px] font-[600]">
                Blog
              </Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          className="w-[90px] h-[90px] bg-[#048232] rounded-full items-center justify-center relative top-[-50px]"
          onPress={() => navigation.navigate("home")}
        >
          <View className="flex justify-center items-center gap-2">
            <Image
              source={require("../assets/images/camera.png")}
              className="h-[40px] w-[40px]"
            />
          </View>
        </Pressable>

        <View className="flex flex-row justify-between items-center w-[30%]">
          <Pressable className="flex flex-col items-center">
            <View className="flex justify-center items-center gap-2">
              <Image
                source={require("../assets/images/history.png")}
                className="h-[24px] w-[24px]"
              />
              <Text className="text-[#7D7B7B] text-[12px] font-[600]">
                History
              </Text>
            </View>
          </Pressable>
          <Pressable className="flex flex-col items-center">
            <View className="flex justify-center items-center gap-2">
              <Image
                source={require("../assets/images/profile.png")}
                className="h-[24px] w-[24px]"
              />
              <Text className="text-[#7D7B7B] text-[12px] font-[600]">
                Profile
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Navbar;
