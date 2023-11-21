import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS } from '../../../styles/theme'
import CustomButton from '../../Button'
import { useTranslation } from 'react-i18next'
import WebView from 'react-native-webview'
import { userStore } from '../../../store/userStore'

interface IGender {}

const { width, height } = Dimensions.get('window')

const GenderData = [
  { gender: 'male', image: require('../../../assets/logo/boyImage.png') },
  { gender: 'female', image: require('../../../assets/logo/girlImage.png') },
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
  const { updateAvatar, avatar } = userStore()
  const [pageY, setPageY] = useState<number | null>(null)
  const [elementHeight, setElementHeight] = useState<number | null>(null)
  const elementRef = useRef<View | null>(null)

  const handleLayout = () => {
    if (elementRef.current) {
      elementRef.current.measure((x, y, width, height, pageX, pageY) => {
        setPageY(pageY)
        setElementHeight(height)
      })
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
      <TouchableOpacity
        onPress={() => updateAvatar({ gender: gender.gender as string, skinTone: '' })}
        style={styles.genderButton}
      >
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* <Image source={gender.image} style={{ width: width / 1.8, height: height / 4.3 }} /> */}
          <View
            style={{
              // width: width / 1.3,
              // height: height / 4,
              borderColor: avatar.gender === gender.gender ? COLORS.textSecondaryClr : '#FFF',
              borderWidth: 1,
              borderRadius: 30,
              backgroundColor: 'transparent',
              overflow: 'hidden',
            }}
            ref={elementRef}
            onLayout={handleLayout}
          >
            <Image source={gender.image} style={{ width: width / 1.5, height: height / 4.1 }} />
            {/* {pageY && elementHeight && (
              <WebView
                style={{
                  backgroundColor: 'transparent',
                }}
                source={{
                  uri: `${gender.image}?pageY=${pageY}&h=${height}&elh=${elementHeight}`,
                }}
              /> */}
          </View>
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  avatar.gender === gender.gender ? COLORS.textSecondaryClr : COLORS.textRGBAClr,
              },
            ]}
          >
            {t(gender.gender)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    // <View style={styles.genderContainer}>
    //   <Text style={styles.bottomTitle}>1.{t('select your gender')}.</Text>

    //   <View style={styles.bottomWrapper}>
    //     <View style={styles.genderButtonWrapper}>
    //       {GenderData.map((gender, index) => (
    //         <View
    //           key={index}
    //           style={{
    //             width: width / 1.2,
    //             height: height / 3.8,
    //             borderColor: avatar.gender === gender.gender ? COLORS.textSecondaryClr : '#FFF',
    //             borderWidth: 1,
    //             borderRadius: 30,
    //             marginVertical: 14,
    //           }}
    //         >
    //           <TouchableOpacity
    //             onPress={() => updateAvatar({ gender: gender.gender as string, skinTone: '' })}
    //             style={styles.genderButton}
    //           >
    //             <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //               <Image
    //                 source={gender.image}
    //                 style={{ width: width / 1.8, height: height / 4.3 }}
    //               />
    //               <Text
    //                 style={[
    //                   styles.buttonText,
    //                   {
    //                     color:
    //                       avatar.gender === gender.gender
    //                         ? COLORS.textSecondaryClr
    //                         : COLORS.textRGBAClr,
    //                   },
    //                 ]}
    //               >
    //                 {t(gender.gender)}
    //               </Text>
    //             </View>
    //           </TouchableOpacity>
    //         </View>
    //       ))}
    //     </View>
    //   </View>
    // </View>
  )
}

const Gender: React.FC<IGender> = ({}) => {
  const { t } = useTranslation('avatar')

  return (
    <View style={styles.genderContainer}>
      <Text style={styles.bottomTitle}>{t('select your gender')}</Text>

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
