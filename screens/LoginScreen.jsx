import React, { useContext, useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import ToastManager, { Toast } from "toastify-react-native";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) return Toast.error("Fill all required fields!");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return Toast.error("Enter valid email");
      setisLoading(true);

      const res = await login(email, password);
      // console.log(res);
      navigation.navigate("homePage");
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error.response.data);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };
  return (
    <View className="flex-1 bg-[#17A34A]">
      <ToastManager width={"100%"}/>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View className="h-[68%] w-full">
        <ImageBackground
          source={require("../assets/images/image.png")}
          className="h-full w-full"
          resizeMode="cover"
        >
          <Text className="text-base font-bold text-white mt-[40px] ml-4">
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
              Welcome back!
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
            <TextInput
              placeholder="Email"
              className="flex-1 p-1 ml-2"
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="bg-[#F2F5F7] p-3 rounded-lg flex items-center flex-row mb-2">
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
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <Text
            className="mb-8 text-right"
            style={{
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 15.96,
            }}
          >
            Forgot Password?
          </Text>
          <TouchableOpacity
            className="bg-[#17A34A] p-3 rounded-xl mb-4"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size={"small"} color={"#fff"} />
            ) : (
              <Text className="text-center text-sm font-semibold text-white">
                Log In
              </Text>
            )}
          </TouchableOpacity>
          <Text
            className="mb-8 text-center text-[#7D7B7B]"
            onPress={() => navigation.navigate("signup")}
            style={{
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 15.96,
            }}
          >
            Don’t have an account? Sign Up
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
