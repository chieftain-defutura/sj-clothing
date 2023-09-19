import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const UsersMore = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M3 19H1v-1a4.002 4.002 0 0 1 3-3.874m2-3.297a3.001 3.001 0 0 1 0-5.658M21 19h2v-1a4.002 4.002 0 0 0-3-3.874m-2-8.955a3.001 3.001 0 0 1 0 5.658M10 14h4a4 4 0 0 1 4 4v1H6v-1a4 4 0 0 1 4-4Zm5-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
    />
  </Svg>
)
export default UsersMore
