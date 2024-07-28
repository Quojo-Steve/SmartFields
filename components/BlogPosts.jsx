import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  HandThumbUpIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { AuthContext } from "../contex/AuthContex";
import moment from "moment/moment";
import DeleteModal from "./DeleteModal";
import ToastManager, { Toast } from "toastify-react-native";

const BlogPosts = () => {
  const { Url, currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [selectedPost, setselectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const setUp = async () => {
    try {
      const res = await axios.get(`${Url}/post/allPosts`);
      setPosts(null);
      setPosts(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.put(`${Url}/post/${selectedPost}/delete`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      setModalVisible(false);
      Toast.success("Post deleted successfully")
      setUp()
    } catch (error) {
      setModalVisible(false);
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  useEffect(() => {
    setUp();
  }, []);
  // console.log(currentUser, posts);
  return (
    <View className="w-full">
      <ToastManager width={"100%"} />
      <ScrollView
        className="pt-[10px] px-4"
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
        {posts ? (
          <>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <View className="my-4" key={index}>
                  <View className="flex flex-row justify-between items-center">
                    <View className="flex flex-row gap-2 items-center">
                      {post.userProfilePicture ? (
                        <Image
                          source={{
                            uri: `${Url}/uploads/${post.userProfilePicture}`,
                          }}
                          className="w-[40px] h-[40px] rounded-full object-cover"
                        />
                      ) : (
                        <Image
                          source={{
                            uri: "https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png",
                          }}
                          className="w-[40px] h-[40px] rounded-full object-cover"
                        />
                      )}
                      <View>
                        <Text className="text-[16px] text-[#35363A] capitalize">
                          {post.username}
                        </Text>
                        <Text className="text-[12px] text-[#ACAAAA]">
                          {moment(post.createDate).calendar()}
                        </Text>
                      </View>
                    </View>
                    {currentUser?.email == post.email && (
                      <TouchableOpacity
                        onPress={() => {
                          setselectedPost(post.pkid);
                          setModalVisible(true);
                        }}
                      >
                        <XCircleIcon color={"#ff0000"} size={22} />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View className="mt-3">
                    {post.imagepath && (
                      <Image
                        source={{
                          uri: `${Url}/uploads/${post.imagepath}`,
                        }}
                        className="w-full h-[190px] rounded-[10px] object-cover bg-[#00000015]"
                      />
                    )}
                  </View>
                  <View
                    className={
                      !post.imagepath ? "flex flex-col-reverse" : "mt-3 "
                    }
                  >
                    <View className="flex flex-row">
                      <View className="flex flex-row items-center gap-1">
                        <Text className="text-[18px] text-[#ACAAAA]">
                          0 likes
                        </Text>
                        <HandThumbUpIcon color={"#35363A"} />
                      </View>
                      <View className="flex flex-row items-center gap-1 ml-3">
                        <Text className="text-[18px] text-[#ACAAAA]">
                          0 shares
                        </Text>
                        <PaperAirplaneIcon color={"#35363A"} />
                      </View>
                    </View>
                    <View className={post.imagepath && "mt-3"}>
                      <Text className="text-[18px] text-[#35363A] font-semibold">
                        {post.title}
                      </Text>
                      <Text className="text-[16px] text-[#35363A] mt-1">
                        {post.content}
                      </Text>
                      <Text
                        className={`text-[14px] text-[#048232] underline ${
                          !post.imagepath && "mb-3"
                        }`}
                      >
                        Read More
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View className="h-[600px] w-full flex justify-center items-center">
                <Text className="text-[#02020291] mt-4">
                  Create the first post...
                </Text>
              </View>
            )}
          </>
        ) : (
          <View className="h-[600px] w-full flex justify-center items-center">
            <ActivityIndicator size={"large"} color={"#048232"} />
            <Text className="text-[#00000091] mt-4">One moment please...</Text>
          </View>
        )}
        <View className="h-[420px]"></View>
      </ScrollView>
      <DeleteModal
        visible={modalVisible}
        onConfirm={handleDelete}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
};

export default BlogPosts;
