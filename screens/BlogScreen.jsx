import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'

const BlogScreen = () => {
  return (
    <View className="relative min-h-screen mx-4 flex flex-col items-center overflow-hidden">
      <Text>Blog</Text>
     <Navbar />
    </View>
  )
}

export default BlogScreen

const styles = StyleSheet.create({})