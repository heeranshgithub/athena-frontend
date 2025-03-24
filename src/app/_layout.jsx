import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { getUserToken, setUser } from "../store/slices/userSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css"; // for nativewind
import secureStorage from "../utils/secureStorage";

// Separate component for auth logic
const AuthWrapper = () => {
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useDispatch();
  const userToken = useSelector(getUserToken);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const [userToken, userName, userEmail] = await Promise.all([
          secureStorage.getUserToken(),
          secureStorage.getUserName(),
          secureStorage.getUserEmail(),
        ]);
        if (userToken && userName && userEmail) {
          dispatch(
            setUser({ name: userName, token: userToken, email: userEmail }),
          );
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };

    if (!userToken) initializeAuth();

    const onAuthScreen = segments[0] === "register";
    if (!userToken && !onAuthScreen) {
      router.replace("/register");
    } else if (userToken && onAuthScreen) {
      router.replace("/chat");
    }
  }, [userToken, segments]);

  return <Slot />; // This loads either (tabs)/_layout.tsx or register.tsx
};

// Root component that provides context
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
