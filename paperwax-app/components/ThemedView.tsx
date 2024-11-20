import { View, type ViewProps, RefreshControl, SafeAreaView, Platform, StatusBar, StyleSheet, ScrollView } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCallback, useState } from 'react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { ProcessType, SaleProductType } from '@/types';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  header?: boolean;
  onCharge?: (options?: RefetchOptions) => Promise<QueryObserverResult<SaleProductType[] | undefined | ProcessType[], Error>>
};

export function ThemedView({ style, lightColor, darkColor, onCharge, header = false, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    onCharge

    setRefreshing(false)
  }, []);

  return (
    <SafeAreaView style={[{ backgroundColor, flex: 1, paddingTop: Platform.OS === "android" && !header ? StatusBar.currentHeight : 0 }, style]}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={[styles.container, header && styles.paddingContainer]} {...otherProps} />
      </ScrollView>
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