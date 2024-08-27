import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
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

export default function EditProfile({ navigation }) {
  const { Url, currentUser, getUser } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const [image, setimage] = useState(null);

  const [username, setusername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [number, setnumber] = useState(currentUser?.number);

  const uploadImage = async () => {
    try {
      let res = {};
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!res.canceled) {
        // console.log(res);
        setimage(res.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  const handleUpdate = async () => {
    try {
        setloading(true)
      const formData = new FormData();

      // Append image data to formData
      if(image){
          formData.append("image", {
            uri: image,
            name: "photo.jpg",
            type: "image/jpeg",
          });
      }
      formData.append("username", username);
      formData.append("email", email);
      formData.append("number", number || null);

      const response = await axios.put(`${Url}/auth/updateUser`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      //   console.log(response)
      setloading(false);
      getUser()
      Toast.success("Profile upated successfully...");
    } catch (error) {
      setloading(false);
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  //   console.log(currentUser)

  return (
    <SafeAreaView>
      <ToastManager width={"100%"} />
      <View className="flex flex-row items-center pt-4">
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={() => navigation.navigate("profile")}
        >
          <ChevronLeftIcon size={35} color={"#000"} />
        </TouchableOpacity>
        <Text className="text-[25px] font-semibold text-[#35363A] capitalize">
          Edit Profile
        </Text>
      </View>
      <View className="p-4 pt-10">
        <TouchableOpacity
          onPress={uploadImage}
          className="w-full flex justify-center items-center"
        >
          <View>
            {image ? (
              <View>
                <Image
                  source={{
                    uri: image,
                  }}
                  className="w-[100px] h-[100px] rounded-full object-cover"
                />
              </View>
            ) : (
              <View>
                {currentUser?.picturePath ? (
                  <Image
                    source={{
                      uri: currentUser.picturePath,
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
            )}
          </View>
          <View className="flex flex-row items-end justify-center">
            <PencilSquareIcon color={"#0000008c"} />
            <Text className="lowercase text-[#0000008c]">Update profile image</Text>
          </View>
        </TouchableOpacity>
        <ScrollView className="mt-12">
          <View className="">
            <Text>Name</Text>
            <TextInput
              placeholder="User name"
              className="flex-1 px-4 mt-2 min-h-[45px] bg-[#dee0e0] rounded-[5px]"
              onChangeText={(text) => setusername(text)}
              keyboardType="default"
              autoCapitalize="none"
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
              value={number}
            />
          </View>

          <View className="flex-row justify-between w-full mt-[70px]">
            <TouchableOpacity
              className="flex-1 mr-2 p-3 bg-gray-300 rounded-lg items-center"
              onPress={() => navigation.navigate("profile")}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
