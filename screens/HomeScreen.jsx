import React from "react";
import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import Navbar from "../components/Navbar";
import { ArrowUpTrayIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { launchImageLibrary } from "react-native-image-picker";

const HomeScreen = () => {
  const selectFile = () => {
    let options = {
      mediaType: "mixed", // Allows selection of both images and videos
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("User cancelled image picker");
      } else if (response.errorCode) {
        Alert.alert("ImagePicker Error: ", response.errorMessage);
      } else {
        console.log(response.assets);
        // Handle the selected image or video here
      }
    });
  };

  return (
    <View className="relative min-h-screen mx-4 flex flex-col items-center overflow-hidden lg:mx-20">
      <View className="w-full flex items-center justify-center mt-4 lg:mt-8">
        <Image
          source={require("../assets/plant.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.overlayText}>
          Take a Video or upload a Picture, SmartField makes the predictions!
          Save your Farm.
        </Text>
      </View>

      <Pressable className="text-white font-semibold bg-green-600 mt-4 py-2 px-28 rounded-lg lg:px-40">
        Take a Video
      </Pressable>

      <View className="bg-blue-100 border border-dashed border-blue-300 mt-4 flex flex-col p-4 justify-center items-center rounded-2xl gap-3 lg:p-8 lg:gap-6">
        <ArrowUpTrayIcon size={hp(4)} className="text-gray-600" />
        <Text className="text-center text-sm lg:text-base">
          Please use this field to upload a picture if you have an existing image for detection
        </Text>
        <Pressable
          className="text-white font-semibold bg-blue-600 mt-4 py-2 px-16 rounded-lg lg:px-32"
          onPress={selectFile}
        >
          Upload
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
