import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const TickIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M13.334 4 6 11.333 2.667 8'
    />
  </Svg>
)
export default TickIcon
