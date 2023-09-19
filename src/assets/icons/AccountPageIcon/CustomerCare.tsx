import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CustomerCare = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M4.232 9.936V8.111a6.111 6.111 0 1 1 12.223 0v1.825M3.96 9.936h1.505v4.283H3.96a.96.96 0 0 1-.96-.96v-2.363a.96.96 0 0 1 .96-.96Z'
    />
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M16.727 14.22h-1.505V9.935h1.505a.96.96 0 0 1 .96.96v2.363a.96.96 0 0 1-.96.96ZM16.65 14.34v1.602a1.28 1.28 0 0 1-1.28 1.28h-3.566M10.135 15.627H8.823a1.39 1.39 0 0 0-1.39 1.39v.343c0 .768.622 1.39 1.39 1.39h1.312a1.39 1.39 0 0 0 1.39-1.39v-.343a1.39 1.39 0 0 0-1.39-1.39Z'
    />
  </Svg>
)
export default CustomerCare
