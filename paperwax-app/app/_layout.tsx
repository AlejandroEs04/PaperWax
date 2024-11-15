import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/lib/queryClient';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="checkIn/rollRegister" options={{ headerShown: true, title: "Registrar Rollo" }} />
          <Stack.Screen name="checkIn/rawMaterialRegister" options={{ headerShown: true, title: "Registrar Material" }} />
          <Stack.Screen name="process/followProcess" options={{ headerShown: true, title: "Seguir Proceso" }} />
          <Stack.Screen name="process/createProcess" options={{ headerShown: true, title: "Crear Proceso" }} />
          <Stack.Screen name="process/createPrinting" options={{ headerShown: true, title: "Iniciar Imprenta" }} />
          <Stack.Screen name="process/createParaffin" options={{ headerShown: true, title: "Iniciar Imprenta" }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
