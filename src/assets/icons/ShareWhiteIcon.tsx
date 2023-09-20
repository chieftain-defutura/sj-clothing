import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const ShareWhiteIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        stroke='#fff'
        d='M19.5 9.532 11.467 3v3.333c-7.83.064-10.735 5.903-9.797 11.53 1.712-3.498 5.27-4.876 9.797-5.033v3.235L19.5 9.532Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M.5 0h20v20H.5z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default ShareWhiteIcon
