import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const WifiIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={4}
      clipPath='url(#a)'
    >
      <Path d='m2.667 2.667 58.667 58.666M44.587 29.493a29.173 29.173 0 0 1 6.08 3.974M13.333 33.467a29.174 29.174 0 0 1 13.787-6.374M28.56 13.467A42.667 42.667 0 0 1 60.213 24M3.787 24c3.7-3.27 7.94-5.869 12.533-7.68M22.747 42.96a16 16 0 0 1 18.533 0M32 53.333h.027' />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h64v64H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default WifiIcon
