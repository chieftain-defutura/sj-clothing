import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const PlusIcon = (props: SvgProps) => (
  <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <Path
      d='M12 5V19'
      stroke='#462D85'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <Path
      d='M5 12H19'
      stroke='#462D85'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </Svg>
)
export default PlusIcon
