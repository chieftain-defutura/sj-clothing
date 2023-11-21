import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../Button'
import Languages from '../../pages/Navigation/StackNavigation/Languages'
import Currency from '../../pages/Navigation/StackNavigation/Currency'
import { userStore } from '../../store/userStore'
import Skintone from '../Medium/Avatar/Skintone'
import Gender from '../Medium/Avatar/Gender'

const BeforeUser = () => {
  const { updateConfirmDetails } = userStore()
  const [steps, setSteps] = useState(0)
  return (
    <View style={{ flex: 1 }}>
      {steps === 0 && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            padding: 24,
            flex: 1,
          }}
        >
          <Gender />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              padding: 24,
            }}
          >
            {/* <CustomButton style={{ width: 180 }} text='Previous' onPress={() => setSteps(0)} /> */}
            <CustomButton style={{ width: 180 }} text='Next' onPress={() => setSteps(1)} />
          </View>
        </View>
      )}
      {steps === 1 && (
        <>
          <Skintone />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              padding: 24,
            }}
          >
            <CustomButton style={{ width: 180 }} text='Previous' onPress={() => setSteps(0)} />
            <CustomButton style={{ width: 180 }} text='Next' onPress={() => setSteps(2)} />
          </View>
        </>
      )}

      {steps === 2 && (
        <>
          <Languages />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              padding: 24,
            }}
          >
            <CustomButton style={{ width: 180 }} text='Previous' onPress={() => setSteps(1)} />
            <CustomButton style={{ width: 180 }} text='Next' onPress={() => setSteps(3)} />
          </View>
        </>
      )}
      {steps === 3 && (
        <>
          <Currency />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              padding: 24,
            }}
          >
            <CustomButton style={{ width: 180 }} text='Previous' onPress={() => setSteps(2)} />
            <CustomButton
              style={{ width: 180 }}
              text='Confirm'
              onPress={() => updateConfirmDetails(true)}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default BeforeUser

const styles = StyleSheet.create({})
