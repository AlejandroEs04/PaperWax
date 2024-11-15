import { View, type ViewProps, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  header?: boolean
};

export function ThemedView({ style, lightColor, darkColor, header = false, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <SafeAreaView style={[{ backgroundColor, flex: 1, paddingTop: Platform.OS === "android" && !header ? StatusBar.currentHeight : 0 }, style]}>
      <View style={[styles.container, header && styles.paddingContainer]} {...otherProps} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 15, 
    marginBottom: 85
  }, 
  paddingContainer: {
    paddingTop: 25,
  }
});