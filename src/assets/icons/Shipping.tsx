import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const ShippingIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#462D85'
        d='M14.96 6.139A5.033 5.033 0 0 0 11.78 5H8.771L7.453 0H1.029l1.318 5H0v2h11.78a3.029 3.029 0 0 1 1.913.687A13.424 13.424 0 0 1 17.077 12H14.7l-3 2H0v2h12.3l3-2h6.641A9.012 9.012 0 0 1 13 22H0v2h13a11.013 11.013 0 0 0 11-11v-1h-4.713a15.726 15.726 0 0 0-4.327-5.861ZM3.625 2h2.287L6.7 5H4.415l-.79-3ZM12 11H0V9h12v2Zm-9 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h24v24H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ShippingIcon
