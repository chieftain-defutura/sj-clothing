import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const HomeIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m2 6 6-4.667L14 6v7.333a1.333 1.333 0 0 1-1.333 1.334H3.333A1.333 1.333 0 0 1 2 13.333V6Z'
    />
    <Path stroke='#462D85' strokeLinecap='round' strokeLinejoin='round' d='M6 14.667V8h4v6.667' />
  </Svg>
)
export default HomeIcon
