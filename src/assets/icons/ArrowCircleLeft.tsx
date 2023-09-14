import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const ArrowCircleLeft = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#462D85'
        d='M24 12A12 12 0 1 1 12 0a12.013 12.013 0 0 1 12 12ZM2 12A10 10 0 1 0 12 2 10.011 10.011 0 0 0 2 12Zm8.879-5.707a1 1 0 0 1 0 1.414L7.587 11 18 11.007a1 1 0 0 1 0 2L7.586 13l3.293 3.293a1 1 0 1 1-1.389 1.438l-.025-.024-3.586-3.585a3 3 0 0 1 0-4.243l3.586-3.586a1 1 0 0 1 1.414 0Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M24 0H0v24h24z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ArrowCircleLeft
