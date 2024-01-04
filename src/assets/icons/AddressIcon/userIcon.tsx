import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const AddressUserIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M13.868 14.024V12.69a2.666 2.666 0 0 0-2.667-2.667H5.868A2.667 2.667 0 0 0 3.2 12.69v1.333M8.534 7.357a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Z'
    />
  </Svg>
)
export default AddressUserIcon
