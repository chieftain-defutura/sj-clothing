import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const SearchGrayIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#AAA'
        d='m15.805 14.862-3.98-3.98a6.678 6.678 0 1 0-.942.943l3.98 3.98a.667.667 0 0 0 .942-.943ZM6.667 12A5.334 5.334 0 1 1 12 6.667 5.339 5.339 0 0 1 6.667 12Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h16v16H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SearchGrayIcon
