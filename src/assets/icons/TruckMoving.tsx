import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const TruckMovingIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#462D85'
        d='M24 12.649a5 5 0 0 0-.256-1.581l-1.339-4.017A3 3 0 0 0 19.559 5H17V4a3 3 0 0 0-3-3H3a3 3 0 0 0-3 3v15.5a3.517 3.517 0 0 0 6 2.447 3.517 3.517 0 0 0 6-2.447V19h3v.5a3.5 3.5 0 1 0 7 0V19h2v-6.351ZM19.559 7a1 1 0 0 1 .948.684L21.613 11H17V7h2.559ZM2 4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v13H2V4Zm1.5 17A1.5 1.5 0 0 1 2 19.5V19h3v.5A1.5 1.5 0 0 1 3.5 21Zm6.5-1.5a1.5 1.5 0 0 1-3 0V19h3v.5Zm10 0a1.5 1.5 0 1 1-3 0V19h3v.5ZM17 17v-4h5v4h-5Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h24v24H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default TruckMovingIcon
