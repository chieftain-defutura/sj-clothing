import React, { useState } from 'react'
import styled from 'styled-components/native'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import ThreeSixtyDegree from '../../../assets/icons/360-degree'
import ArrowCircleLeft from '../../../assets/icons/ArrowCircleLeft'
import ArrowCircleRight from '../../../assets/icons/ArrowCircleRight'

const Images = [
  {
    title: 'Front',
    image: require('../../../assets/images/front-design.png'),
  },
  {
    title: 'Back',
    image: require('../../../assets/images/front-design.png'),
  },
  {
    title: 'Right arm',
    image: require('../../../assets/images/left-arm-design.png'),
  },
  {
    title: 'Left arm',
    image: require('../../../assets/images/left-arm-design.png'),
  },
]

interface IAddText {
  navigation: any
}

const AddText: React.FC<IAddText> = ({ navigation }) => {
  const [isAddText, setAddText] = useState(false)
  const [isSelect, setSelect] = useState('Front')
  return (
    <View style={styles.AddTextContainer}>
      {!isAddText ? (
        <View style={styles.AddTextNavigator}>
          <Pressable onPress={() => navigation.navigate('AddImage')}>
            <ArrowCircleLeft width={24} height={24} />
          </Pressable>
          <Pressable onPress={() => setAddText(true)} style={styles.AddTextDropdown}>
            <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>Add Text</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ProductAndCaption')}>
            <ArrowCircleRight width={24} height={24} />
          </Pressable>
        </View>
      ) : (
        <DropDownWrapper>
          <View
            style={{
              backgroundColor: COLORS.iconsNormalClr,
              borderBottomRightRadius: 50,
              borderBottomLeftRadius: 50,
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Gilroy-Medium',
                borderBottomColor: COLORS.borderClr,
                borderBottomWidth: 2,
                paddingVertical: 20,
                color: COLORS.textClr,
                fontSize: 14,
              }}
            >
              Select area to add text
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 1,
                gap: 10,
              }}
            >
              {Images.slice(0, 2).map((data, index) => (
                <Pressable
                  onPress={() => {
                    setSelect(data.title), setAddText(false), navigation.navigate('AddedText')
                  }}
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.BoxBackgoundClr,
                      padding: 16,
                      borderRadius: 10,
                      borderColor: isSelect === data.title ? COLORS.textSecondaryClr : '',
                      borderWidth: isSelect === data.title ? 1 : 0,
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 72, objectFit: 'contain' }}
                      source={data.image}
                    />
                  </View>

                  <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                    {data.title}
                  </Text>
                </Pressable>
              ))}
              {Images.slice(2, 4).map((data, index) => (
                <Pressable
                  onPress={() => {
                    setSelect(data.title), setAddText(false), navigation.navigate('AddedText')
                  }}
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.BoxBackgoundClr,
                      padding: 16,
                      borderRadius: 10,
                      width: 70,
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      borderColor: isSelect === data.title ? COLORS.textSecondaryClr : '',
                      borderWidth: isSelect === data.title ? 1 : 0,
                    }}
                  >
                    <Image
                      style={{ width: 25, height: 72, objectFit: 'contain' }}
                      source={data.image}
                    />
                  </View>

                  <Text style={{ color: COLORS.textClr, fontFamily: 'Gilroy-Medium' }}>
                    {data.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setAddText(false)}
              style={{
                backgroundColor: COLORS.iconsNormalClr,
                width: 42,
                height: 42,
                borderRadius: 50,
                padding: 10,
              }}
            >
              <CloseIcon />
            </Pressable>
          </View>
        </DropDownWrapper>
      )}

      <View style={styles.AddTextTShirt}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.AddText360Degree}>
        <ThreeSixtyDegree width={40} height={40} />
      </View>
    </View>
  )
}

export default AddText

const styles = StyleSheet.create({
  AddTextContainer: {
    flex: 1,
    backgroundColor: '#FFEFFF',
  },
  AddTextNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  AddTextDropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  AddTextTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 64,
  },
  AddText360Degree: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
})

const DropDownWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
`
