import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const FaqPlusIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M7 2.917v8.166M2.917 7h8.167'
    />
  </Svg>
)
export default FaqPlusIcon
