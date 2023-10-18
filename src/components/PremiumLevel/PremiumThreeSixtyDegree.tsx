import React, { useState } from 'react'
import { Pressable, StyleSheet, Dimensions, Image, View } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import LeftArrow from '../../assets/icons/LeftArrow'
import ThreeSixtyDegree from '../../assets/icons/360-degree'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'
import CustomButton from '../Button'
import { gradientOpacityColors } from '../../styles/theme'
import { addDoc, collection } from 'firebase/firestore/lite'
import { db } from '../../../firebase'
import { IPremiumData } from '../../constant/types'
import { userStore } from '../../store/userStore'

interface IPremiumThreeSixtyDegree {
  navigation: any
  size: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
    }
  }
  data: IPremiumData
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>
}

const { width, height } = Dimensions.get('window')

const PremiumThreeSixtyDegree: React.FC<IPremiumThreeSixtyDegree> = ({
  navigation,
  setOpenDetails,
  data,
  size,
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const { user } = userStore()
  console.log(size)
  console.log(data)
  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, 'Orders'), {
      sizes: size,
      description: data.description,
      price: data.normalPrice,
      offerPrice: data.offerPrice,
      status: 'pending',
      userId: user?.uid,
      gender: data.gender,
      type: 'Premium-Level',
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
    navigation.navigate('Checkout')
    console.log(docRef)
  }
  return (
    <Animated.View
      entering={SlideInRight.duration(500).delay(200)}
      exiting={SlideOutRight.duration(500).delay(200)}
    >
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

export default PremiumThreeSixtyDegree

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
    height,
  },
})
