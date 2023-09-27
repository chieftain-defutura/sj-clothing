import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Avatar from './Avatar'
import Navigator from './Navigator'
import SelectStyle from './SelectStyle'
import { Data, Designs, MidLevelData, TextDesigns } from '../../utils/PostCreationData'
import SelectSize from './SelectSize'
import SelectColor from './SlectColor'
import AddImage from './AddImage'
import AddText from './AddText'
import TShirt from './T-Shirt'
import SelectDesign from './SelectDesign'
import FinalView from './FinalView'
import { useNavigation } from '@react-navigation/native'
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated'

interface IMediumLevel {}

const MediumLevel: React.FC<IMediumLevel> = () => {
  const navigation = useNavigation()
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [isSteps, setSteps] = useState(1)
  const [isImageOrText, setImageOrText] = useState(false)
  //data
  const [data, setData] = useState(MidLevelData)
  //style
  const [isType, setType] = useState('shirt')
  const [isDropDown, setDropDown] = useState(false)
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  //size
  const [isSelectCountry, setSelectCountry] = useState('India')
  const [isSelectedSize, setSelectedSize] = useState('s')
  //color
  const [isSelectedColor, setSelectedColor] = useState('white')
  //image&text
  const [isOpenDesign, setOpenDesign] = useState(false)
  const [isHashtag, setHashtag] = useState('')
  const [isImage, setImage] = useState(0)
  const [isDone, setDone] = useState(false)
  //finalview
  const [quantity, setQuantity] = useState('')
  const [approved, setApproved] = useState(false)

  const handleIncreaseSteps = () => {
    setSteps(isSteps + 1)
    setDropDown(false)
    setOpenDesign(false)
    setDone(false)
    if (isSteps === 4) {
      setHashtag('')
    }
  }
  const handleDecreaseSteps = () => {
    if (isSteps !== 1) {
      setSteps(isSteps - 1)
      setDropDown(false)
      setOpenDesign(false)
      if (isSteps === 4) {
        setHashtag('')
      }
    }
  }

  return (
    <View style={styles.midiumlevelContainer}>
      {!toggleAvatar ? (
        <Avatar setToggleAvatar={setToggleAvatar} />
      ) : (
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Animated.View entering={BounceIn} exiting={BounceOut}>
            <Navigator
              steps={isSteps}
              isOpenDesign={isOpenDesign}
              isDone={isDone}
              setDone={setDone}
              setDropDown={setDropDown}
              setOpenDesign={setOpenDesign}
              setImageOrText={setImageOrText}
              handleDecreaseSteps={handleDecreaseSteps}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          </Animated.View>
          {isSteps === 1 && (
            <SelectStyle
              isDropDown={isDropDown}
              isSelectedStyle={isSelectedStyle}
              isType={isType}
              setDropDown={setDropDown}
              setSelectedStyle={setSelectedStyle}
              setType={setType}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 2 && (
            <SelectSize
              isDropDown={isDropDown}
              isSelectedSize={isSelectedSize}
              isSelectCountry={isSelectCountry}
              setSelectCountry={setSelectCountry}
              setDropDown={setDropDown}
              setSelectedSize={setSelectedSize}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 3 && (
            <SelectColor
              isDropDown={isDropDown}
              isSelectedColor={isSelectedColor}
              setDropDown={setDropDown}
              setSelectedColor={setSelectedColor}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 4 && !isImageOrText && (
            <AddImage
              isDropDown={isDropDown}
              setDropDown={setDropDown}
              setOpenDesign={setOpenDesign}
            />
          )}

          {isSteps === 4 && isImageOrText && (
            <AddText
              isDropDown={isDropDown}
              setDropDown={setDropDown}
              setOpenDesign={setOpenDesign}
            />
          )}
          <View>
            <ScrollView>
              <TShirt />
              {isSteps === 5 && (
                <FinalView
                  Data={Data}
                  navigation={navigation}
                  setQuantity={setQuantity}
                  approved={approved}
                  setApproved={setApproved}
                  quantity={quantity}
                />
              )}
            </ScrollView>
          </View>
          {isOpenDesign && !isDone && isSteps === 4 && (
            <SelectDesign
              designs={isImageOrText ? TextDesigns : Designs}
              setOpenDesign={setOpenDesign}
              setHashtag={setHashtag}
              isHashtag={isHashtag}
              isImage={isImage}
              setImage={setImage}
              isDone={isDone}
              setDone={setDone}
            />
          )}
        </View>
      )}
    </View>
  )
}

export default MediumLevel

const styles = StyleSheet.create({
  midiumlevelContainer: {
    flex: 1,
    backgroundColor: '#FFEFFF',
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 54,
  },
})
