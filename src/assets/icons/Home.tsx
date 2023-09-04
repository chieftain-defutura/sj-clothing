import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={20} fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#fff'
        fillOpacity={0.4}
        d='M11.115.694a1.667 1.667 0 0 0-2.23 0L0 8.691v8.667a2.667 2.667 0 0 0 2.667 2.666h14.666A2.667 2.667 0 0 0 20 17.358V8.69L11.115.694ZM12.5 18.355h-5v-4.188a2.5 2.5 0 1 1 5 0v4.188Zm5.833-1a1 1 0 0 1-1 1h-3.166v-4.188a4.167 4.167 0 1 0-8.334 0v4.188H2.667a1 1 0 0 1-1-1V9.432L10 1.932l8.333 7.5v7.923Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
