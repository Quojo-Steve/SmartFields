import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, View, ScrollView, ActivityIndicator } from "react-native";
import {
  HandThumbUpIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";

const BlogPosts = () => {
  const [posts, setPosts] = useState(null);

  const setUp = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      //   console.log(res.data.splice(0, 1));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setUp();
  }, []);
  return (
    <View className="w-full px-4">
      <ScrollView className="pt-[10px]">
        {posts ? (
          posts.map((post, index) => (
            <View className="my-4" key={index}>
              <View className="flex flex-row gap-2 items-center">
                <Image
                  source={{
                    uri: "https://imageio.forbes.com/specials-images/dam/imageserve/1150881602/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
                  }}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <View>
                  <Text className="text-[16px] text-[#35363A]">Etornam</Text>
                  <Text className="text-[12px] text-[#ACAAAA]">12:30am</Text>
                </View>
              </View>
              <View className="mt-3">
                <Image
                  source={{
                    uri: "https://womenwhofarm.africa/wp-content/uploads/2021/07/farming-for-changing-1024x683.jpg",
                  }}
                  className="w-full h-[190px] rounded-[10px] object-cover"
                />
              </View>
              <View className="mt-3 flex flex-row">
                <View className="flex flex-row items-center gap-1">
                  <Text className="text-[18px] text-[#ACAAAA]">0 likes</Text>
                  <HandThumbUpIcon color={"#35363A"} />
                </View>
                <View className="flex flex-row items-center gap-1 ml-3">
                  <Text className="text-[18px] text-[#ACAAAA]">0 shares</Text>
                  <PaperAirplaneIcon color={"#35363A"} />
                </View>
              </View>
              <View className="mt-3">
                <Text className="text-[18px] text-[#35363A] font-semibold">
                  {post.title}
                </Text>
                <Text className="text-[16px] text-[#35363A] mt-1">
                  {post.body}
                </Text>
                <Text className="text-[16px] text-[#048232] underline">
                  Read More
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View className="h-[600px] w-full flex justify-center items-center">
            <ActivityIndicator size={"large"} color={"#048232"} />
          </View>
        )}
        <View className="h-[350px]"></View>
      </ScrollView>
    </View>
  );
};

export default BlogPosts;
