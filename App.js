import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./navigations/StackNav";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
