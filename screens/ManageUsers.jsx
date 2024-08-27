import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Image,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

export default function ManageUsers({ navigation }) {
  const { Url, currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [displayedUsers, setDisplayedUser] = useState(null);
  const [refresh, setrefresh] = useState(false);

  const setUp = async () => {
    try {
      const response = await axios.get(`${Url}/auth/allUsers`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      //   console.log(response.data);
      setUsers(response.data);
      setDisplayedUser(response.data);
    } catch (error) {
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  const filterUsers = (value) => {
    let filter = users;
    console.log(users);
    filter = filter.filter(
      (data) =>
        data.username.toLowerCase().includes(value.toLowerCase()) ||
        data.email.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayedUser(filter)
  };

  useEffect(() => {
    setUp();
  }, []);
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
          Manage Users
        </Text>
      </View>
      <View className="p-4">
        <View className="bg-[#FAFBFC] px-5 w-full min-w-[270px] border border-[#E9F2F4] h-[55px] flex flex-row justify-between items-center rounded-[40px]">
          <TextInput
            className="h-full"
            placeholder="Search here..."
            onChangeText={(text) => filterUsers(text)}
          />
          <MagnifyingGlassIcon color={"#7D7B7B"} />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="h-full"
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={async () => {
                setrefresh(true);
                await setUp();
                setrefresh(false);
              }}
            />
          }
        >
          <View className="p-4">
            {displayedUsers ? (
              displayedUsers.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="my-4"
                  onPress={() =>
                    navigation.navigate("editUsers", { user: item })
                  }
                >
                  <View className="flex flex-row gap-2 items-center">
                    {item?.picturePath ? (
                      <Image
                        source={{
                          uri: item.picturePath,
                        }}
                        className="w-[50px] h-[50px] rounded-full object-cover bg-[#048232]"
                      />
                    ) : (
                      <Image
                        source={{
                          uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
                        }}
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                    )}
                    <View>
                      <Text className="text-[18px] mb-1 font-semibold text-[#35363A] capitalize">
                        {item?.username}
                      </Text>
                      <Text className="text-[14px] text-[#ACAAAA]">
                        {item?.email}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="h-[600px] w-full flex justify-center items-center">
                <ActivityIndicator size={"large"} color={"#048232"} />
                <Text className="text-[#02020291] mt-4">
                  One moment please...
                </Text>
              </View>
            )}
            {displayedUsers?.length < 1 && (
              <View className="h-[600px] w-full flex justify-center items-center">
                <Text>No users found...</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
