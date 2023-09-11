import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const LeftArrow = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m15 18-6-6 6-6'
    />
  </Svg>
)
export default LeftArrow
