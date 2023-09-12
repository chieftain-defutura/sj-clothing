import * as React from 'react'
import Svg, { SvgProps, Path, Circle } from 'react-native-svg'

const OrderGroup = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path stroke='#E5CEF5' strokeDasharray='2 2' d='m13.5 0 .009 203' />
    <Circle cx={12.5} cy={190.5} r={12} fill='#FFEFFF' stroke='#DB00FF' />
    <Circle cx={12.5} cy={101.5} r={12} fill='#FFEFFF' stroke='#DB00FF' />
    <Circle cx={12.5} cy={12.5} r={12} fill='#FFEFFF' stroke='#DB00FF' />
    <Circle cx={12.5} cy={12.5} r={7.5} fill='#DB00FF' />
  </Svg>
)
export default OrderGroup
