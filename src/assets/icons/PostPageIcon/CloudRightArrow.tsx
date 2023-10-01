import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CloudRightArrow = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      fill='#fff'
      d='M16.354 4.354a.5.5 0 0 0 0-.708L13.172.464a.5.5 0 1 0-.708.708L15.293 4l-2.829 2.828a.5.5 0 1 0 .708.708l3.182-3.182ZM0 4.5h16v-1H0v1Z'
    />
  </Svg>
)
export default CloudRightArrow
