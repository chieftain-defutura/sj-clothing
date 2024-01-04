import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const AddressDeleteIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#DB00FF'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M2.5 5h15M15.834 5v11.667a1.666 1.666 0 0 1-1.667 1.666H5.834a1.667 1.667 0 0 1-1.667-1.666V5m2.5 0V3.333a1.667 1.667 0 0 1 1.667-1.666h3.333a1.667 1.667 0 0 1 1.667 1.666V5M8.333 9.167v5M11.667 9.167v5'
    />
  </Svg>
)
export default AddressDeleteIcon
