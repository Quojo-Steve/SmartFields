import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  PencilSquareIcon,
  EllipsisHorizontalCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "react-native-heroicons/outline";
import { ConfirmModal } from "../components";
import ToastManager, { Toast } from "toastify-react-native";

export default function ProfileScreen({ navigation }) {
  const { currentUser, logOut } = useContext(AuthContext);
  const [isModalActive, setisModalActive] = useState(false);
  const [isActionLoading, setisActionLoading] = useState(false);
  const [refresh, setrefresh] = useState(false);

  const handleLogout = async () => {
    try {
      setisActionLoading(true);
      await logOut();
    } catch (error) {
      setisActionLoading(false);
      setisModalActive(false);
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

//   const setUp = () => {
//     console.log(currentUser)
//   }
//   console.log(currentUser);

  return (
    <SafeAreaView>
      <ToastManager width={"100%"} />
      <ScrollView className="h-full" refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={async () => {
                setrefresh(true);
                setrefresh(false);
              }}
            />
          }>
      <View className="p-4 pt-10">
        <View className="flex flex-row gap-2 items-center">
          {currentUser?.picturePath ? (
            <Image
              source={{
                uri: currentUser.picturePath,
              }}
              className="w-[80px] h-[80px] rounded-full object-cover bg-gray-200"
            />
          ) : (
            <Image
              source={{
                uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
              }}
              className="w-[80px] h-[80px] rounded-full object-cover"
            />
          )}
          <View>
            <Text className="text-[16px] font-semibold text-[#35363A] capitalize">
              {currentUser?.username}
            </Text>
            <Text className="text-[14px] text-[#ACAAAA]">
              {currentUser?.email}
            </Text>
          </View>
        </View>
        <View className="mt-8">
          <TouchableOpacity className="flex flex-row items-center gap-2" onPress={()=> navigation.navigate("editProfile")}>
            <PencilSquareIcon color={"#555555"} />
            <Text className="text-[16px] text-[#555555]">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center gap-2 mt-4">
            <EllipsisHorizontalCircleIcon color={"#555555"} />
            <Text className="text-[16px] text-[#555555]">Change Password</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-[1px] bg-[#02020246] my-[50px]"></View>
        <View>
          <TouchableOpacity className="flex flex-row items-center gap-2" onPress={()=> setisModalActive(true)}>
            <ArrowLeftStartOnRectangleIcon color={"#E41414"} />
            <Text className="text-[16px] text-[#E41414]">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ConfirmModal
        visible={isModalActive}
        onCancel={() => setisModalActive(false)}
        onConfirm={handleLogout}
        loading={isActionLoading}
      />
      </ScrollView>
    </SafeAreaView>
  );
}
