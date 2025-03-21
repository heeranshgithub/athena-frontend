import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { getUserToken, setUser } from "../store/slices/userSlice.ss";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css"; // for nativewind
import { secureStorage } from "../utils";

// Auth wrapper component
const AuthWrapper = () => {
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useDispatch();
  const userToken = useSelector(getUserToken);

  useEffect(() => {
    console.log("segments", segments);
    const inAuthGroup = segments[0] === "(auth)";
    const initializeAuth = async () => {
      //method setting user token and user id into user slice when the app opens
      try {
        const [userToken, userName] = await Promise.all([
          secureStorage.getUserToken(),
          secureStorage.getUserName(),
        ]);
        if (userToken && userName)
          dispatch(setUser({ name: userName, token: userToken }));
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };
    if (!userToken) initializeAuth();
    if (!userToken && !inAuthGroup) {
      // Redirect to register if no token and not already in auth group
      router.replace("/register");
    } else if (userToken && inAuthGroup) {
      // Redirect to chat screen if has token but is still in auth group
      router.replace("/chat");
    }
  }, [userToken, segments]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AuthWrapper />
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootLayout;
