import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const PlayCircleIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#DB00FF'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M6.5 11a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
    />
    <Path stroke='#DB00FF' strokeLinecap='round' strokeLinejoin='round' d='m5.5 4 3 2-3 2V4Z' />
  </Svg>
)
export default PlayCircleIcon
