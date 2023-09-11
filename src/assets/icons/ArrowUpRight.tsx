import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const ArrowUpRightIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#462D85'
        d='M8.333 0h-3.75a.417.417 0 1 0 0 .833h3.75a.84.84 0 0 1 .216.029L.122 9.289a.416.416 0 1 0 .59.589L9.137 1.45a.837.837 0 0 1 .029.216v3.75a.417.417 0 1 0 .833 0v-3.75C10 .747 9.252 0 8.333 0Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h10v10H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ArrowUpRightIcon
