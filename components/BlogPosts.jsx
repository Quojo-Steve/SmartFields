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
  Share,
} from "react-native";
import {
  HandThumbUpIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { HandThumbUpIcon as HandSolid } from "react-native-heroicons/solid";
import { AuthContext } from "../contex/AuthContex";
import moment from "moment/moment";
import DeleteModal from "./DeleteModal";
import ToastManager, { Toast } from "toastify-react-native";

const BlogPosts = ({ category }) => {
  const { Url, currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [displayedPosts, setdisplayedPosts] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [selectedPost, setselectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isActionLoading, setisActionLoading] = useState(false);
  const [isFilter, setisFilter] = useState(false);

  const [likedPosts, setlikedPosts] = useState([]);

  const setUp = async () => {
    try {
      const res = await axios.get(`${Url}/post/allPosts`);
      setPosts(null);
      setPosts(res.data);
      setdisplayedPosts(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {
      if (likedPosts.includes(id)) {
        setlikedPosts(likedPosts.filter((data) => data != id));
        const response = await axios.post(
          `${Url}/post/${id}/unLike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
      } else {
        const post = posts.filter((data) => data.pkid == id);
        if (post[0]?.likeUsers?.includes(currentUser.uid)) {
          const response = await axios.post(
            `${Url}/post/${id}/unLike`,
            {},
            {
              headers: {
                Authorization: `Bearer ${currentUser.accessToken}`,
              },
            }
          );
          setUp();
        } else {
          setlikedPosts((prev) => [...prev, id]);
          const response = await axios.post(
            `${Url}/post/${id}/like`,
            {},
            {
              headers: {
                Authorization: `Bearer ${currentUser.accessToken}`,
              },
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  const handleShare = async (id) => {
    try {
      const message = `Heyyy!🖐
      Checkout this awesome post on SmartFields!😉✨
      ${Url}/${id}`;
      const result = await Share.share({ message: message });
      if (result.action == Share.sharedAction) {
        const response = await axios.post(
          `${Url}/post/${id}/share`,
          {},
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
        setUp();
        // if(result.activityType){
        //   console.log("shared with " + result.activityType)
        // }
      } else if (result.activityType == Share.dismissedAction) {
        // console.log("share dissmised")
      }
    } catch (error) {
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  const handleDelete = async () => {
    try {
      setisActionLoading(true);
      const response = await axios.put(
        `${Url}/post/${selectedPost}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        }
      );
      setModalVisible(false);
      Toast.success("Post deleted successfully");
      setisActionLoading(false);
      setUp();
    } catch (error) {
      setModalVisible(false);
      setisActionLoading(false);
      console.log(error);
      Toast.error(error?.response?.data?.message || "Something went wrong...");
    }
  };

  useEffect(() => {
    setUp();
  }, []);

  useEffect(() => {
    setisFilter(false);
    if (!category) return;
    if (category == "All") {
      setdisplayedPosts(posts);
    } else {
      setisFilter(true);
      if (category == "Sensors") {
        setdisplayedPosts(
          posts.filter((data) => data.categories.includes("Sensors"))
        );
      }
      if (category == "Ai Detection") {
        setdisplayedPosts(
          posts.filter((data) => data.categories.includes("Ai Detection"))
        );
      }
      if (category == "Diseases") {
        setdisplayedPosts(
          posts.filter((data) => data.categories.includes("Diseases"))
        );
      }
      if (category == "Solution") {
        setdisplayedPosts(
          posts.filter((data) => data.categories.includes("Solution"))
        );
      }
    }
  }, [category]);
  // console.log(currentUser);
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
        {displayedPosts ? (
          <>
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post, index) => (
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
                          uri: `${post.imagepath}`,
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
                      <TouchableOpacity
                        onPress={() => handleLike(post.pkid)}
                        className="flex flex-row items-center gap-1"
                      >
                        <Text className="text-[18px] text-[#ACAAAA]">
                          {likedPosts.includes(post.pkid)
                            ? post.likeUsers?.includes(currentUser.uid)
                              ? post.likeCount
                              : post.likeCount + 1
                            : post.likeCount}{" "}
                          likes
                        </Text>
                        {likedPosts.includes(post.pkid) ||
                        post.likeUsers?.includes(currentUser.uid) ? (
                          <HandSolid color={"#35363A"} />
                        ) : (
                          <HandThumbUpIcon color={"#35363A"} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleShare(post.pkid)}
                        className="flex flex-row items-center gap-1 ml-3"
                      >
                        <Text className="text-[18px] text-[#ACAAAA]">
                          {post.shareCount} shares
                        </Text>
                        <PaperAirplaneIcon color={"#35363A"} />
                      </TouchableOpacity>
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
                  {isFilter
                    ? "No posts found... "
                    : "Create the first post... "}
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
        loading={isActionLoading}
      />
    </View>
  );
};

export default BlogPosts;
