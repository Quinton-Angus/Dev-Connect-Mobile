import { Stack } from "expo-router";
import { useFonts, Inter_300Light, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Light: Inter_300Light,
    Medium: Inter_500Medium,
    SemiBold: Inter_600SemiBold
  })

  if (!fontsLoaded) {
    return null
  }

  return <Stack 
    screenOptions={{
      "headerShown": false
    }}
  />;
}
