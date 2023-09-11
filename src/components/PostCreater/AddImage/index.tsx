import { StyleSheet, Text, View, Image, Touchable, Pressable } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../../styles/theme'
import CloseIcon from '../../../assets/icons/Close'
import styled from 'styled-components/native'
import SelectDesign from './SelectDesign'
import LeftArrow from '../../../assets/icons/LeftArrow'

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

interface IAddImage {
  navigation: any
}

const AddImage: React.FC<IAddImage> = ({ navigation }) => {
  const [isAddImage, setAddImage] = useState(false)
  const [isSelect, setSelect] = useState('Front')
  return (
    <View style={styles.AddImageContainer}>
      {!isAddImage ? (
        <View style={styles.AddImageNavigator}>
          <Pressable onPress={() => navigation.navigate('Color')}>
            <Image source={require('../../../assets/images/arrow-circle-left.png')} />
          </Pressable>
          <Pressable onPress={() => setAddImage(true)} style={styles.AddImageDropdown}>
            <Text>Add Image</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('AddText')}>
            <Image source={require('../../../assets/images/arrow-circle-right.png')} />
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
                borderBottomColor: COLORS.borderClr,
                borderBottomWidth: 2,
                paddingVertical: 20,
                color: COLORS.textClr,
                fontSize: 14,
              }}
            >
              Select area to add image
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}
            >
              {Images.slice(0, 2).map((data, index) => (
                <Pressable
                  onPress={() => setSelect(data.title)}
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                    <Image style={{ width: 70, height: 100 }} source={data.image} />
                  </View>

                  <Text style={{ color: COLORS.textClr }}>{data.title}</Text>
                </Pressable>
              ))}
              {Images.slice(2, 4).map((data, index) => (
                <Pressable
                  onPress={() => setSelect(data.title)}
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                    <Image style={{ width: 30, height: 100 }} source={data.image} />
                  </View>

                  <Text style={{ color: COLORS.textClr }}>{data.title}</Text>
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
              onPress={() => setAddImage(false)}
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

      <View style={styles.AddImageTShirt}>
        <Image source={require('../../../assets/images/plain-shirt.png')} />
      </View>
      <View style={styles.AddImage360Degree}>
        <Image source={require('../../../assets/images/360-degree.png')} />
      </View>
      {/* <SelectDesign /> */}
    </View>
  )
}

export default AddImage

const styles = StyleSheet.create({
  AddImageContainer: {
    padding: 16,
  },
  AddImageNavigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  AddImageDropdown: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderColor: '#462D85',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  AddImageTShirt: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 64,
  },
  AddImage360Degree: {
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
  width: 109%;
  z-index: 1;
`
