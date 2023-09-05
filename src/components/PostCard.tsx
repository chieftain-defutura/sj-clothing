import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from 'react-native'
import { COLORS } from '../styles/theme'
import Logo from '../assets/icons/Logo'
import Like from '../assets/icons/like'
import EyeIcon from '../assets/icons/EyeIcon'
import Fire from '../assets/icons/fire'
import Heart from '../assets/icons/heart'
import LoginModal from '../screens/Login'

interface componentNameProps {}

const onLikePressed = () => {}

const PostCard = (props: componentNameProps) => {
  const [isLoginModalVisible, setLoginModalVisible] = React.useState(false)

  const openLoginModal = () => {
    setLoginModalVisible(true)
  }

  const closeLoginModal = () => {
    setLoginModalVisible(false)
  }
  return (
    <View style={styles.postCard}>
      <View style={styles.imageContent}>
        <TouchableOpacity onPress={openLoginModal}>
          <Image style={styles.tShirtImg} source={require('../assets/images/t-shirt.png')} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            paddingLeft: 16,
            bottom: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
          }}
        >
          <Pressable onPress={onLikePressed}>
            <Like height={20} width={20} />
          </Pressable>

          <Pressable onPress={onLikePressed}>
            <Fire height={20} width={20} />
          </Pressable>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
            }}
          >
            <Pressable onPress={onLikePressed}>
              <Heart height={20} width={20} />
            </Pressable>
            <Text
              style={{
                color: 'white',
                alignItems: 'center',
                fontFamily: 'Gilroy',
                fontStyle: 'normal',
                fontSize: 14,
              }}
            >
              10.01k
            </Text>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 25,
            bottom: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
          }}
        >
          <Pressable onPress={onLikePressed}>
            <EyeIcon height={20} width={20} />
          </Pressable>
          <Text
            style={{
              color: 'white',
              alignItems: 'center',
              fontFamily: 'Gilroy',
              fontStyle: 'normal',
              fontSize: 14,
            }}
          >
            10.01k
          </Text>
        </View>
      </View>

      <View style={styles.postCardContent}>
        <Text style={styles.text}>ttttttt</Text>
      </View>

      <LoginModal isVisible={isLoginModalVisible} onClose={closeLoginModal} />
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
  text: {
    color: COLORS.textClr,
    fontSize: 16,
  },

  imageContent: {
    backgroundColor: '#FFBBE9',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tShirtImg: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    width: 300,
    height: 300,
    flexShrink: 0,
    marginVertical: 30,
    marginHorizontal: 14,
  },
  postCard: {
    backgroundColor: 'transparent',
    margin: 20,
  },
  postCardContent: {
    width: 'auto',
    backgroundColor: 'white',
    padding: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
})
