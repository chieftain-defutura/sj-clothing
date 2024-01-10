import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FloatingEmoji from './FloatingEmoji'

const Emoji = () => {
  const [emojiToShow, setEmojiToShow] = React.useState(null)

  const handleEmojiClick = (emoji: any) => {
    setEmojiToShow(emoji)
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => handleEmojiClick('🏏')}>
        <Text>Click me to show emoji</Text>
      </TouchableOpacity>

      {emojiToShow && <FloatingEmoji emoji={emojiToShow} />}
    </View>
  )
}

export default Emoji
