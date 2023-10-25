import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const DownArrow = (props: SvgProps) => (
  <Svg width='10' height='6' viewBox='0 0 10 6' fill='none'>
    <Path d='M1 1L5 5L9 1' stroke='#462D85' stroke-linecap='round' stroke-linejoin='round' />
  </Svg>
)
export default DownArrow
