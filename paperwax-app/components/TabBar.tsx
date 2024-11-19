import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { TabBarIcon } from './navigation/TabBarIcon';

const TabBar = ({ state, descriptors, navigation, lightColor, darkColor }) => {
    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background')
    const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'background')

    const icons = {
        Cuenta: {outline: 'person-circle', normal: 'person-circle-outline'}, 
        Inicio: {outline: 'home', normal: 'home-outline'}, 
        Registros: {outline: 'book', normal: 'book-outline'}, 
    }

    return (
        <View style={[{backgroundColor}, styles.tabBar]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        style={styles.tabBarItem}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        <TabBarIcon style={{ marginBottom: -3 }} name={isFocused ? icons[label].outline : icons[label].normal} color={isFocused ? Colors.primary.textPrimaryLight : textColor} />
                        <ThemedText style={isFocused && { color: Colors.primary.textPrimaryLight }}>
                            {label}
                        </ThemedText>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute', 
        bottom: 8, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 8, 
        paddingVertical: 12, 
        borderRadius: 25
    }, 
    tabBarItem: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default TabBar