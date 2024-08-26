import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import ToastManager, { Toast } from "toastify-react-native";
import {
  CheckIcon,
  ChevronLeftIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const CreateBlog = ({ navigation }) => {
  const { categories, Url, currentUser } = useContext(AuthContext);
  const [displayedCategories, setdisplayedCategories] = useState(
    categories.filter((data) => data.name != "All")
  );
  const [selectedCategories, setselectedCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [image, setimage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSetCategory = (name) => {
    try {
      // console.log(name)
      if (selectedCategories.includes(name)) {
        const filter = selectedCategories.filter((data) => data != name);
        setselectedCategories(filter);
      } else {
        setselectedCategories((prev) => [...prev, name]);
      }
    } catch (error) {
      console.log(error);
      Toast.error(error.response.data.message || "Something went wrong...");
    }
  };

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
        // const imageUri = res.assets[0].uri;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    try {
      if (!title || !content) return Toast.error("Fill all required inputs!");
      setisLoading(true);

      const formData = new FormData();
      if (image) {
        const fileType = image.split(".").pop();
        formData.append("image", {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
      formData.append("title", title);
      formData.append("content", content);
      selectedCategories.forEach((keyword, index) => {
        formData.append(`categories[${index}]`, keyword);
      });

      const res = await axios.post(`${Url}/post/create`, formData, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      //   console.log(res.data);
      setisLoading(false);
      navigation.navigate("blog");
    } catch (error) {
      setisLoading(false);
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  return (
    <SafeAreaView>
      <ToastManager width={"100%"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex"
      >
        <ScrollView className="pt-6">
          <View className="flex flex-row items-center">
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => navigation.navigate("blog")}
            >
              <ChevronLeftIcon size={35} color={"#000"} />
            </TouchableOpacity>
            <Text className="text-[25px] font-semibold text-[#35363A] capitalize">
              Add blog post
            </Text>
          </View>
          <View className="px-4 pb-6 pt-2">
            <View className="mt-8">
              <Text className="text-[16px] font-semibold text-[#35363A] capitalize">
                Select category
              </Text>
              {displayedCategories.map((cat, index) => (
                <TouchableOpacity
                  className="flex flex-row pl-4 mt-4 items-center"
                  key={index}
                  onPress={() => handleSetCategory(cat.name)}
                >
                  <View
                    className={`${
                      selectedCategories.includes(cat.name) && ""
                    } h-[15px] w-[15px] border rounded-[2px] mr-2`}
                  >
                    {selectedCategories.includes(cat.name) && (
                      <CheckIcon size={14} />
                    )}
                  </View>
                  <Text>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <ScrollView>
              <View className="mt-8">
                <Text className="text-[16px] font-semibold text-[#35363A] capitalize">
                  Add Details
                </Text>
                <TextInput
                  placeholder="Title"
                  className="flex-1 mt-2 px-2 ml-2 rounded-[10px] min-h-[45px] bg-[#ebebeb]"
                  keyboardType="default"
                  onChangeText={setTitle}
                />
              </View>
              {!image ? (
                <View className="mt-[20px] w-full">
                  <View className="bg-[#E9F2F4] border border-dashed border-[#6CCAE8] flex flex-col p-4 justify-center items-center rounded-[10px] h-[210px] w-full">
                    <Image
                      source={require("../assets/images/upload.png")}
                      className="h-[50px] w-[50px]"
                    />
                    <Text className="text-center text-[14px] text-[#35363A] my-4">
                      Please use this field to upload a picture of your blog
                      post
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
              ) : (
                <View className="mt-[70px] w-full">
                  <View className="flex flex-col relative border border-dashed border-[#6CCAE8] rounded-[10px] p-2 justify-center items-center w-full">
                    <Image
                      source={{ uri: image }}
                      className="h-[200px] w-full rounded-[10px] object-cover"
                    />
                    <TouchableOpacity
                      className="absolute top-0 right-0 p-2 bg-white shadow-lg rounded-full"
                      onPress={() => setimage("")}
                    >
                      <XCircleIcon color={"#000"} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View className="mt-8">
                <TextInput
                  placeholder="Content of Blog"
                  className="flex-1 mt-2 px-2 ml-2 rounded-[10px] min-h-[120px] bg-[#ebebeb]"
                  keyboardType="default"
                  multiline
                  numberOfLines={4}
                  onChangeText={setContent}
                />
              </View>
            </ScrollView>
            <TouchableOpacity
              className="bg-[#048232] p-3 rounded-xl"
              onPress={handleCreate}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"#fff"} />
              ) : (
                <Text className="text-center text-sm font-semibold text-white">
                  Add Post
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateBlog;
