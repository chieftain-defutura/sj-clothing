import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const RightIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.167 10h11.666M10 4.167 15.833 10 10 15.833'
    />
  </Svg>
)
export default RightIcon
