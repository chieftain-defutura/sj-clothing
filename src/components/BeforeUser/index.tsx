import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../Button'
import Avatar from '../Medium/Avatar'
import Languages from '../../pages/Navigation/StackNavigation/Languages'
import Currency from '../../pages/Navigation/StackNavigation/Currency'
import { userStore } from '../../store/userStore'

const BeforeUser = () => {
  const { updateConfirmDetails } = userStore()
  const [steps, setSteps] = useState(0)
  return (
    <View style={{ flex: 1 }}>
      {steps === 0 && <Avatar path='MidLevel' setSteps={setSteps} steps={steps} />}
      {steps === 1 && (
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
            <CustomButton style={{ width: 180 }} text='Previous' onPress={() => setSteps(0)} />
            <CustomButton style={{ width: 180 }} text='Next' onPress={() => setSteps(2)} />
          </View>
        </>
      )}
      {steps === 2 && (
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
            <CustomButton style={{ width: 180 }} text='Previous' onPress={() => setSteps(1)} />
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
