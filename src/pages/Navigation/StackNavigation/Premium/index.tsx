import React from 'react'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import PremiumDetailsCard from './PremiumDetailsCard'
import Premium from '../../TabNavigation/Premium'

const SharedNavigater = createSharedElementStackNavigator()

const PremiumNavigation: React.FC = () => {
  return (
    <SharedNavigater.Navigator initialRouteName='Premiumm'>
      <SharedNavigater.Screen
        name='Premiumm'
        component={Premium}
        options={{ headerShown: false }}
      />
      <SharedNavigater.Screen
        name='PremiumDetailsCard'
        component={PremiumDetailsCard}
        sharedElements={(route, otherRoute, showing) => {
          const { image } = route.params
          return [`test${image}`]
        }}
        options={{ headerShown: false }}
      />
    </SharedNavigater.Navigator>
  )
}

export default PremiumNavigation
