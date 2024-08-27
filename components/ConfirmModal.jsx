import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

export default function ConfirmModal({
  visible,
  onConfirm,
  onCancel,
  loading,
}) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-[#00000049]">
        <View className="w-72 p-5 bg-white rounded-lg items-center">
          <Text className="text-lg font-bold mb-3">Confirm Sign out</Text>
          <Text className="text-center text-base mb-5">
            Are you sure you want to logout?
          </Text>
          <View className="flex-row justify-between w-full">
            <TouchableOpacity
              className="flex-1 mr-2 p-3 bg-gray-300 rounded-lg items-center"
              onPress={onCancel}
            >
              <Text className="text-[#555555] font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 ml-2 p-3 bg-red-600 rounded-lg items-center"
              onPress={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={"#fff"} />
              ) : (
                <Text className="text-white font-bold">LogOut</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
