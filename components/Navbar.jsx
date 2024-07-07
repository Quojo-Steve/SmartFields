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
    <View className="flex justify-between items-center flex-row absolute w-full py-4 px-5 shadow-2xl shadow-gray-400 bottom-10 rounded-[40px] ">
      <View className="flex flex-row justify-between items-center w-[30%]">
        <Pressable className="flex flex-col items-center">
          <HomeIcon size={hp(4)} className="text-gray-400" />
          <Text className="text-gray-400">Home</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("blog")}
          className="flex flex-col items-center"
        >
          <NewspaperIcon size={hp(4)} className="text-gray-400" />
          <Text className="text-gray-400">Blog</Text>
        </Pressable>
      </View>
      <View className="absolute left-1/2 transform -translate-x-1/2 bottom-1/2">
        <Pressable
          className="w-[90px] h-[90px] bg-green-600 rounded-full items-center justify-center shadow-lg shadow-green-600"
          onPress={() => navigation.navigate("home")}
        >
          <CameraIcon size={hp(6)} className="text-white" />
        </Pressable>
      </View>
      <View className="flex flex-row justify-between items-center w-[35%]">
        <Pressable className="flex flex-col items-center">
          <ClockIcon size={hp(4)} className="text-gray-400" />
          <Text className="text-gray-400">History</Text>
        </Pressable>
        <Pressable className="flex flex-col items-center">
          <UserIcon size={hp(4)} className="text-gray-400" />
          <Text className="text-gray-400">Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Navbar;
