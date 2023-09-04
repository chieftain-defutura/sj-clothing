import * as React from 'react'
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  ClipPath,
  Rect,
  Stop,
  LinearGradient,
} from 'react-native-svg'
const TabBarHighlight = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} viewBox='0 0 40 40' fill='none'>
    <Rect y='-6.10352e-05' width='40' height='40' rx='20' fill='white' />
  </Svg>
)

export default TabBarHighlight
