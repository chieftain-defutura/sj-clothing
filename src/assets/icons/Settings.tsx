import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const Setting = (props: SvgProps) => (
  <Svg width={20} height={20} fill='none' {...props}>
    <G fill='#462D85' clipPath='url(#a)'>
      <Path d='M.833 3.958h2.28a3.107 3.107 0 0 0 5.996 0h10.058a.833.833 0 0 0 0-1.666H9.109a3.107 3.107 0 0 0-5.996 0H.833a.833.833 0 0 0 0 1.666Zm5.278-2.291a1.458 1.458 0 1 1 0 2.916 1.458 1.458 0 0 1 0-2.916ZM19.167 9.167h-2.28a3.106 3.106 0 0 0-5.995 0H.833a.833.833 0 0 0 0 1.666h10.059a3.105 3.105 0 0 0 5.995 0h2.28a.833.833 0 0 0 0-1.666Zm-5.278 2.291a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915ZM19.167 16.042H9.109a3.107 3.107 0 0 0-5.996 0H.833a.833.833 0 1 0 0 1.666h2.28a3.107 3.107 0 0 0 5.996 0h10.058a.833.833 0 0 0 0-1.666ZM6.11 18.333a1.458 1.458 0 1 1 0-2.915 1.458 1.458 0 0 1 0 2.915Z' />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Setting
