import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import Slider from 'react-native-slider'

const MultiColorRangeSlider = () => {
  const [sliderValue, setSliderValue] = useState([25, 75])

  const handleSliderChange = (values: React.SetStateAction<number[]>) => {
    setSliderValue(values)
  }
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        values={sliderValue}
        min={0}
        max={100}
        step={1}
        thumbTintColor='blue'
        minimumTrackTintColor='blue'
        maximumTrackTintColor='lightblue'
        onValuesChange={handleSliderChange}
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
  slider: {
    width: 300,
  },
})

export default MultiColorRangeSlider
