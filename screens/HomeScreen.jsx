import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const HomeScreen = () => {
  const [image, setimage] = useState(null);
  const uploadImage = async (mode) => {
    try {
      let res = {};
      if (mode == "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        res = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
      if (!res.canceled) {
        // console.log(res)
        setimage(res.assets[0].uri);
        const formData = new FormData()
        formData.append("image", image)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View className="min-h-screen flex flex-col items-center overflow-hidden px-4 pt-[70px]  bg-[#FAFBFC]">
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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

        <TouchableOpacity
          className="text-white font-semibold bg-[#048232] mt-4 h-[50px] flex items-center justify-center rounded-lg w-full"
          onPress={uploadImage}
        >
          <Text className="text-center font-semibold text-white text-[14px]">
            Take a Video
          </Text>
        </TouchableOpacity>

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
            {image ? (
              <TouchableOpacity
                className=" bg-[#fa3434] flex justify-center items-center rounded-[10px] h-[45px] w-[150px]"
                onPress={() => setimage(null)}
              >
                <Text className="text-center font-semibold text-white text-[14px] ">
                  Remove Image
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className=" bg-[#095295] flex justify-center items-center rounded-[10px] h-[45px] w-[150px]"
                onPress={() => uploadImage("gallery")}
              >
                <Text className="text-center font-semibold text-white text-[14px] ">
                  Upload
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="mt-8 w-full">
          {image && (
            <View className="flex flex-col justify-center items-center">
              <Image source={{ uri: image }} className="h-[140px] w-full" />
              <Text>Hello</Text>
            </View>
          )}
        </View>
        <View className="h-[180px]"></View>
      </View>
    </ScrollView>
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
