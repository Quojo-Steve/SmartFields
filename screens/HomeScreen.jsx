import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import React from "react";
import Navbar from "../components/Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ArrowUpTrayIcon } from "react-native-heroicons/outline";

const HomeScreen = () => {
  return (
    <View className="relative min-h-screen mx-4 flex flex-col items-center overflow-hidden">
      <View className="w-full flex items-center justify-center mt-4">
        <Image
          source={require("../assets/plant.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.overlayText} className="mb-4">
          Take a Video or upload a Piture, SmartField makes the predictions!
          Save your Farm.
        </Text>
      </View>

      <Pressable className="text-white font-semibold bg-green-600 mt-4 py-2 px-28 rounded-lg">
        <Text>Take a Video</Text>
      </Pressable>

      <View className="bg-blue-100 border border-dashed border-blue-300 mt-4 flex flex-col p-4 justify-center items-center rounded-2xl gap-3">
        <ArrowUpTrayIcon size={hp(4)} className="text-gray-600" />
        <Text className="text-center text-sm">
          Please use this field to upload a picture if you an existing image for
          detection
        </Text>
        <Pressable className="text-white font-semibold bg-blue-600 mt-4 py-2 px-16 rounded-lg">
          <Text>Upload</Text>
        </Pressable>
      </View>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240, // you can adjust the height as needed
  },
  overlayText: {
    position: "absolute",
    color: "#E9F2F4",
    // fontFamily: "Nokora",
    fontSize: 20,
    lineHeight: 26.44,
    fontWeight: 700,
    textAlign: "left",
    padding: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
