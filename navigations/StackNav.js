import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import { Welcome, FirstScreen, LoginScreen, SignupScreen, CreateBlog, EditProfile, ManageUsers, EditUser } from "../screens";


export default StackNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen
        name="homePage"
        component={Tabs}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="firstPage"
        component={FirstScreen}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="createBlog"
        component={CreateBlog}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="manageUsers"
        component={ManageUsers}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="editUsers"
        component={EditUser}
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

