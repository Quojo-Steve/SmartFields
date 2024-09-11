import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import all from "../assets/images/all.png";
import sensors from "../assets/images/sensors.png";
import disease from "../assets/images/disease.png";
import solve from "../assets/images/solve.png";
import ai from "../assets/images/ai.png";
import axios from "axios";
import { ChartComponent, ChartKit } from "../components";

export default function ActualHomeScreen({ navigation }) {
  const { currentUser, Url } = useContext(AuthContext);
  const [selectedOption, setselectedOption] = useState("Yearly");
  const [updateValue, setupdateValue] = useState(true)

  const categories = [
    { name: "Yearly" },
    { name: "Monthly" },
    { name: "Daily" },
  ];

  const [postCategories, setpostCategories] = useState([
    { name: "All", image: all, count: 0, high: true },
    { name: "Sensors", image: sensors, count: 0, high: true },
    { name: "AI Detection", image: ai, count: 0, high: true },
    { name: "Diseases", image: disease, count: 0, high: true },
    { name: "Solution", image: solve, count: 0, high: true },
  ]);

  const [postData, setpostData] = useState(null);
  const [displayedPostData, setDisplayedpostData] = useState(null);
  const [refresh, setrefresh] = useState(false);

  const setUp = async () => {
    try {
      setupdateValue(!updateValue)
      setpostData(null);
      setselectedOption("Yearly");
      const res = await axios.get(`${Url}/post/allData`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      setpostData(res.data);
      setDisplayedpostData(res.data);
      // console.log(IOTres.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = () => {
    for (const Cat of postCategories) {
      setpostCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.name === Cat.name
            ? {
                ...cat,
                count: displayedPostData.filter((item) =>
                  item.categories.toLowerCase().includes(Cat.name.toLowerCase())
                ).length,
                high:
                  displayedPostData.filter((item) =>
                    item.categories
                      .toLowerCase()
                      .includes(Cat.name.toLowerCase())
                  ).length >= 5,
              }
            : cat
        )
      );
    }
    setpostCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.name === "All"
          ? {
              ...category,
              count: displayedPostData.length,
              high: displayedPostData.length >= 5,
            }
          : category
      )
    );
  };

  const filterData = (name) => {
    const now = new Date();
    const year = new Date(now.getFullYear(), 0, 1);
    const month = new Date(now.getFullYear(), now.getMonth(), 1);
    let filter = postData || [];

    if (name == "Yearly") {
      filter = filter.filter((item) => new Date(item.createDate) > year);
    }
    if (name == "Monthly") {
      filter = filter.filter((item) => new Date(item.createDate) > month);
    }
    if (name == "Daily") {
      filter = filter.filter((item) => new Date(item.createDate) > now);
    }
    setDisplayedpostData(filter);
  };

  useEffect(() => {
    if (displayedPostData) {
      updateData();
    }
  }, [displayedPostData]);

  useEffect(() => {
    setUp();
  }, []);
  // console.log(currentUser);
  return (
    <SafeAreaView>
      <ScrollView
        className="min-h-full"
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
        <View className="p-4 pt-10">
          <View className="flex flex-row justify-between items-center">
            <View>
              <Text className="font-semibold text-[25px] capitalize">
                Hi, {currentUser?.username} 👋
              </Text>
              <Text className="text-[16px] ">SmartFields, Agric made easy</Text>
            </View>
            <View>
              {currentUser?.picturePath ? (
                <Image
                  source={{
                    uri: currentUser.picturePath,
                  }}
                  className="w-[60px] h-[60px] rounded-full object-cover bg-[#048232]"
                />
              ) : (
                <Image
                  source={{
                    uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
                  }}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
              )}
            </View>
          </View>
          <View className="bg-[#0F2B2C] p-6 mt-8 rounded-[10px]">
            <View className="flex flex-row justify-between">
              <View className="flex flex-col gap-2">
                <Text className="text-[#F5F5F5] text-[12px]">Total Scans</Text>
                <Text className="text-[#EFCC17] text-center font-semibold text-[20px]">
                  {(displayedPostData && displayedPostData[0]?.scanCount) ||
                    "N/A"}
                  {!displayedPostData && <ActivityIndicator color={"#fff"} />}
                </Text>
              </View>
              <View className="flex flex-col gap-2">
                <Text className="text-[#F5F5F5] text-[12px] capitalize">
                  Total posts
                </Text>
                <Text className="text-[#F5F5F5] text-center font-semibold text-[20px]">
                  {displayedPostData && displayedPostData.length}
                  {!displayedPostData && <ActivityIndicator color={"#fff"} />}
                </Text>
              </View>
              <View className="flex flex-col gap-2">
                <Text className="text-[#F5F5F5] text-[12px] capitalize">
                  Total likes
                </Text>
                <Text className="text-[#F5F5F5] text-center font-semibold text-[20px]">
                  {displayedPostData &&
                    displayedPostData?.reduce((sum, post) => {
                      return sum + post.likeCount;
                    }, 0)}
                  {!displayedPostData && <ActivityIndicator color={"#fff"} />}
                </Text>
              </View>
            </View>
            <View className="flex flex-row mt-10 justify-between">
              {categories.map((option, index) => (
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#FFFFFF" : "white",
                    },
                  ]}
                  onPress={() => {
                    setselectedOption(option.name);
                    filterData(option.name);
                  }}
                  key={index}
                  className={`rounded-[30px] px-4 min-w-[50px] h-[30px] ${
                    selectedOption == option.name && "bg-[#FFFFFF]"
                  } flex justify-center items-center`}
                >
                  <Text
                    className={`${
                      selectedOption == option.name
                        ? "text-black "
                        : "text-[#FFFFFF]"
                    } text-[14px]`}
                  >
                    {option.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          {currentUser?.status !== 1 && (
            <View className="mt-10">
              {/* <ChartComponent update={updateValue}/> */}
              <ChartKit update={updateValue}/>
            </View>
          )}
          <View className="mt-10">
            <View>
              <Text className="capitalize text-[16px] font-semibold">
                Post categories
              </Text>
            </View>
            <View className="pt-8 flex flex-row flex-wrap gap-6 justify-between">
              {postCategories.map((item, index) => (
                <View
                  key={index}
                  className="shadow-2xl py-4  w-[100px] border rounded-[10px] border-[#0000002d] flex flex-col justify-center items-center"
                >
                  <Image
                    source={item.image || all}
                    className="w-[24px] h-[24px] object-cover"
                  />
                  <Text className="font-semibold text-[14px] mt-2">
                    {item.name}
                  </Text>
                  <Text className="font-semibold text-[20px] text-[#7D7B7B] mt-2">
                    {item.count}
                  </Text>
                  <Text
                    className={`font-semibold text-[12px] ${
                      item.high ? "text-[#05C54B]" : "text-[#E41414]"
                    }  mt-2`}
                  >
                    {item.high ? "High %" : "Low %"}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                className="shadow-2xl py-4 bg-[#B7F3CD] w-[100px] border rounded-[10px] border-[#50D480] flex flex-col justify-center items-center"
                onPress={() => navigation.navigate("createBlog")}
              >
                <Text className="font-semibold text-[12px] text-[#048232] text-center mt-2">
                  Create more posts
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="h-[150px]"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
