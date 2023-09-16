import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const Briefcase = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M13.333 4.667H2.666c-.736 0-1.333.597-1.333 1.333v6.667c0 .736.597 1.333 1.333 1.333h10.667c.736 0 1.333-.597 1.333-1.333V6c0-.736-.597-1.333-1.333-1.333Z'
    />
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10.666 14V3.333A1.333 1.333 0 0 0 9.333 2H6.666a1.333 1.333 0 0 0-1.333 1.333V14'
    />
  </Svg>
)
export default Briefcase
