import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const EyesWhiteIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G fill='#fff' clipPath='url(#a)'>
      <Path d='M19.892 7.85C18.6 5.743 15.66 2.212 10.5 2.212c-5.16 0-8.1 3.531-9.393 5.636a4.09 4.09 0 0 0 0 4.302C2.4 14.256 5.34 17.788 10.5 17.788c5.16 0 8.1-3.532 9.392-5.637a4.09 4.09 0 0 0 0-4.302Zm-1.42 3.428c-1.11 1.805-3.623 4.843-7.972 4.843-4.35 0-6.862-3.038-7.972-4.843a2.432 2.432 0 0 1 0-2.556c1.11-1.805 3.623-4.843 7.972-4.843s6.861 3.034 7.971 4.843a2.432 2.432 0 0 1 0 2.556Z' />
      <Path d='M10.5 5.833a4.167 4.167 0 1 0 0 8.334 4.167 4.167 0 0 0 0-8.334Zm0 6.667a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z' />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M.5 0h20v20H.5z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default EyesWhiteIcon
