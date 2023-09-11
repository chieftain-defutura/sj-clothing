import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const SearchIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill='#462D85' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#462D85'
        d='m19.756 18.577-4.974-4.974a8.347 8.347 0 1 0-1.179 1.179l4.975 4.974a.833.833 0 0 0 1.178-1.179ZM8.333 15A6.667 6.667 0 1 1 15 8.333 6.674 6.674 0 0 1 8.333 15Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SearchIcon
