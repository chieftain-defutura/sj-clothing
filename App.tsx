import React from 'react'
import { Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Post from './src/pages/BottomTabNavigationBar/Post'
import MidLevel from './src/pages/BottomTabNavigationBar/MidLevel'
import Premium from './src/pages/BottomTabNavigationBar/Premium'
import Account from './src/pages/BottomTabNavigationBar/Account'
import HomeIcon from './src/assets/icons/HomeIcon'
import AccountIcon from './src/assets/icons/AccountIcon'
import PremiumIcon from './src/assets/icons/PremiumIcon'
import MidLevelIcon from './src/assets/icons/MidLevelIcon'
import { COLORS } from './src/styles/theme'
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native'
import { useFonts } from '@use-expo/font'
import Header from './src/components/Header'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const customFonts = {
  Gilroy: require('./src/assets/fonts/Gilroy-Regular.ttf'),
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{ tabBarStyle: { padding: 10, backgroundColor: COLORS.textClr } }}
    >
      <Tab.Screen
        name='Post'
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <View style={{ backgroundColor: 'white', borderRadius: 50 }}>
                <HomeIcon color={color} width={40} height={40} />
              </View>
            ) : (
              <HomeIcon color={color} width={40} height={40} />
            ),
          headerShown: false,
        }}
        component={Post}
      />
      <Tab.Screen
        name='MidLevel'
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <View style={{ backgroundColor: 'white', borderRadius: 50 }}>
                <MidLevelIcon color={color} width={40} height={40} />
              </View>
            ) : (
              <MidLevelIcon color={color} width={40} height={40} />
            ),
          headerShown: false,
        }}
        component={MidLevel}
      />
      <Tab.Screen
        name='Premium'
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <View style={{ backgroundColor: 'white', borderRadius: 50 }}>
                <PremiumIcon color={color} width={40} height={40} />
              </View>
            ) : (
              <PremiumIcon color={color} width={40} height={40} />
            ),
          headerShown: false,
        }}
        component={Premium}
      />
      <Tab.Screen
        name='Account'
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <View style={{ backgroundColor: 'white', borderRadius: 50 }}>
                <AccountIcon color={color} width={40} height={40} />
              </View>
            ) : (
              <AccountIcon color={color} width={40} height={40} />
            ),
          headerShown: false,
        }}
        component={Account}
      />
    </Tab.Navigator>
  )
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Stack'
        options={{
          headerShown: false,
          headerBackground: () => <Header />,
        }}
        component={TabNavigator}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  const [loaded] = useFonts(customFonts)

  if (!loaded) {
    return null
  }
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabstyle: {},
})
