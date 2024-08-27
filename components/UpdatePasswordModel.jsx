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

export default function UpdatePasswordModel({ visible, onCancel }) {
  const { Url, currentUser } = useContext(AuthContext);
  const [formStep, setformStep] = useState(1);
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);

  const updatePassword = async () => {
    try {
        setloading(true);
      if (!newpassword || !confirmPassword) {
        setformStep(1);
        return Toast.error("Fill all required fields!");
      }
      if (newpassword !== confirmPassword) {
        setformStep(1);
        return Toast.error("Passwords don't match!");
      }
      const response = await axios.put(
        `${Url}/auth/changePassword`,
        {
          password: newpassword,
          current: password,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      //   console.log(response.data);
      setloading(false);
      setPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setformStep(5);
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
          <Text className="text-lg font-bold mb-3">Update Password</Text>
          {formStep == 1 && (
            <View>
              <Text className="text-center text-base mb-5">
                Enter your current pasword
              </Text>
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
                  value={password}
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
                Enter New Password
              </Text>
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
                  onChangeText={(text) => setNewPassword(text)}
                  secureTextEntry
                  value={newpassword}
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
                  onPress={() => setformStep(3)}
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
          {formStep == 3 && (
            <View>
              <Text className="text-center text-base mb-5">
                Confirm New Password
              </Text>
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
                  onChangeText={(text) => setConfirmPassword(text)}
                  secureTextEntry
                  value={confirmPassword}
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
                  onPress={() => setformStep(4)}
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
          {formStep == 4 && (
            <View>
              <Text className="text-center mb-5">
                Are you sure you want to update the password?
              </Text>
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
                  onPress={updatePassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={"#fff"} />
                  ) : (
                    <Text className="text-[#fff] font-bold">Update</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
          {formStep == 5 && (
            <View>
              <Text className="text-center text-[20px] mb-5">
                Password Updated Successfully!
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
