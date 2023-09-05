import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CloseIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M18 6 6 18M6 6l12 12'
    />
  </Svg>
)
export default CloseIcon
