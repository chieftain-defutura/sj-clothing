import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const ShoppingBag = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#462D85'
        d='M17.5 5H15A5 5 0 0 0 5 5H2.5A2.5 2.5 0 0 0 0 7.5v8.333A4.172 4.172 0 0 0 4.167 20h11.666A4.172 4.172 0 0 0 20 15.833V7.5A2.5 2.5 0 0 0 17.5 5ZM10 1.667A3.333 3.333 0 0 1 13.333 5H6.667A3.333 3.333 0 0 1 10 1.667Zm8.333 14.166a2.5 2.5 0 0 1-2.5 2.5H4.167a2.5 2.5 0 0 1-2.5-2.5V7.5a.833.833 0 0 1 .833-.833H5v1.666a.833.833 0 1 0 1.667 0V6.667h6.666v1.666a.833.833 0 1 0 1.667 0V6.667h2.5a.833.833 0 0 1 .833.833v8.333Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ShoppingBag
