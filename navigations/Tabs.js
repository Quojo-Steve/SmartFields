import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import BlogScreen from "../screens/BlogScreen";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="capture"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 50,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 50,
          height: 90,
          ...styles.shadow,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={BlogScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#048232" : "#7D7B7B",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: 7,
                  color: focused ? "#048232" : "#7D7B7B",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="blog"
        component={BlogScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/blog.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#048232" : "#7D7B7B",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: 7,
                  color: focused ? "#048232" : "#7D7B7B",
                }}
              >
                Blog
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="capture"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: -30,
                backgroundColor: focused ? "#048232" : "#E9F2F4",
                width: 70,
                height: 70,
                borderRadius: 50,
                borderWidth: focused ? 0 : 1,
                borderColor: "#e7e6e6",
              }}
            >
              <Image
                source={require("../assets/images/cam.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFFF" : "#7D7B7B",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={BlogScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/history.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#048232" : "#7D7B7B",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: 7,
                  color: focused ? "#048232" : "#7D7B7B",
                }}
              >
                History
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        // listeners={{
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     navigation.navigate("login");
        //   },
        // }}
        component={BlogScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/profile.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#048232" : "#7D7B7B",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: 7,
                  color: focused ? "#048232" : "#7D7B7B",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#b9b8b8",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
