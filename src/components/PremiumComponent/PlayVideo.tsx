import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Video } from 'expo-av'

const { width, height } = Dimensions.get('window')

const PlayVideo: React.FC = () => {
  const videoRef = useRef<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.isPlaying && !status.isBuffering) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }

    if (!status.isPlaying && status.isLoaded) {
      // Video has ended
      // You can implement logic here, like replaying the video
    }
  }

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.playAsync()
    } else {
      videoRef.current?.pauseAsync()
    }
  }, [isPlaying])

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../assets/video/shirt-video.mp4')}
        style={styles.video}
        useNativeControls
        isLooping
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
})

export default PlayVideo
