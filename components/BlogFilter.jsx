import { Text, View, Pressable } from "react-native";
import React, { useState } from "react";

const BlogFilter = () => {
  const [selectedOption, setselectedOption] = useState("All");
  const filterOptions = [
    { name: "All" },
    { name: "Sensors" },
    { name: "Ai Detection" },
    { name: "Diseases" },
    { name: "Solution" },
  ];
  const handlePress = (key) => {
    setselectedOption(key);
  };
  return (
    <View className="flex flex-row justify-around">
      {filterOptions.map((option, index) => (
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