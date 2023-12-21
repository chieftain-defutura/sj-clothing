import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

const InfoIcon = (props: SvgProps) => (
  <Svg
    fill='none'
    stroke='red'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d='M12 16v-4M12 8h.01' />
  </Svg>
)
export default InfoIcon
