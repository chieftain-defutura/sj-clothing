import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../../../styles/theme'
import { useTranslation } from 'react-i18next'
import { userStore } from '../../../store/userStore'
import { updateDoc, doc } from 'firebase/firestore/lite'
import { db } from '../../../../firebase'
import SelectYourGender from '../../Tooltips/MidLevel/SelectYourGender'

interface IGender {}

const { width, height } = Dimensions.get('window')

const GenderData = [
  { gender: 'male', image: require('../../../assets/images/male.png') },
  { gender: 'female', image: require('../../../assets/images/female.png') },
]

const GenderModel = ({
  gender,
}: {
  gender: {
    gender: string
    image: string
  }
}) => {
  const { t } = useTranslation('avatar')
  const avatar = userStore((state) => state.avatar)
  const user = userStore((state) => state.user)
  const updateAvatar = userStore((state) => state.updateAvatar)
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const [toolTip, showToolTip] = useState(false)
  const elementRef = useRef<View | null>(null)

  const isShowToolTip = async () => {
    try {
      const data = await AsyncStorage.getItem('showSelectYourGender')

      if (data !== '4') {
        AsyncStorage.setItem('showSelectYourGender', '4')
        showToolTip(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isShowToolTip()
  }, [isShowToolTip])

  const handleLayout = () => {
    if (elementRef.current) {
      elementRef.current.measure((height, pageY) => {
        setPageY(pageY)
        setElementHeight(height)
      })
    }
  }

  const handleSubmit = async () => {
    if (user) {
      updateAvatar({ gender: gender.gender, skinTone: '3' })
      await updateDoc(doc(db, 'users', user.uid), {
        avatar: {
          gender: gender.gender,
          skinTone: '3',
        },
      })
    }
    if (!user) {
      updateAvatar({ gender: gender.gender, skinTone: '3' })
    }
  }

  return (
    <View
      style={{
        width: width / 1.2,
        height: height / 3.8,
        marginVertical: 14,
      }}
    >
      <TouchableOpacity onPress={handleSubmit} style={styles.genderButton}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              borderColor: avatar?.gender === gender?.gender ? COLORS.textSecondaryClr : '#FFF',
              borderWidth: 1,
              borderRadius: 30,
              backgroundColor: 'transparent',
              overflow: 'hidden',
            }}
            ref={elementRef}
            onLayout={handleLayout}
          >
            <Image
              source={gender.image}
              style={{ width: width / 1.3, height: height / 4.1, objectFit: 'contain' }}
              alt='gender'
            />
          </View>
          <Text
            allowFontScaling={false}
            style={[
              styles.buttonText,
              {
                color:
                  avatar?.gender === gender.gender ? COLORS.textSecondaryClr : COLORS.textRGBAClr,
              },
            ]}
          >
            {t(gender.gender)}
          </Text>
        </View>
      </TouchableOpacity>
      <SelectYourGender
        isVisible={toolTip}
        onClose={() => {
          showToolTip(false)
        }}
      />
    </View>
  )
}

const Gender: React.FC<IGender> = ({}) => {
  const { t } = useTranslation('avatar')

  return (
    <View style={styles.genderContainer}>
      <Text allowFontScaling={false} style={styles.bottomTitle}>
        {t('select your gender')}
      </Text>
      <View style={styles.bottomWrapper}>
        <View style={styles.genderButtonWrapper}>
          {GenderData.map((gender, index) => (
            <GenderModel key={index.toString()} gender={gender} />
          ))}
        </View>
      </View>
    </View>
  )
}

export default Gender

const styles = StyleSheet.create({
  genderContainer: {
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  bottomWrapper: {
    // padding: 24,
  },
  bottomTitle: {
    color: COLORS.textClr,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Arvo-Regular',
    textTransform: 'uppercase',
  },
  genderButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Arvo-Regular',
    marginTop: 8,
    fontSize: 16,
  },
})
