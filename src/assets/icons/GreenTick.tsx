import * as React from 'react'
import Svg, { SvgProps, G, Circle, Path, Defs, ClipPath } from 'react-native-svg'
const GreenTick = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Circle cx={50} cy={50} r={50} fill='#8C73CB' />
      <Path
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={8}
        d='M77.12 31.88 40.453 68.547 23.786 51.88'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h200v200H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default GreenTick
