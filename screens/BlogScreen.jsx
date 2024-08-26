import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import NoteSvg from "../assets/Svg/NoteSvg";
import { BlogPosts, BlogFilter, SearchBar } from "../components";

const BlogScreen = ({ navigation }) => {
  const [selectedOption, setselectedOption] = useState("All");
  return (
    <View className="min-h-screen flex flex-col overflow-hidden pt-[60px] bg-[#FAFBFC]">
      <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
      <View className="bg-white h-[126px] p-4 w-full">
        <View className="flex flex-row">
          <SearchBar />
          <TouchableOpacity className="bg-[#048232] flex-1 justify-center items-center rounded-[10px] ml-3" onPress={()=> navigation.navigate("createBlog")}>
          <View >
            <NoteSvg />
          </View>
          </TouchableOpacity>
        </View>
        <View className="mt-3">
          <BlogFilter selectedOption={selectedOption} setselectedOption={setselectedOption}/>
        </View>
      </View>
      <View className="mt-[10px]">
        <BlogPosts category={selectedOption}/>
      </View>
    </View>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({});
