import { Tabs, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBar from '@/components/TabBar';
import * as SecureStore from 'expo-secure-store';

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();

  const checkAuthToken = async () => {
    const token = await SecureStore.getItemAsync('authToken');
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkAuthToken()
  }, [])

  useEffect(() => {
    if(isAuthenticated === false) {
      router.replace("/auth/login")
    }
  }, [isAuthenticated])

  if (isAuthenticated === null) {
    return null
  }

  return (
    <Tabs
      initialRouteName='index'
      tabBar={props=> <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="account"
        options={{
          title: 'Cuenta',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={Colors.primary.background} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={Colors.primary.background} />
          ), 
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuracion',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'book' : 'book-outline'} color={Colors.primary.background} />
          ),
        }}
      />
    </Tabs>
  );
}
