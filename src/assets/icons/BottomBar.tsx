import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg'

const BottomBar = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} viewBox='0 0 360 72' fill='none'>
    <ClipPath>
      <Path
        d='M0 15C0 15 84 6.10352e-05 180 0C276 -6.10352e-05 360 15 360 15V72H0V15Z'
        fill='#462D85'
      />
    </ClipPath>
  </Svg>
)
export default BottomBar
