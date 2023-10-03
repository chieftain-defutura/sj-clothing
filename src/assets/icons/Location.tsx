import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const LocationIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M14 6.667c0 4.666-6 8.666-6 8.666s-6-4-6-8.666a6 6 0 1 1 12 0Z'
    />
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8 8.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'
    />
  </Svg>
)
export default LocationIcon
