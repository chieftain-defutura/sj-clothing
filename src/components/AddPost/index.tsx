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
import Navigation from './Navigation'
import SelectSize from './Selectsize'
import { db, dbDefault } from '../../../firebase'
import SelectStyle from './SelectStyle'
import SelectColor from './SelectColor'
import SelectCountry from './SelectCountry'
import AddImageOrText from './AddImageOrText'
import { userStore } from '../../store/userStore'
import LoginModal from '../../screens/Modals/Login'
import SignupModal from '../../screens/Modals/Signup'
import ForgotMail from '../../screens/Modals/ForgotMail'
import { IDesigns, IMidlevel, IUserPost } from '../../constant/types'
import AlertModal from '../../screens/Modals/AlertModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Haptics from 'expo-haptics'
import { LinearGradient } from 'expo-linear-gradient'
import { Audio } from 'expo-av'
import FlowOne from './MidlevelWebView/FlowOne'
import FlowThree from './MidlevelWebView/FlowThree'
import { gradientOpacityColors } from '../../styles/theme'
import FinalProduct from './FinalProduct'
import ProductAndCaption from './ProductAndCaption'
import { PostStore } from '../../store/postCreationStore'
import UploadDesign from './UploadDesign'

const { width } = Dimensions.get('window')
interface IAddPost {
  editData?: IUserPost
  setOpenPost?: React.Dispatch<React.SetStateAction<boolean>>
  openPost?: boolean
}
const AddPost: React.FC<IAddPost> = ({ editData, openPost, setOpenPost }) => {
  const isMounted = useRef(false)
  const slideValue = useSharedValue(0)
  const user = userStore((state) => state.user)
  const avatar = userStore((state) => state.avatar)
  const PostData = PostStore((state) => state.post)
  const phoneNumber = userStore((state) => state.phoneNo)
  const updatePostData = PostStore((state) => state.updatepost)

  const [isSteps, setSteps] = useState(
    editData?.id ? 1 : PostData.isSteps === '5' ? Number(PostData.isSteps) - 1 : 1,
  )
  const [isDropDown, setDropDown] = useState(false)
  const [uid, setUid] = useState<string>(PostData.isSteps === '5' ? PostData.uid : '')
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
    editData?.style ? editData.style : PostData.isSteps === '5' ? PostData.isSelectedStyle : '',
  )
  const [warning, setWarning] = useState('')

  //size
  const [isSize, setSize] = useState(
    editData?.sizes
      ? {
          country: editData.sizes.country,
          sizeVarient: [
            {
              size: editData.sizes.sizeVarient.size,
              measurement: editData.sizes.sizeVarient.measurement.toString(),
              quantity: editData.sizes.sizeVarient.quantity,
            },
          ],
        }
      : PostData.isSteps === '5'
      ? PostData.isSize
      : {
          country: '',
          sizeVarient: [{ size: '', measurement: '', quantity: '' }],
        },
  )

  //color
  const [isColor, setColor] = useState(
    editData?.color ? editData.color : PostData.isSteps === '5' ? PostData.isColor : '',
  )
  const [isColorName, setColorName] = useState(
    editData?.colorName ? editData.colorName : PostData.isSteps === '5' ? PostData.isColorName : '',
  )

  //image&text
  const [isOpenDesign, setOpenDesign] = useState(false)
  const [isDone, setDone] = useState(false)
  const [imageApplied, setImageApplied] = useState(false)

  const [isImageOrText, setImageOrText] = useState(
    PostData.isSteps === '5'
      ? PostData.isImageOrText
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
  const [tempIsImageOrText, setTempImageOrText] = useState(
    editData?.textAndImage
      ? editData.textAndImage
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
  const [openCheckout, setOpenCheckout] = useState(false)
  const [animationUpdated, setAnimationUpdated] = useState(false)
  const [colorAnimationUpdated, setColorAnimationUpdated] = useState(false)

  const shakeAnimation = useRef(new Animated.Value(0)).current

  //FinalProduct

  const [isGiftVideo, setGiftVideo] = useState<any>(editData?.giftVideo ? editData.giftVideo : null)
  const [product, setProduct] = useState(editData?.product ? editData.product : '')
  const [caption, setCaption] = useState(editData?.caption ? editData.caption : '')

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
          setAnimationUpdated(doc.data()['animationFinished'])
          // playSound()
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

  const handleGetColorAnimation = useCallback(() => {
    if (!uid) return
    const q = defaultQuery(
      defualtCollection(dbDefault, 'ModelsMidlevel'),
      defaultWhere('uid', '==', uid),
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data()['colorAnimationFinished']) {
          setColorAnimationUpdated(doc.data()['colorAnimationFinished'])
          // playSound()
        }
      })
    })

    return () => {
      unsubscribe()
    }
  }, [uid])

  useEffect(() => {
    handleGetColorAnimation()
  }, [handleGetColorAnimation])

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
        caption: caption,
        product: product,
        uid: uid,
      }
      AsyncStorage.setItem('post-steps', JSON.stringify(data))
      updatePostData(data)
    }
    if (isSteps !== 5) {
      AsyncStorage.removeItem('post-steps')
      const data = {
        isSteps: isSteps.toString(),
        isSelectedStyle: isSelectedStyle,
        isSize: isSize,
        isColor: isColor,
        isColorName: isColorName,
        isImageOrText: isImageOrText,
        tempIsImageOrText: tempIsImageOrText,
        caption: caption,
        product: product,
        uid: uid,
      }
      updatePostData(data)
    }
  }, [isSteps])

  useEffect(() => {
    if (PostData.isSteps === '5') {
      if (PostData.isImageOrText.designs.originalImage) {
        setTempImageOrText(PostData.isImageOrText)
      }
    }
  }, [PostData])

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

  const handleSetUid = useCallback(async () => {
    if (PostData.uid) return
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
      <LinearGradient colors={gradientOpacityColors} style={{ flex: 1 }}>
        {!openCheckout && (
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              justifyContent: 'space-between',
              zIndex: 1,
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
              colorAnimationUpdate={colorAnimationUpdated}
              shake={shake}
              openPost={openPost as boolean}
              setOpenPost={setOpenPost as React.Dispatch<React.SetStateAction<boolean>>}
              shakeAnimation={shakeAnimation}
            />

            <View style={{ zIndex: 100, width: width, position: 'absolute', top: 0, flex: 1 }}>
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

            <View
              style={{
                flex: isSteps === 5 ? 9 : 1,
                zIndex: -100,
                position: isSteps === 5 ? 'relative' : 'absolute',
                top: 0,
              }}
            >
              {isSteps === 6 && (
                <FlowThree
                  color={isColor}
                  isImageOrText={isImageOrText}
                  designs={designs}
                  animationUpdated={animationUpdated}
                  shake={shake}
                  shakeAnimation={shakeAnimation}
                  setAnimationUpdated={setAnimationUpdated}
                />
              )}
              {isSteps !== 5 && isSteps !== 6 && (
                <FlowOne
                  uid={uid}
                  steps={isSteps}
                  setUid={setUid}
                  color={isColor}
                  setAnimationUpdated={setAnimationUpdated}
                  animationUpdated={animationUpdated}
                  shake={shake}
                  shakeAnimation={shakeAnimation}
                />
              )}
            </View>
            {isSteps === 5 && FilteredData && (
              <FinalProduct
                isGiftVideo={isGiftVideo}
                setGiftVideo={setGiftVideo}
                handleSubmit={handleSubmit}
                color={isColor}
                colorName={isColorName}
                data={FilteredData}
                isImageOrText={tempIsImageOrText}
                isSize={isSize}
                style={isSelectedStyle}
              />
            )}
            {isSteps === 6 && Design && isOpenDesign && !isDone && (
              <UploadDesign
                isImageOrText={isImageOrText}
                setImageOrText={setImageOrText}
                setDone={setDone}
                color={isColor}
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
                setOpenCheckout={setOpenCheckout}
              />
            )}

            {signUp && (
              <SignupModal
                onLoginClick={() => {
                  setLogin(true), setSignUp(false)
                }}
                onClose={() => setSignUp(false)}
                setOpenCheckout={setOpenCheckout}
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
            {openModal && (
              <AlertModal
                children={`Hi ${user?.displayName}, Are you sure you want to delete your account?`}
                close={() => setOpenModal(false)}
              />
            )}
          </View>
        )}
        {openCheckout && FilteredData && (
          <ProductAndCaption
            caption={caption}
            product={product}
            setCaption={setCaption}
            setProduct={setProduct}
            setOpenCheckout={setOpenCheckout}
            color={isColor}
            isGiftVideo={isGiftVideo}
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
            editId={editData?.id}
            setOpenPost={setOpenPost as React.Dispatch<React.SetStateAction<boolean>>}
          />
        )}
      </LinearGradient>
    </View>
  )
}

export default AddPost
