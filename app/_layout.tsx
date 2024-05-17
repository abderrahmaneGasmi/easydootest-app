import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/context/Authcontext";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Oxygen: require("../assets/fonts/Oxygen-Regular.ttf"),
    "Oxygen-Bold": require("../assets/fonts/Oxygen-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <SessionProvider>
      <RootSiblingParent>
        <Stack>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
           */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
        </Stack>
      </RootSiblingParent>
    </SessionProvider>
  );
}
