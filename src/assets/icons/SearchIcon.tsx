import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const Search = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9'
    />
  </Svg>
)
export default Search
