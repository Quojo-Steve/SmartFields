import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const FirstScreen = ({ navigation }) => {
  return (
    <View className="min-h-screen flex flex-col items-center overflow-hidden bg-[#17A34A]">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="h-[70%] w-full ">
        <ImageBackground
          source={require("../assets/images/image.png")}
          className="h-full w-full"
          resizeMode="cover"
        >
          <Text className="text-base font-bold text-white mt-[35px] ml-4">
            SMARTFIELDS
          </Text>
        </ImageBackground>
      </View>
      <View className=" w-full px-4 absolute bottom-12">
        <Text
          className="text-[#F5F5F5] mb-4"
          style={{
            fontFamily: "Segoe UI",
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 26.6,
            textAlign: "left",
          }}
        >
          Welcome, Let’s get Started!
        </Text>

        <Text
          className="text-[#F5F5F5] mb-9"
          style={{
            fontFamily: "Segoe UI",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 18.62,
            textAlign: "left",
          }}
        >
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </Text>
        <TouchableOpacity
          className="bg-white p-3 rounded-xl mb-4"
          onPress={() => navigation.navigate("login")}
        >
          <Text className="text-center text-sm font-semibold text-[#17A34A]">
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-transparent border border-white p-3 rounded-xl"
          onPress={() => navigation.navigate("signup")}
        >
          <Text className="text-center text-sm font-semibold text-white">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});
