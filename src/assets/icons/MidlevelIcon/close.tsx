import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const TooltipCloseIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path stroke='#fff' strokeLinecap='round' strokeLinejoin='round' d='m12 4-8 8M4 4l8 8' />
  </Svg>
)
export default TooltipCloseIcon
