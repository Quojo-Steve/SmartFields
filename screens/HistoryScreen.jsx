import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ToastManager, { Toast } from "toastify-react-native";
import axios from "axios";
import { HistoryFilter, HistoryModal } from "../components";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";

export default function HistoryScreen() {
  const { Url, currentUser } = useContext(AuthContext);
  const [selectedOption, setselectedOption] = useState("All");
  const [refresh, setrefresh] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [displayedData, setdisplayedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setselected] = useState(null);


  const setUp = async () => {
    try {
      const response = await axios.get(`${Url}/history/getUserHistory`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      //   console.log(response.data);
      sethistoryData(response.data);
    } catch (error) {
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  useEffect(() => {
    if (historyData) {
      let filter = historyData;
      if (selectedOption == "All") {
        setdisplayedData(historyData);
      }
      if (selectedOption == "Scans") {
        filter = filter.filter((data) => data.status == 1);
        setdisplayedData(filter);
      }
      if (selectedOption == "Blog Posts") {
        filter = filter.filter((data) => data.status == 0);
        setdisplayedData(filter);
      }
    }
  }, [selectedOption, historyData]);

  useEffect(() => {
    setUp();
  }, []);

  return (
    <SafeAreaView className>
      <View className="p-4 pt-10">
        <ToastManager width={"100%"} />
        <Text className="text-[25px] font-semibold text-[#35363A] capitalize">
          History
        </Text>
        <View className="mt-3">
          <HistoryFilter
            selectedOption={selectedOption}
            setselectedOption={setselectedOption}
          />
        </View>
        <ScrollView
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
          <View className="mt-8">
            {displayedData ? (
              displayedData.map((item, index) => (
                <View key={index} className="my-4">
                  <Text className="mb-1 font-semibold text-[14px] uppercase">
                    {moment(item.createDate).calendar()}
                  </Text>
                  <Text className="text-[14px]">You {item.description}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setselected(item);
                    }}
                  >
                    <Text className="text-[14px] text-[#048232] underline capitalize">
                      View more
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View className="h-[600px] w-full flex justify-center items-center">
                <ActivityIndicator size={"large"} color={"#048232"} />
                <Text className="text-[#02020291] mt-4">
                  One moment please...
                </Text>
              </View>
            )}
            {displayedData?.length < 1 && (
              <View className="h-[600px] w-full flex justify-center items-center">
                <Text>No history found...</Text>
              </View>
            )}
          </View>
          <View className="h-[250px]"></View>
        </ScrollView>
      </View>
      <HistoryModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        selected={selected}
      />
    </SafeAreaView>
  );
}
