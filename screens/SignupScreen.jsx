import {
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  Text,
  View,
} from "react-native";
import React from "react";

const SignupScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#17A34A]">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="h-[70%] w-full">
        <ImageBackground
          source={require("../assets/images/image.png")}
          className="h-full w-full"
          resizeMode="cover"
        >
          <Text className="text-base font-bold text-white mt-[35px] ml-4">
            SMARTFIELDS
          </Text>
          <View className="flex justify-center items-start h-[70%] mx-4">
            <Text
              className="text-[#F5F5F5] mb-4"
              style={{
                fontSize: 30,
                fontWeight: 600,
                lineHeight: 39.9,
                textAlign: "left",
              }}
            >
              Create an Account
            </Text>
            <Text
              className="text-[#F5F5F5] mb-9"
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 18.62,
                textAlign: "left",
              }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </Text>
          </View>
        </ImageBackground>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="w-full absolute bottom-0 rounded-t-xl bg-white"
      >
        <View className="px-7 pt-7">
          <View className="bg-[#F2F5F7] p-3 rounded-lg flex items-center flex-row mb-4">
            <Image
              source={require("../assets/images/email.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: "#7D7B7B",
              }}
            />
            <TextInput placeholder="Email" className="flex-1 p-1 ml-2" />
          </View>
          <View className="bg-[#F2F5F7] p-3 rounded-lg flex items-center flex-row mb-4">
            <Image
              source={require("../assets/images/password.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: "#7D7B7B",
              }}
            />
            <TextInput
              placeholder="Password"
              className="flex-1 p-1 ml-2"
              secureTextEntry
            />
          </View>
          <View className="bg-[#F2F5F7] p-3 rounded-lg flex items-center flex-row mb-4">
            <Image
              source={require("../assets/images/password.png")}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: "#7D7B7B",
              }}
            />
            <TextInput
              placeholder="Repeat Password"
              className="flex-1 p-1 ml-2"
              secureTextEntry
            />
          </View>

          <TouchableOpacity className="bg-[#17a34ad0] p-3 rounded-xl mb-4">
            <Text className="text-center text-sm font-semibold text-white">
              Sign Up
            </Text>
          </TouchableOpacity>
          <Text
            className="mb-8 text-center"
            onPress={() => navigation.navigate("login")}
            style={{
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 15.96,
            }}
          >
            Already have an account? Log In
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;