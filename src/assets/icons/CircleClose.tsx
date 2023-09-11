import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const CircleClose = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G fill='#D0342C' clipPath='url(#a)'>
      <Path d='M13.334 6.667a.833.833 0 0 0-1.179 0L10 8.822 7.845 6.667a.833.833 0 0 0-1.178 1.178L8.822 10l-2.155 2.155a.833.833 0 0 0 1.178 1.178L10 11.178l2.155 2.155a.833.833 0 0 0 1.179-1.178L11.179 10l2.155-2.155a.833.833 0 0 0 0-1.178Z' />
      <Path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18.333A8.333 8.333 0 1 1 18.333 10 8.342 8.342 0 0 1 10 18.333Z' />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CircleClose
