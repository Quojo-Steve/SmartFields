import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function ForgotPasswordModal({ visible, onCancel }) {
  const { Url } = useContext(AuthContext);
  const [formStep, setformStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);

  const resetPassword = async () => {
    try {
      if (!email) {
        setformStep(1);
        return Toast.error("Fill all required fields!");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setformStep(1);
        return Toast.error("Enter valid email");
      }
      const response = await axios.put(`${Url}/auth/forgotPassword`, {
        email,
      });
    //   console.log(response.data)
      setloading(false);
      setformStep(3)
    } catch (error) {
      setloading(false);
      setformStep(1);
      console.log(error.response.data);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <ToastManager width={"100%"} />
      <View className="flex-1 justify-center items-center bg-[#00000080]">
        <View className="w-[90%] p-5 bg-white rounded-lg items-center">
          <Text className="text-lg font-bold mb-3">Password Reset</Text>
          {formStep == 1 && (
            <View>
              <Text className="text-center text-base mb-5">
                Enter your email address
              </Text>
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
                  value={email}
                />
              </View>
              <View className="flex-row justify-between w-full mt-4">
                <TouchableOpacity
                  className="flex-1 mr-2 p-3 bg-gray-300 rounded-lg items-center"
                  onPress={() => {
                    setformStep(1);
                    onCancel();
                  }}
                >
                  <Text className="text-[#555555] font-bold">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 ml-2 p-3 bg-[#048232] rounded-lg items-center"
                  onPress={() => setformStep(2)}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={"#fff"} />
                  ) : (
                    <Text className="text-white font-bold">Next</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
          {formStep == 2 && (
            <View>
              <Text className="text-center text-base mb-5">
                You're about to reset your password, are you sure you want to
                proceed?
              </Text>
              <View className="flex-row justify-between w-full mt-4">
                <TouchableOpacity
                  className="flex-1 mr-2 p-3 bg-gray-300 rounded-lg items-center"
                  onPress={() => {
                    setformStep(1);
                    onCancel();
                  }}
                >
                  <Text className="text-[#555555] font-bold">No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 ml-2 p-3 bg-[#048232] rounded-lg items-center"
                  onPress={resetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={"#fff"} />
                  ) : (
                    <Text className="text-white font-bold">Yes</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
          {formStep == 3 && (
            <View>
              <Text className="text-center text-[20px] mb-5">
                Check email for new credentials
              </Text>
              <View className="flex-row justify-between w-full mt-4">
                <TouchableOpacity
                  className="flex-1 mr-2 p-3 bg-[#048232] rounded-lg items-center"
                  onPress={() => {
                    setformStep(1);
                    onCancel();
                  }}
                >
                  <Text className="text-[#fff] font-bold">Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
