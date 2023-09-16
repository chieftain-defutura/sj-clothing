import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CloseRedIcon = (props: SvgProps) => (
  <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <Path d='M18 6L6 18' stroke='#D0342C' stroke-linecap='round' stroke-linejoin='round' />
    <Path d='M6 6L18 18' stroke='#D0342C' stroke-linecap='round' stroke-linejoin='round' />
  </Svg>
)
export default CloseRedIcon
