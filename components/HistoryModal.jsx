import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ToastManager, { Toast } from "toastify-react-native";
import { AuthContext } from "../context/AuthContext";
import FormattedText from "./FormattedText";

export default function HistoryModal({ visible, onCancel, selected }) {
  const { Url, currentUser } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState(true);
  const [historyData, sethistoryData] = useState(null);
  //   console.log(selected);
  const setUp = async () => {
    try {
      setisLoading(true);
      if (selected.status == 1) {
        const response = await axios.get(
          `${Url}/post/singleScan/${selected.pid}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response.data);
        sethistoryData(response.data);
        setisLoading(false);
      } else {
        const response = await axios.get(
          `${Url}/post/singlePost/${selected.pid}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response.data);
        sethistoryData(response.data);
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
      onCancel();
    }
  };

  useEffect(() => {
    if (selected) {
      setUp();
    }
  }, [selected]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <ToastManager width={"100%"} />
      <View className="flex-1 p-5 justify-center items-center">
        <View className="w-[95%] p-5 max-h-[70%] bg-white rounded-lg items-center">
          <ScrollView>
            {selected && (
              <View>
                {selected.status == 1 ? (
                  <View className="flex flex-col justify-center items-center w-full">
                    <Image
                      source={{ uri: historyData?.imageUrl }}
                      className="h-[210px] w-full rounded-[10px] bg-[#00000015]"
                    />
                    {!historyData ? (
                      <View className="h-[400px] w-full flex justify-center items-center">
                        <ActivityIndicator size={"small"} color={"#048232"} />
                        <Text className="text-[#02020291] mt-4">
                          One moment please...
                        </Text>
                      </View>
                    ) : (
                      <View className="w-full">
                        <View className="w-full h-[1px] bg-[#02020246] my-4"></View>
                        <View className="w-full">
                          <Text className="text-[18px] text-[#35363A]">{historyData?.message}</Text>
                          <FormattedText
                            responseString={historyData?.results}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                ) : (
                  <View className="my-4">
                    <View className="mt-3">
                      {historyData?.imagepath && (
                        <Image
                          source={{
                            uri: `${historyData?.imagepath}`,
                          }}
                          className="w-full h-[190px] rounded-[10px] object-cover bg-[#00000015]"
                        />
                      )}
                    </View>
                    {!historyData ? (
                      <View className="h-[400px] w-full flex justify-center items-center">
                        <ActivityIndicator size={"small"} color={"#048232"} />
                        <Text className="text-[#02020291] mt-4">
                          One moment please...
                        </Text>
                      </View>
                    ) : (
                      <View className={"mt-3 "}>
                        <Text className="text-[18px] text-[#35363A]">{historyData?.message}</Text>
                        <View className={historyData?.imagepath && "mt-3"}>
                          <Text className="text-[18px] text-[#35363A] font-semibold">
                            {historyData?.title}
                          </Text>
                          <Text className="text-[16px] text-[#35363A] mt-1">
                            {historyData?.content}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </ScrollView>
          <View className="flex-row justify-between w-full">
            <TouchableOpacity
              className="flex-1 mr-2 p-3 bg-red-600 rounded-lg items-center"
              onPress={() => {
                sethistoryData(null);
                onCancel();
              }}
            >
              <Text className="text-white font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
