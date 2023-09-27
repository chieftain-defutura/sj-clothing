import React, { useState } from 'react'
import SelectStyle from './SelectStyle'
import styled from 'styled-components/native'
import SelectColor from './SelectColor'
import AddImage from './AddImage'
import AddText from './AddText'
import FinalProduct from './FinalProduct'
import ProductAndCaption from './ProductAndCaption'
import Animated, { withSpring, SharedTransition } from 'react-native-reanimated'

interface IPostCreation {
  navigation: any
}
const PostCreation: React.FC<IPostCreation> = ({ navigation }) => {
  const [isPostCreationSteps, setPostCreationSteps] = useState(0)
  const transition = SharedTransition.custom((values) => {
    'worklet'
    return {
      width: withSpring(values.targetWidth),
      height: withSpring(values.targetHeight),
      originX: withSpring(values.targetOriginX),
      originY: withSpring(values.targetOriginY),
    }
  })
  return (
    <Animated.View sharedTransitionTag='tag' sharedTransitionStyle={transition} style={{ flex: 1 }}>
      {isPostCreationSteps === 0 && (
        <SelectStyle navigation={navigation} setPostCreationSteps={setPostCreationSteps} />
      )}
      {isPostCreationSteps === 1 && (
        <SelectColor navigation={navigation} setPostCreationSteps={setPostCreationSteps} />
      )}
      {isPostCreationSteps === 2 && (
        <AddImage navigation={navigation} setPostCreationSteps={setPostCreationSteps} />
      )}
      {isPostCreationSteps === 3 && (
        <AddText navigation={navigation} setPostCreationSteps={setPostCreationSteps} />
      )}
      {isPostCreationSteps === 4 && (
        <ProductAndCaption navigation={navigation} setPostCreationSteps={setPostCreationSteps} />
      )}
      {isPostCreationSteps === 5 && (
        <FinalProduct navigation={navigation} setPostCreationSteps={setPostCreationSteps} />
      )}
    </Animated.View>
  )
}

export default PostCreation

const PostCreationContainer = styled.View`
  flex: 1;
`
