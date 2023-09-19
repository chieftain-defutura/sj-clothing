import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const HelpQuestion = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M8.333 7.5A1.666 1.666 0 1 1 10 9.167V10m1.875 5.833-1.208 1.611a.833.833 0 0 1-1.334 0l-1.208-1.61H5.833A3.333 3.333 0 0 1 2.5 12.5V5.833A3.333 3.333 0 0 1 5.833 2.5h8.334A3.333 3.333 0 0 1 17.5 5.833V12.5a3.333 3.333 0 0 1-3.333 3.333h-2.292Z'
    />
    <Path fill='#462D85' d='M10 13.333a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666Z' />
  </Svg>
)
export default HelpQuestion
