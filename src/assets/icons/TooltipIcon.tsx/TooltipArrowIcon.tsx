import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const TooltipIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path fill='#fff' d='m13 46 13-15V0H0v31l13 15Z' />
  </Svg>
)

export default TooltipIcon
