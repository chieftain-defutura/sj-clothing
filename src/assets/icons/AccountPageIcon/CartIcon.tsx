import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const Cart = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G fill='#462D85' clipPath='url(#a)'>
      <Path d='M18.927 3.397a2.494 2.494 0 0 0-1.919-.897H3.535L3.5 2.208A2.5 2.5 0 0 0 1.018 0H.833a.833.833 0 1 0 0 1.667h.185a.833.833 0 0 1 .828.735l1.147 9.75a4.167 4.167 0 0 0 4.138 3.681h8.702a.834.834 0 0 0 0-1.666H7.131A2.5 2.5 0 0 1 4.78 12.5h9.933a4.166 4.166 0 0 0 4.101-3.428l.654-3.628a2.495 2.495 0 0 0-.542-2.046Zm-1.094 1.751-.655 3.629a2.5 2.5 0 0 1-2.464 2.056H4.516l-.784-6.666h13.276a.833.833 0 0 1 .825.981ZM5.834 20a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333ZM14.167 20a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333Z' />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Cart
