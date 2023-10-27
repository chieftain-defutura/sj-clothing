import React, { useState } from 'react'
import { Pressable, StyleSheet, Dimensions, Image, View } from 'react-native'
import styled from 'styled-components/native'
import LeftArrow from '../../assets/icons/LeftArrow'
import ThreeSixtyDegree from '../../assets/icons/360-degree'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import CustomButton from '../Button'
import { addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../../firebase'
import { IAccessory } from '../../constant/types'
import { userStore } from '../../store/userStore'
import AuthNavigate from '../../screens/AuthNavigate'

interface IAccessoryThreeSixtyDegree {
  navigation: any

  data: IAccessory
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const { width, height } = Dimensions.get('window')

const AccessoryThreeSixtyDegree: React.FC<IAccessoryThreeSixtyDegree> = ({
  navigation,
  setOpenDetails,
  data,
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const [focus, setFocus] = useState(false)
  const user = userStore((state) => state.user)

  const onClose = () => {
    setFocus(false)
  }

  const handleSubmit = async () => {
    if (!user) {
      setFocus(true)
    } else {
      navigation.navigate('Checkout')
      setFocus(true)
      const docRef = await addDoc(collection(db, 'Orders'), {
        description: data.description,
        price: data.normalPrice,
        offerPrice: data.offerPrice,
        status: 'pending',
        userId: user?.uid,
        type: 'Accessory-Level',
        productName: data.productName,
        orderStatus: {
          orderplaced: {
            createdAt: null,
            description: '',
            status: false,
          },
          manufacturing: {
            createdAt: null,
            description: '',
            status: false,
          },
          readyToShip: {
            createdAt: null,
            description: '',
            status: false,
          },
          shipping: {
            createdAt: null,
            description: '',
            status: false,
          },
          delivery: {
            createdAt: null,
            description: '',
            status: false,
          },
        },
      })
    }
  }
  return (
    <Animated.View
      entering={SlideInRight.duration(500).delay(200)}
      exiting={SlideOutRight.duration(500).delay(200)}
    >
      <AuthNavigate focus={focus} onClose={onClose}>
        <View style={styles.linearGradient}>
          <FlexContent>
            <Pressable
              onPress={() => {
                setOpenDetails(false)
              }}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              {() => (
                <IconHoverClr
                  style={{ backgroundColor: isPressed ? 'rgba(70, 45, 133, 0.5)' : 'transparent' }}
                >
                  <IconHoverPressable>
                    <LeftArrow width={24} height={24} />
                  </IconHoverPressable>
                </IconHoverClr>
              )}
            </Pressable>
          </FlexContent>
          <ThreeSixtyDegreeImageWrapper>
            <ThreeSixtyDegreeImage>
              <Image
                source={{ uri: data.productImage }}
                style={{
                  resizeMode: 'contain',
                  width: width * 0.9,
                  height: height * 0.65,
                  marginTop: 20,
                }}
              />
            </ThreeSixtyDegreeImage>
            <SelectStyle360Degree>
              <ThreeSixtyDegree width={40} height={40} />
            </SelectStyle360Degree>
            <CustomButton
              text='Buy Now'
              fontFamily='Arvo-Regular'
              fontSize={16}
              style={{ width: '100%', position: 'absolute', left: 0, right: 0, bottom: -90 }}
              onPress={handleSubmit}
            />
          </ThreeSixtyDegreeImageWrapper>
        </View>
      </AuthNavigate>
    </Animated.View>
  )
}

const ThreeSixtyDegreeImage = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
`
const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const ThreeSixtyDegreeImageWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const IconHoverPressable = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  margin-top: 2px;
`

const IconHoverClr = styled.View`
  border-radius: 20px;
  width: 32px;
  height: 32px;
`

const SelectStyle360Degree = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
`

export default AccessoryThreeSixtyDegree

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
    height,
  },
})
