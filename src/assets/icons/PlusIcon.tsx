import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const Plus = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#DB00FF'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8 3.333v9.334M3.333 8h9.333'
    />
  </Svg>
)
export default Plus
