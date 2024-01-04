import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const AddressEditIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#DB00FF'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M11.59 1.585a1.996 1.996 0 1 1 2.825 2.824l-9.532 9.532L1 15l1.06-3.883 9.53-9.532Z'
    />
  </Svg>
)
export default AddressEditIcon
