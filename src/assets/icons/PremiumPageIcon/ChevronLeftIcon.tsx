import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const ChevronLeft = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path fill='#462D85' d='m5 7.5 5 5 5-5' />
  </Svg>
)
export default ChevronLeft
