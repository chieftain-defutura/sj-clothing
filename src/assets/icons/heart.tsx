import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const Heart = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M17.076 3.842a4.584 4.584 0 0 0-6.483 0l-.884.883-.883-.883a4.584 4.584 0 1 0-6.483 6.483l.883.883 6.483 6.484 6.484-6.484.883-.883a4.584 4.584 0 0 0 0-6.483Z'
    />
  </Svg>
)
export default Heart
