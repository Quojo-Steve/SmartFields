import { StyleSheet, Text, View, Pressable } from "react-native";
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

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="relative min-h-screen m-4">
      <Text>HomeScreen</Text>
      <View className="flex justify-between items-center flex-row absolute w-full py-4 px-5 shadow-2xl shadow-gray-400 bottom-12 rounded-[40px]">
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
        <View className="bg-green-600 shadow-md shadow-green-600 w-[90px] -top-[50%] rounded-full h-[90px] flex items-center justify-center left-[40%] absolute">
          <Pressable>
            <CameraIcon size={hp(6)} className="text-white" />
          </Pressable>
        </View>
        <View className="flex flex-row justify-between items-center w-[30%]">
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
