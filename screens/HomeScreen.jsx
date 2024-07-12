import { StyleSheet, Text, View, Pressable, Image, Button } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View className="min-h-screen flex flex-col items-center overflow-hidden px-4 pt-[70px]">
      <View className="w-full flex items-center justify-center">
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

      <Pressable className="text-white font-semibold bg-[#048232] mt-4 h-[50px] flex items-center justify-center rounded-lg w-full">
        <Text className="text-center font-semibold text-white text-[14px]">
          Take a Video
        </Text>
      </Pressable>

      <View className="pt-[50px]">
        <View className="bg-[#E9F2F4] border border-dashed border-[#6CCAE8] flex flex-col p-4 justify-center items-center rounded-[10px] gap-3 h-[210px]">
          <Image
            source={require("../assets/images/upload.png")}
            className="h-[50px] w-[50px]"
          />
          <Text className="text-center text-[14px] text-[#35363A]">
            Please use this field to upload a picture if you an existing image
            for detection
          </Text>
          <Pressable className=" bg-[#095295] flex justify-center items-center rounded-[10px] h-[45px] w-[150px]">
            <Text className="text-center font-semibold text-white text-[14px] ">
              Upload
            </Text>
          </Pressable>
        </View>
      </View>
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
    fontSize: 20,
    lineHeight: 26.44,
    fontWeight: 700,
    textAlign: "left",
    padding: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
