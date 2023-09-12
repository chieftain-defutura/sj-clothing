import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const ChevronLeft = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path stroke='#462D85' strokeLinecap='round' strokeLinejoin='round' d='m6 12.5 4-4-4-4' />
  </Svg>
)
export default ChevronLeft
