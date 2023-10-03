import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Avatar from './Avatar'
import Navigator from './Navigator'
import SelectStyle from './SelectStyle'
import { Data, Designs, MidLevelData, TextDesigns } from '../../utils/PostCreationData'
import SelectSize from './SelectSize'
import SelectColor from './SlectColor'
import TShirt from './T-Shirt'
import SelectDesign from './SelectDesign'
import FinalView from './FinalView'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { gradientOpacityColors } from '../../styles/theme'
import AddImageOrText from './AddImageOrText'

interface IMediumLevel {}

const MediumLevel: React.FC<IMediumLevel> = () => {
  const navigation = useNavigation()
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [isSteps, setSteps] = useState(1)

  //data
  const [data, setData] = useState(MidLevelData)

  //style
  const [isDropDown, setDropDown] = useState(false)
  const [isSelectedStyle, setSelectedStyle] = useState('Half sleeve')
  //size
  const [isSize, setSize] = useState({
    country: '',
    sizeVarient: { size: '', measurement: '', unit: '' },
  })
  //color
  const [isColor, setColor] = useState({
    colorName: '',
    hexCode: '',
  })

  //image&text
  const [isOpenDesign, setOpenDesign] = useState(false)
  const [isDone, setDone] = useState(false)
  const [isImageOrText, setImageOrText] = useState({
    title: '',
    position: 'front',
    designs: {
      hashtag: 'friends',
      image: '',
    },
  })
  //finalview
  const [quantity, setQuantity] = useState('')
  const [approved, setApproved] = useState(false)
  const handleIncreaseSteps = () => {
    setSteps(isSteps + 1)
    setDropDown(false)
    setOpenDesign(false)
    setDone(false)
  }
  const handleDecreaseSteps = () => {
    if (isSteps !== 1) {
      setSteps(isSteps - 1)
      setDropDown(false)
      setOpenDesign(false)
    }
  }

  return (
    <View style={styles.midiumlevelContainer}>
      {!toggleAvatar ? (
        <Avatar setToggleAvatar={setToggleAvatar} />
      ) : (
        <LinearGradient
          colors={gradientOpacityColors}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
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
          {isSteps === 1 && (
            <SelectStyle
              isDropDown={isDropDown}
              isSelectedStyle={isSelectedStyle}
              setDropDown={setDropDown}
              setSelectedStyle={setSelectedStyle}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 2 && (
            <SelectSize
              isSize={isSize}
              setSize={setSize}
              isDropDown={isDropDown}
              setDropDown={setDropDown}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 3 && (
            <SelectColor
              isColor={isColor}
              isDropDown={isDropDown}
              setDropDown={setDropDown}
              setColor={setColor}
              handleIncreaseSteps={handleIncreaseSteps}
            />
          )}
          {isSteps === 4 && (
            <AddImageOrText
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
              isImageOrText={isImageOrText}
              designs={isImageOrText.title === 'text image' ? TextDesigns : Designs}
              setOpenDesign={setOpenDesign}
              isDone={isDone}
              setDone={setDone}
              setImageOrText={setImageOrText}
            />
          )}
        </LinearGradient>
      )}
    </View>
  )
}

export default MediumLevel

const styles = StyleSheet.create({
  midiumlevelContainer: {
    flex: 1,
  },
  submitBtn: {
    marginVertical: 8,
    fontFamily: 'Arvo-Regular',
    marginBottom: 54,
  },
})
