import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const TooltipTopArrowIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path fill='#fff' d='m13 0 13 15v31H0V15L13 0Z' />
  </Svg>
)
export default TooltipTopArrowIcon
