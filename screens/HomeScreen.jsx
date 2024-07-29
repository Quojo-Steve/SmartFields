import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import FormattedText from "../components/FormattedText";
import { AuthContext } from "../context/AuthContext";
import ToastManager, { Toast } from "toastify-react-native";

const HomeScreen = () => {
  const { Url } = useContext(AuthContext);
  const [image, setimage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const uploadImage = async (mode) => {
    try {
      let res = {};
      if (mode == "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        res = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
      if (!res.canceled) {
        // console.log(res);
        setimage(res.assets[0].uri);
        const imageUri = res.assets[0].uri;

        const formData = new FormData();

        // Append image data to formData
        formData.append("image", {
          uri: imageUri,
          name: "photo.jpg",
          type: "image/jpeg",
        });

        const apiUrl = Url + "/ai/getAIData";

        const response = await axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setPrediction(response.data);
      }
    } catch (error) {
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  // console.log(prediction);

  return (
    <ScrollView>
      <ToastManager width={"100%"}/>
      <View className="min-h-screen flex flex-col items-center overflow-hidden px-4 pt-[70px]  bg-[#FAFBFC]">
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {!image && (
          <View className="w-full">
            <View className="w-full flex items-center justify-center">
              <Image
                source={require("../assets/plant.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.overlayText} className="mb-4">
                Take a Video or upload a Picture, SmartField makes the
                predictions! Save your Farm.
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
            <View className="pt-[50px] w-full">
              <View className="bg-[#E9F2F4] border border-dashed border-[#6CCAE8] flex flex-col p-4 justify-center items-center rounded-[10px] h-[210px] w-full">
                <Image
                  source={require("../assets/images/upload.png")}
                  className="h-[50px] w-[50px]"
                />
                <Text className="text-center text-[14px] text-[#35363A] my-4">
                  Please use this field to upload a picture if you an existing
                  image for detection
                </Text>
                <TouchableOpacity
                  className=" bg-[#095295] flex justify-center items-center rounded-[10px] h-[45px] w-[150px]"
                  onPress={() => uploadImage("gallery")}
                >
                  <Text className="text-center font-semibold text-white text-[14px] ">
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <View className="mt-8 w-full">
          {image && (
            <View className="flex flex-col justify-center items-center w-full">
              <Image
                source={{ uri: image }}
                className="h-[210px] w-full rounded-[10px]"
              />
              <View className="w-full">
                <TouchableOpacity
                  className=" bg-[#fa3434] flex justify-center items-center rounded-[10px] h-[45px] w-full mt-4"
                  onPress={() => {
                    setimage(null);
                    setPrediction(null);
                  }}
                >
                  <Text className="text-center font-semibold text-white text-[14px] ">
                    Remove Image
                  </Text>
                </TouchableOpacity>
              </View>
              {!prediction ? (
                <View className="h-[400px] w-full flex justify-center items-center">
                  <ActivityIndicator size={"small"} color={"#048232"} />
                  <Text className="text-[#02020291] mt-4">
                    One moment please...
                  </Text>
                </View>
              ) : (
                <View className="w-full">
                  <View className="w-full mt-6">
                    {prediction?.prediction?.map((p, index) => (
                      <View
                        key={index}
                        className="flex flex-row justify-between"
                      >
                        <Text className="text-center font-semibold text-[14px]">
                          {p.className.split(" - ")[1]}
                        </Text>
                        <Text className="text-center font-semibold text-[14px]">
                          {p.probability}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View className="w-full h-[1px] bg-[#02020246] my-4"></View>
                  <View className="w-full">
                    <FormattedText responseString={prediction?.data} />
                  </View>
                </View>
              )}
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
