import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  ChevronLeftIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import ToastManager, { Toast } from "toastify-react-native";
import axios from "axios";

export default function EditUser({ route, navigation }) {
  const { user } = route.params;
  const { Url, currentUser } = useContext(AuthContext);
  const [loading, setloading] = useState(false);

  const [username, setusername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [number, setnumber] = useState(user?.number);
  const [apiUrl, setapiUrl] = useState(user?.apiUrl);

  const handleUpdate = async () => {
    try {
      setloading(true);

      const response = await axios.put(
        `${Url}/auth/updateUserAdmin`,
        { IoTUrl: apiUrl, uid: user.uid },
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      //   console.log(response)
      setloading(false);
      Toast.success("User upated successfully...");
    } catch (error) {
      setloading(false);
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };
  return (
    <SafeAreaView>
      <ToastManager width={"100%"} />
      <View className="flex flex-row items-center pt-4">
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={() => navigation.navigate("manageUsers")}
        >
          <ChevronLeftIcon size={35} color={"#000"} />
        </TouchableOpacity>
        <Text className="text-[25px] font-semibold text-[#35363A] capitalize">
          Edit User Account
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-4 pt-10">
          <View className="w-full flex justify-center items-center">
            <View>
              <View>
                {user?.picturePath ? (
                  <Image
                    source={{
                      uri: user.picturePath,
                    }}
                    className="w-[100px] h-[100px] rounded-full object-cover bg-[#048232]"
                  />
                ) : (
                  <Image
                    source={{
                      uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
                    }}
                    className="w-[100px] h-[100px] rounded-full object-cover"
                  />
                )}
              </View>
            </View>
          </View>
          <ScrollView className="mt-12">
            <View className="">
              <Text>IoT API Url</Text>
              <TextInput
                placeholder="IoT API url"
                className="flex-1 px-4 mt-2 min-h-[45px] bg-[#dee0e0] rounded-[5px]"
                onChangeText={(text) => setapiUrl(text)}
                keyboardType="default"
                autoCapitalize="none"
                value={apiUrl}
              />
            </View>
            <View className="mt-[20px]">
              <Text>Name</Text>
              <TextInput
                placeholder="User name"
                className="flex-1 px-4 mt-2 min-h-[45px] bg-[#dee0e0] rounded-[5px]"
                onChangeText={(text) => setusername(text)}
                keyboardType="default"
                autoCapitalize="none"
                readOnly
                value={username}
              />
            </View>
            <View className="mt-[30px]">
              <Text>Email Address</Text>
              <TextInput
                placeholder="Email"
                className="flex-1 px-4 mt-2 min-h-[45px] bg-[#dee0e0] rounded-[5px]"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                readOnly
                value={email}
              />
            </View>
            <View className=" mt-[20px]">
              <Text>Number</Text>
              <TextInput
                placeholder="Contact number"
                className="flex-1 px-4 mt-2 min-h-[45px] bg-[#dee0e0] rounded-[5px]"
                onChangeText={(text) => setnumber(text)}
                keyboardType="number-pad"
                autoCapitalize="none"
                readOnly
                value={number}
              />
            </View>

            <View className="flex-row justify-between w-full mt-[70px]">
              <TouchableOpacity
                className="flex-1 mr-2 p-3 bg-gray-300 rounded-lg items-center"
                onPress={() => navigation.navigate("manageUsers")}
              >
                <Text className="text-[#555555] font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 ml-2 p-3 bg-[#048232] rounded-lg items-center"
                disabled={loading}
                onPress={handleUpdate}
              >
                {loading ? (
                  <ActivityIndicator color={"#fff"} />
                ) : (
                  <Text className="text-white font-bold">Update</Text>
                )}
              </TouchableOpacity>
            </View>
            <View className="h-[250px]"></View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
