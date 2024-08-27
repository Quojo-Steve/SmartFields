import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";


const SearchBar = ({value, setValue}) => {
  return (
    <View className="bg-[#FAFBFC] px-5 min-w-[270px] flex-1 border border-[#E9F2F4] h-[55px] flex flex-row justify-between items-center rounded-[40px]">
        <TextInput
        className="h-full"
        placeholder="Search here..."
        onChangeText={(text)=> setValue(text)}
        value={value}
      />
      <MagnifyingGlassIcon color={"#7D7B7B"}/>
    </View>
  )
}


export default SearchBar