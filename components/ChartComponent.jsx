import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BarChart, LineChart } from "react-native-gifted-charts";

export default function ChartComponent({ update }) {
  const { currentUser, Url } = useContext(AuthContext);
  const [iotData, setIotData] = useState(null);
  const [humidityData, sethumidityData] = useState([]);
  const [temperatureData, settemperatureData] = useState([]);
  const [smData, setsmData] = useState([]);

  function getRandomColor() {
    const primaryColors = [
      "#051F20",
      "#0B2B26",
      "#1638832",
      "#235347",
      "#8EB69B",
      "#9A6735",
    ];
    const randomIndex = Math.floor(Math.random() * primaryColors.length);
    return primaryColors[randomIndex];
  }
  const setUp = async () => {
    try {
      const IOTres = await axios.get(`${Url}/iot/getIOTData`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      //   console.log(IOTres.data.response);
      setIotData(IOTres.data.response);
      sethumidityData(addFrontColor(IOTres.data.response.humidity));
      settemperatureData(addFrontColor(IOTres.data.response.temperature));
      setsmData(addFrontColor(IOTres.data.response.soilMoisture));
    } catch (error) {
      console.log(error);
    }
  };
  const addFrontColor = (arr) => {
    return arr.map((item) => ({
      ...item,
      frontColor: getRandomColor(),
    }));
  };
  //   console.log(humidityData)
  useEffect(() => {
    setUp();
  }, [update]);
  return (
    <>
      {iotData && (
        <View className="gap-4">
          <View className="my-4">
            <Text className="text-[18px] mb-2">Humidity</Text>
            <View className="bg-white pt-2">
              <LineChart
                data={humidityData && humidityData}
                yAxisThickness={0}
                xAxisThickness={0}
                color="#0B2B26"
                isAnimated
              />
            </View>
          </View>
          <View className="my-4">
            <Text className="text-[18px] mb-2">Soil Moisture</Text>
            <View className="bg-white pt-2">
              <BarChart
                data={smData && smData}
                barWidth={18}
                minHeight={3}
                spacing={20}
                yAxisThickness={0}
                xAxisThickness={0}
                barBorderRadius={3}
                yAxisTextStyle={{ color: "gray" }}
                isAnimated
              />
            </View>
          </View>
          <View className="my-4">
            <Text className="text-[18px] mb-2">Temperature</Text>
            <View className="bg-white pt-2">
              <LineChart
                data={temperatureData && temperatureData}
                yAxisThickness={0}
                xAxisThickness={0}
                color="#0B2B26"
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}
