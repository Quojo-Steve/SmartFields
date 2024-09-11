import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function ChartKit({ update }) {
  const screenWidth = Dimensions.get("window").width;
  const { currentUser, Url } = useContext(AuthContext);
  const [iotData, setIotData] = useState(null);
  const [humidityData, sethumidityData] = useState([]);
  const [temperatureData, settemperatureData] = useState([]);
  const [smData, setsmData] = useState([]);

  const setUp = async () => {
    setIotData(null);
    try {
      const IOTres = await axios.get(`${Url}/iot/getIOTData`, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
      //   console.log(IOTres.data.response);
      sethumidityData(IOTres.data.response.humidity.map((item) => item.value));
      settemperatureData(
        IOTres.data.response.temperature.map((item) => item.value)
      );
      setsmData(IOTres.data.response.soilMoisture.map((item) => item.value));
      setIotData(IOTres.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUp();
  }, [update]);
  return (
    <View>
      {iotData ? (
        <View className="gap-4">
          <View>
            <Text className="text-[18px] mb-2">Humidity</Text>
            <ScrollView
              className="my-4"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: screenWidth * 3 }}>
                <LineChart
                  data={{
                    datasets: [
                      {
                        data: humidityData,
                        color: (opacity = 50) => `#000`, // optional
                        strokeWidth: 2, // optional
                      },
                    ],
                  }}
                  width={screenWidth * 3 - 50}
                  height={220}
                  verticalLabelRotation={30}
                  withVerticalLines={false}
                  withHorizontalLines={true}
                  chartConfig={{
                    backgroundGradientFrom: "rgba(0, 0, 0, 0)", // Transparent background
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "rgba(0, 0, 0, 0)", // Transparent background
                    backgroundGradientToOpacity: 0,
                    color: (opacity = 1) => `#000`,
                    strokeWidth: 2, // Optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // Optional
                    propsForDots: {
                      r: "3", // Radius of the dots
                      strokeWidth: "1",
                      stroke: "#000", // Color of the dots' border
                    },
                    fillShadowGradientFrom: "#fff",
                    fillShadowGradientTo: "#8EB69B",
                    fillShadowGradientFromOpacity: 0.3,
                    fillShadowGradientToOpacity: 0.3,
                  }}
                  bezier
                />
              </View>
            </ScrollView>
          </View>
          <View>
            <Text className="text-[18px] mb-2">Soil Moisture</Text>
            <ScrollView
              className="my-4"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: screenWidth * 3 }}>
                <BarChart
                  style={{
                    borderRadius: 16,
                    marginVertical: 8,
                    marginHorizontal: 16,
                  }}
                  data={{
                    datasets: [
                      {
                        data: smData,
                        color: (opacity = 50) => `#000`, // optional
                        strokeWidth: 2, // optional
                      },
                    ],
                  }}
                  width={screenWidth * 3 - 50}
                  height={250}
                  chartConfig={{
                    backgroundGradientFrom: "rgba(0, 0, 0, 0)", // Transparent background
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "rgba(0, 0, 0, 0)", // Transparent background
                    backgroundGradientToOpacity: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set text color to black
                    strokeWidth: 2, // Optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // Optional
                  }}
                  verticalLabelRotation={30}
                />
              </View>
            </ScrollView>
          </View>
          <View>
            <Text className="text-[18px] mb-2">Temperature</Text>
            <ScrollView
              className="my-4"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: screenWidth * 3 }}>
                <LineChart
                  data={{
                    datasets: [
                      {
                        data: temperatureData,
                        color: (opacity = 50) => `#000`, // optional
                        strokeWidth: 2, // optional
                      },
                    ],
                  }}
                  width={screenWidth * 3 - 50}
                  height={220}
                  verticalLabelRotation={30}
                  withVerticalLines={false}
                  withHorizontalLines={false}
                  chartConfig={{
                    backgroundGradientFrom: "rgba(0, 0, 0, 0)", // Transparent background
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "rgba(0, 0, 0, 0)", // Transparent background
                    backgroundGradientToOpacity: 0,
                    color: (opacity = 1) => `#000`,
                    strokeWidth: 2, // Optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false, // Optional
                    propsForDots: {
                      r: "3", // Radius of the dots
                      strokeWidth: "1",
                      stroke: "#000", // Color of the dots' border
                    },
                    fillShadowGradientFrom: "#fff",
                    fillShadowGradientTo: "#ff5722",
                    fillShadowGradientFromOpacity: 0.3,
                    fillShadowGradientToOpacity: 0.3,
                  }}
                  bezier
                />
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <View>
          <ActivityIndicator size={"small"} />
        </View>
      )}
    </View>
  );
}
