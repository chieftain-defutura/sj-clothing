import React, { useEffect } from 'react'
import { Platform, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MidLevelIcon from '../../../assets/icons/MidLevelIcon'
import PremiumIcon from '../../../assets/icons/PremiumIcon'
import AccountIcon from '../../../assets/icons/AccountIcon'
import Post from './Post'
import MidLevel from './MidLevel'
import Premium from './Premium'
import Account from './Account'
import { useSharedValue } from 'react-native-reanimated'
import * as NavigationBar from 'expo-navigation-bar'
import Medium from '../../../components/Medium'
import { userStore } from '../../../store/userStore'
import TabHomeIcon from '../../../assets/icons/TabHomeIcon'

const Tab = createBottomTabNavigator()

const TabNavigationRoutes: React.FC = () => {
  const opacityValue = useSharedValue(2)
  const confirmDetails = userStore((state) => state.confirmDetails)

  if (Platform.OS === 'android') {
    NavigationBar.setPositionAsync('relative')
    NavigationBar.setBackgroundColorAsync('rgba(145, 177, 225, 0.85)')
  }
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(145, 177, 225, 0.8)',
          paddingVertical: 16,
          borderTopWidth: 0,
          height: 62,
          elevation: 0,
          display: confirmDetails ? 'flex' : 'none',
        },
        unmountOnBlur: true,
      }}
    >
      {/* <Tab.Screen
        name='Post'
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  opacity: focused ? opacityValue.value : 2,
                }}
              >
                <TabHomeIcon color='#DB00FF' width={40} height={40} />
              </View>
            ) : (
              <TabHomeIcon color='#462D85' width={40} height={40} />
            ),
          headerShown: false,
        }}
        component={Post}
      /> */}
      <Tab.Screen
        name='MidLevel'
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  opacity: focused ? opacityValue.value : 2,
                }}
              >
                <MidLevelIcon color='#DB00FF' width={40} height={40} />
              </View>
            ) : (
              <MidLevelIcon color='#462D85' width={40} height={40} />
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
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  opacity: focused ? opacityValue.value : 2,
                }}
              >
                <PremiumIcon color='#DB00FF' width={40} height={40} />
              </View>
            ) : (
              <PremiumIcon color='#462D85' width={40} height={40} />
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
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  opacity: focused ? opacityValue.value : 2,
                }}
              >
                <AccountIcon color='#DB00FF' width={40} height={40} />
              </View>
            ) : (
              <AccountIcon color='#462D85' width={40} height={40} />
            ),
          headerShown: false,
        }}
        component={Account}
      />
    </Tab.Navigator>
  )
}

export default TabNavigationRoutes
