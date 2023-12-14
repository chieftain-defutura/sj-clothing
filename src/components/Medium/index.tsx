import uuid from 'react-native-uuid'
import { Dimensions, View, Animated, Easing } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite'
import {
  query as defaultQuery,
  collection as defualtCollection,
  where as defaultWhere,
  onSnapshot,
} from 'firebase/firestore'
import FinalView from './FinalView'
import Navigation from './Navigation'
import SelectSize from './Selectsize'
import { db, dbDefault } from '../../../firebase'
import SelectStyle from './SelectStyle'
import SelectColor from './SelectColor'
import SelectDesign from './SelectDesign'
import SelectCountry from './SelectCountry'
import AddImageOrText from './AddImageOrText'
import { userStore } from '../../store/userStore'
import LoginModal from '../../screens/Modals/Login'
import SignupModal from '../../screens/Modals/Signup'
import ForgotMail from '../../screens/Modals/ForgotMail'
import { IDesigns, IMidlevel } from '../../constant/types'
import Checkout from '../../pages/Navigation/StackNavigation/Checkout'
import AlertModal from '../../screens/Modals/AlertModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Haptics from 'expo-haptics'
import { Audio } from 'expo-av'
import MidLevelTooltip from '../Tooltips/MidLevelTooltip'
import { MidlevelStore } from '../../store/midlevelStore'
import FlowOne from './MidlevelWebView/FlowOne'
import FlowTwo from './MidlevelWebView/FlowTwo'
import FlowThree from './MidlevelWebView/FlowThree'

const { width } = Dimensions.get('window')

const Medium = () => {
  const isMounted = useRef(false)
  const slideValue = useSharedValue(0)
  const avatar = userStore((state) => state.avatar)
  const phoneNumber = userStore((state) => state.phoneNo)
  const midlevelData = MidlevelStore((state) => state.midlevel)
  const updateMidlevelData = MidlevelStore((state) => state.updateMidlevel)

  const user = userStore((state) => state.user)
  const [isSteps, setSteps] = useState(
    midlevelData.isSteps === '5' ? Number(midlevelData.isSteps) - 1 : 1,
  )
  const [isDropDown, setDropDown] = useState(false)
  const [uid, setUid] = useState<string>(midlevelData.isSteps === '5' ? midlevelData.uid : '')
  const [focus, setFocus] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  //data
  const [data, setData] = useState<IMidlevel[]>()
  const [designs, setDesigns] = useState<IDesigns[]>()
  const [FilteredData, setFilteredData] = useState<IMidlevel>()
  const [Design, setDesign] = useState<IDesigns[]>()

  //login
  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [forgotMail, setForgotmail] = useState(false)

  //style
  const [isSelectedStyle, setSelectedStyle] = useState(
    midlevelData.isSteps === '5' ? midlevelData.isSelectedStyle : '',
  )
  const [warning, setWarning] = useState('')

  //size
  const [isSize, setSize] = useState(
    midlevelData.isSteps === '5'
      ? midlevelData.isSize
      : {
          country: '',
          sizeVarient: [{ size: '', measurement: '', quantity: '' }],
        },
  )

  //color
  const [isColor, setColor] = useState(midlevelData.isSteps === '5' ? midlevelData.isColor : '')
  const [isColorName, setColorName] = useState(
    midlevelData.isSteps === '5' ? midlevelData.isColorName : '',
  )

  //image&text
  const [isOpenDesign, setOpenDesign] = useState(false)
  const [isDone, setDone] = useState(false)
  const [imageApplied, setImageApplied] = useState(false)

  const [isImageOrText, setImageOrText] = useState(
    midlevelData.isSteps === '5'
      ? midlevelData.isImageOrText
      : {
          title: '',
          position: 'Front',
          rate: 0,
          designs: {
            hashtag: '',
            image: '',
            originalImage: '',
          },
        },
  )
  const [tempIsImageOrText, setTempImageOrText] = useState({
    title: '',
    position: 'Front',
    rate: 0,
    designs: {
      hashtag: '',
      image: '',
      originalImage: '',
    },
  })
  const [openCheckout, setOpenCheckout] = useState(false)
  const [animationUpdated, setAnimationUpdated] = useState(false)
  const [toolTip, showToolTip] = useState(false)
  const shakeAnimation = useRef(new Animated.Value(0)).current

  console.log('ahhmbnbs', isSteps)

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleGetData = useCallback(() => {
    if (!uid) return
    const q = defaultQuery(
      defualtCollection(dbDefault, 'ModelsMidlevel'),
      defaultWhere('uid', '==', uid),
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data()['animationFinished']) {
          setAnimationUpdated(doc.data()['animationFinished']), playSound()
        }
      })
    })

    return () => {
      unsubscribe()
    }
  }, [uid])

  useEffect(() => {
    handleGetData()
  }, [handleGetData])

  useEffect(() => {
    if (!imageApplied) {
      setTempImageOrText(isImageOrText)
    }
  }, [imageApplied])

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/video/sound.mp3'))
      await sound.playAsync()
    } catch (error) {
      console.log('sound error:', error)
    }
  }

  const handleDecreaseSteps = () => {
    if (isSteps !== 1) {
      setSteps(isSteps - 1)
      setDropDown(false)
      setOpenDesign(false)
    }
    if (isSteps === 2) {
      setSelectedStyle('')
    }
    if (isSteps === 3) {
      setDropDown(false)
    }
    slideValue.value = withSequence(
      withTiming(-1, { duration: 400 }), // Slide out
      withTiming(0, { duration: 400 }),
    )
  }

  useEffect(() => {
    if (isSize.country) {
      handleIncreaseSteps()
    }
  }, [isSize.country])

  useEffect(() => {
    if (isSteps === 5) {
      const data = {
        isSteps: isSteps.toString(),
        isSelectedStyle: isSelectedStyle,
        isSize: isSize,
        isColor: isColor,
        isColorName: isColorName,
        isImageOrText: isImageOrText,
        tempIsImageOrText: tempIsImageOrText,
        uid: uid,
      }
      AsyncStorage.setItem('mid-steps', JSON.stringify(data))
      updateMidlevelData(data)
    }
    if (isSteps !== 5) {
      AsyncStorage.removeItem('mid-steps')
      const data = {
        isSteps: isSteps.toString(),
        isSelectedStyle: isSelectedStyle,
        isSize: isSize,
        isColor: isColor,
        isColorName: isColorName,
        isImageOrText: isImageOrText,
        tempIsImageOrText: tempIsImageOrText,
        uid: uid,
      }
      updateMidlevelData(data)
    }
  }, [isSteps])

  useEffect(() => {
    if (midlevelData.isSteps === '5') {
      if (midlevelData.isImageOrText.designs.originalImage) {
        setTempImageOrText(midlevelData.isImageOrText)
      }
    }
  }, [midlevelData])

  const handleIncreaseSteps = () => {
    let currentField
    switch (isSteps) {
      case 1:
        currentField = isSelectedStyle
        break
      case 2:
        currentField = isSize.country
        break
      case 3:
        currentField = isSize.sizeVarient[0].size
        break
      case 4:
        currentField = isColor
        break
      default:
        currentField = 'any'
    }
    shake()

    if (currentField === '') {
      // setError('Please fill in the current field before proceeding.');
      setWarning('Please select current field before proceeding.')
      setSteps(isSteps)
    } else {
      // Clear any previous error and move to the next step
      setSteps(isSteps + 1)

      if (isSteps === 2) {
        setDropDown(true)
      } else {
        setDropDown(false)
      }
      setOpenDesign(false)
      setDone(false)
      slideValue.value = withSequence(
        withTiming(1, { duration: 400 }), // Slide out
        withTiming(0, { duration: 400 }), // Slide back to original state
      )
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setWarning('') // Set the state to null after 5 seconds
    }, 2000)
  }, [warning])

  const isShowToolTip = async () => {
    const data = await AsyncStorage.getItem('showMidLevelToolTip')

    if (data !== '0') {
      AsyncStorage.setItem('showMidLevelToolTip', '0')
      showToolTip(true)
    }
    // await AsyncStorage.removeItem('mail')
  }

  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const handleSetUid = useCallback(async () => {
    if (midlevelData.uid) return
    if (!isMounted.current) {
      try {
        isMounted.current = true
        const tempUid = uuid.v4().toString()
        const docRef = doc(db, 'ModelsMidlevel', tempUid)
        await setDoc(docRef, { uid: tempUid, skin: avatar?.skinTone, gender: avatar?.gender })

        setUid(tempUid)
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  // const handleUpdateUid = useCallback(async () => {
  // try {
  //   if (isSteps === 5) {
  //     const tempUid = uuid.v4().toString()
  //     const docRef = doc(db, 'ModelsMidlevel', tempUid)
  //     await setDoc(docRef, {
  //       uid: tempUid,
  //       skin: avatar?.skinTone,
  //       gender: avatar?.gender,
  //       color: isColor,
  //       size: isSize.sizeVarient[0].size,
  //     })
  //     setUid(tempUid)
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
  // }, [isSteps])

  const handleUpdateColor = useCallback(async () => {
    if (!isColor || !uid) return
    try {
      const docRef = doc(db, 'ModelsMidlevel', uid)
      await updateDoc(docRef, { color: isColor })
    } catch (error) {
      console.log(error)
    }
  }, [isColor])

  useEffect(() => {
    handleSetUid()
    handleUpdateColor()
  }, [handleSetUid, handleUpdateColor])

  useEffect(() => {
    const Filtereddata = data?.find(
      (f) =>
        f.styles.toLowerCase() === isSelectedStyle.toLowerCase() &&
        f.gender.toLowerCase() === avatar.gender?.toLowerCase(),
    )
    setFilteredData(Filtereddata)
    // if (
    //   Filtereddata?.gender.toLowerCase() !== avatar?.gender?.toLowerCase() &&
    //   isSelectedStyle !== ''
    // ) {
    //   // Alert.alert(`Alert ${avatar?.gender}`, 'Not Available', [
    //   //   {
    //   //     text: 'Cancel',
    //   //     onPress: () => {
    //   //       setSteps(1)
    //   //     },
    //   //     style: 'cancel',
    //   //   },
    //   //   {
    //   //     text: 'OK',
    //   //     onPress: () => {
    //   //       setSteps(1)
    //   //     },
    //   //   },
    //   // ])
    //   setOpenModal(true)
    // }
  }, [isSelectedStyle, data, avatar])

  useEffect(() => {
    const Designs = designs?.filter((f) => f.type === isImageOrText.title)
    setDesign(Designs)
  }, [isImageOrText, designs])

  const getData = useCallback(async () => {
    const ProductRef = await getDocs(collection(db, 'Products'))
    const fetchProduct = ProductRef.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    const data = fetchProduct.filter((f) => f.type === 'MIDLEVEL-PRODUCTS')
    setData(data)
    const DesignRef = await getDocs(collection(db, 'Designimages'))
    const fetchDesign = DesignRef.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }))
    setDesigns(fetchDesign)
  }, [db])

  useEffect(() => {
    getData()
  }, [getData])

  const handleSubmit = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    if (!FilteredData) return

    if (!user) {
      setLogin(true)
    }
    if (user && !phoneNumber) {
      setSignUp(true)
    }
    if (user && phoneNumber) {
      setOpenCheckout(true)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {!openCheckout && (
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <Navigation
            warning={warning}
            setImageOrText={setImageOrText}
            steps={isSteps}
            isDone={isDone}
            isColor={isColor}
            setDone={setDone}
            dropDown={isDropDown}
            slideValue={slideValue}
            country={isSize.country}
            setDropDown={setDropDown}
            isOpenDesign={isOpenDesign}
            setOpenDesign={setOpenDesign}
            sizeVarient={isSize.sizeVarient[0]}
            isSelectedStyle={isSelectedStyle}
            handleDecreaseSteps={handleDecreaseSteps}
            handleIncreaseSteps={handleIncreaseSteps}
            setImageApplied={setImageApplied}
            animationUpdated={animationUpdated}
            shake={shake}
            shakeAnimation={shakeAnimation}
          />

          <View style={{ zIndex: 3, width: width, position: 'absolute', top: 0, flex: 1 }}>
            {isSteps === 1 && data && isDropDown && (
              <SelectStyle
                data={data}
                setDropDown={setDropDown}
                isSelectedStyle={isSelectedStyle}
                setSelectedStyle={setSelectedStyle}
              />
            )}
            {isSteps === 2 && isDropDown && FilteredData && (
              <SelectCountry
                data={FilteredData}
                isSize={isSize}
                setSize={setSize}
                handleIncreaseSteps={handleIncreaseSteps}
                setDropDown={setDropDown}
              />
            )}
            {isSteps === 3 && isDropDown && FilteredData && (
              <SelectSize
                data={FilteredData}
                isDropDown={isDropDown}
                isSize={isSize}
                setSize={setSize}
                handleIncreaseSteps={handleIncreaseSteps}
                setDropDown={setDropDown}
              />
            )}
            {isSteps === 4 && isDropDown && FilteredData && (
              <SelectColor
                data={FilteredData}
                isColor={isColor}
                isDropDown={isDropDown}
                setDropDown={setDropDown}
                setColor={setColor}
                setColorName={setColorName}
                isColorName={isColorName}
              />
            )}
            {isSteps === 6 && isDropDown && FilteredData && (
              <AddImageOrText
                data={FilteredData}
                isDropDown={isDropDown}
                setDropDown={setDropDown}
                isImageOrText={isImageOrText}
                setImageOrText={setImageOrText}
                setOpenDesign={setOpenDesign}
              />
            )}
          </View>

          {isSteps === 5 ? (
            <FlowTwo
              color={isColor}
              isImageOrText={tempIsImageOrText}
              designs={designs}
              imageApplied={imageApplied}
            />
          ) : isSteps === 6 ? (
            <FlowThree color={isColor} isImageOrText={isImageOrText} designs={designs} />
          ) : (
            <FlowOne uid={uid} steps={isSteps} />
          )}

          {isSteps === 5 && FilteredData && (
            <FinalView
              color={isColor}
              colorName={isColorName}
              data={FilteredData}
              focus={focus}
              handleSubmit={handleSubmit}
              isSize={isSize}
              setFocus={setFocus}
              setSize={setSize}
              style={isSelectedStyle}
              isImageOrText={isImageOrText}
            />
          )}
          {isSteps === 6 && Design && isOpenDesign && !isDone && (
            <SelectDesign
              color={isColor}
              isImageOrText={isImageOrText}
              designs={Design}
              setOpenDesign={setOpenDesign}
              isDone={isDone}
              setDone={setDone}
              setImageOrText={setImageOrText}
            />
          )}
          {login && (
            <LoginModal
              onForgotClick={() => {
                setForgotmail(true), setLogin(false)
              }}
              onSignClick={() => {
                setSignUp(true), setLogin(false)
              }}
              onClose={() => setLogin(false)}
            />
          )}

          {signUp && (
            <SignupModal
              onLoginClick={() => {
                setLogin(true), setSignUp(false)
              }}
              onClose={() => setSignUp(false)}
            />
          )}
          {forgotMail && (
            <ForgotMail
              onLoginClick={() => {
                setLogin(true), setForgotmail(false)
              }}
              onClose={() => setForgotmail(false)}
            />
          )}
          {openModal && <AlertModal />}
        </View>
      )}
      {openCheckout && FilteredData && (
        // <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        <Checkout
          setOpenCheckout={setOpenCheckout}
          color={isColor}
          textAndImage={isImageOrText}
          description={FilteredData?.description}
          gender={avatar.gender as string}
          offerPrice={FilteredData?.offerPrice}
          price={FilteredData?.normalPrice}
          productImage={FilteredData?.productImage}
          productName={FilteredData?.productName}
          size={{ country: isSize.country, sizeVarient: isSize.sizeVarient[0] }}
          style={isSelectedStyle}
          id={FilteredData?.id}
          type='MidLevel'
        />
      )}
      <MidLevelTooltip
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
    </View>
  )
}

export default Medium
