import React, { useEffect, useState } from 'react'
import { Text, Animated, StyleSheet } from 'react-native'

interface IFloatingEmoji {
  emoji: any
}

const FloatingEmoji: React.FC<IFloatingEmoji> = ({ emoji }) => {
  const [position] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(position, {
      toValue: -100,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }, [position])

  return (
    <Animated.View style={[styles.floatingEmoji, { transform: [{ translateY: position }] }]}>
      <Text>{emoji}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  floatingEmoji: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -25 }], // Center the emoji horizontally
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
})

export default FloatingEmoji
