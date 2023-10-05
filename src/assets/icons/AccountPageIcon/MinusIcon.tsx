import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const MinusIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path stroke='#000' strokeLinecap='round' strokeLinejoin='round' d='M2.917 7h8.167' />
  </Svg>
)
export default MinusIcon
