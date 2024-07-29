import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Welcome(props) {
  const {currentUser} = useContext(AuthContext)

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => {
      ring1padding.value = withSpring(ring1padding.value + hp(5));
      ring2padding.value = withSpring(ring2padding.value + hp(5.5));
    }, 100);

    setTimeout(() => {
      if(currentUser?.login){
        props.navigation.navigate("homePage")
      }else{
        props.navigation.navigate("firstPage")
      }
    }, 2500);
  }, [currentUser]);

  const ring1Style = useAnimatedStyle(() => {
    return {
      padding: ring1padding.value,
    };
  });

  const ring2Style = useAnimatedStyle(() => {
    return {
      padding: ring2padding.value,
    };
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      className="bg-[#17A34A]"
    >
      <StatusBar style="light" />

      {/* logo with rings */}
      <Animated.View
        style={[
          { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 999 },
          ring2Style,
        ]}
      >
        <Animated.View
          style={[
            { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 999 },
            ring1Style,
          ]}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text
          style={{
            fontSize: hp(6),
            fontWeight: "bold",
            color: "white",
            letterSpacing: 2,
          }}
        >
          Smart Fields
        </Text>
        <Text
          className="uppercase"
          style={{
            fontSize: hp(2),
            fontWeight: "500",
            color: "white",
            letterSpacing: 1,
          }}
        >
          Agric made easier with Tech
        </Text>
      </View>
    </Animated.View>
  );
}
