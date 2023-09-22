import React from 'react'
import { StyleSheet, Pressable, Share, Image, View } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import LeftArrow from '../../assets/icons/LeftArrow'
import ShareArrow from '../../assets/icons/ShareArrow'
import { PremiumDetailsData } from '../../utils/premiumDetailsData'
import { COLORS, FONT_FAMILY } from '../../styles/theme'
import PlayCircleIcon from '../../assets/icons/PremiumPageIcon/PlayCircle'
import CustomButton from '../Button'

const PremiumDetails: React.FC = () => {
  const navigation = useNavigation()

  const url = 'https://www.youtube.com/watch?v=lTxn2BuqyzU'
  const share = async () => {
    try {
      const result = await Share.share({ message: 'Bug:' + `\n` + url })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with active type', result.activityType)
        } else {
          console.log('shared')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#FFEFFF', '#FFF']}
      style={styles.linearGradient}
    >
      <FlexContent>
        <Pressable
          onPress={() => {
            navigation.goBack()
          }}
        >
          <LeftArrow width={24} height={24} />
        </Pressable>
        <Pressable onPress={share}>
          <ShareArrow width={24} height={24} />
        </Pressable>
      </FlexContent>
      {PremiumDetailsData.map((f, index) => {
        return (
          <PremiumDetailsWrapper key={index}>
            <View>
              <Image source={f.image} style={{ width: 196, height: 320, resizeMode: 'cover' }} />
            </View>
            <View>
              <ProductText>{f.product}</ProductText>
              <ProductName>{f.productName}</ProductName>
              <View style={{ marginVertical: 16 }}>
                <ProductText>{f.size}</ProductText>
                <ProductName>{f.productSize}</ProductName>
              </View>
              <View style={{ marginBottom: 16 }}>
                <ProductText>{f.material}</ProductText>
                <ProductName>{f.wool}</ProductName>
                <ProductName>{f.mohair}</ProductName>
              </View>
              <ProductText>{f.price}</ProductText>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <OldPriceText>
                  {f.oldPrice} {f.inr}
                </OldPriceText>
                <View>
                  <ProductName>
                    {f.newPrice} {f.inr}
                  </ProductName>
                </View>
              </View>
              <WatchVideoBorder>
                <PlayCircleIcon width={12} height={12} />
                <WatchVideoText>Watch video</WatchVideoText>
              </WatchVideoBorder>
            </View>
          </PremiumDetailsWrapper>
        )
      })}
      <CustomButton
        text='Add more'
        fontFamily='Arvo-Regular'
        fontSize={12}
        style={{ marginBottom: 30 }}
      />
    </LinearGradient>
  )
}

const FlexContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const PremiumDetailsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`
const ProductText = styled.Text`
  font-size: 10px;
  font-family: ${FONT_FAMILY.MontserratRegular};
  color: ${COLORS.SecondaryTwo};
`

const WatchVideoBorder = styled.Pressable`
  border-radius: 30px;
  border-width: 1px;
  border-color: ${COLORS.textSecondaryClr};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-vertical: 8px;
  margin-top: 16px;
`

const ProductName = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.iconsHighlightClr};
  margin-top: 4px;
`
const WatchVideoText = styled.Text`
  font-size: 10px;
  color: ${COLORS.textSecondaryClr};
`

const OldPriceText = styled.Text`
  font-size: 13px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  text-decoration-line: line-through;
  margin-top: 4px;
`

export default PremiumDetails

const styles = StyleSheet.create({
  linearGradient: {
    padding: 16,
  },
})
