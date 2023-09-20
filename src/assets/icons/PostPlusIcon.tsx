import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const HomePlusIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#fff'
        d='M19.167 9.167h-8.334V.833a.833.833 0 1 0-1.666 0v8.334H.833a.833.833 0 0 0 0 1.666h8.334v8.334a.833.833 0 1 0 1.666 0v-8.334h8.334a.833.833 0 0 0 0-1.666Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default HomePlusIcon
