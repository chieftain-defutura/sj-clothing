import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CameraIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.166 15.833A1.667 1.667 0 0 1 17.5 17.5h-15a1.667 1.667 0 0 1-1.667-1.667V6.667A1.667 1.667 0 0 1 2.5 5h3.333L7.5 2.5h5L14.166 5H17.5a1.667 1.667 0 0 1 1.666 1.667v9.166Z'
    />
    <Path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10 14.167A3.333 3.333 0 1 0 10 7.5a3.333 3.333 0 0 0 0 6.667Z'
    />
  </Svg>
)
export default CameraIcon
