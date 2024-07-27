import { Text, View, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contex/AuthContex";

const BlogFilter = () => {
  const {categories} = useContext(AuthContext)
  const [selectedOption, setselectedOption] = useState("All");
  
  const handlePress = (key) => {
    setselectedOption(key);
  };
  return (
    <View className="flex flex-row justify-around">
      {categories.map((option, index) => (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#095295" : "white",
            },
          ]}
          onPress={() => {
            handlePress(option.name);
          }}
          key={index}
          className={`rounded-[30px] px-4 min-w-[50px] h-[30px] ${
            selectedOption == option.name && "bg-[#095295]"
          } flex justify-center items-center`}
        >
          <Text className={`${selectedOption == option.name ? "text-white " : "text-[#ACAAAA]"} text-[14px]`}>{option.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default BlogFilter;
