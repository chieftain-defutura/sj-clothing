import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const AlertIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      fill='#8C73CB'
      d='M56.45 80.104a5.555 5.555 0 0 1 5.604-5.555 5.51 5.51 0 0 1 5.01 3.455 5.507 5.507 0 1 1-10.615 2.1Zm1.784-13.54-.694-25.892a4.457 4.457 0 0 1 1.12-3.456 4.467 4.467 0 0 1 5.136-1.092 4.466 4.466 0 0 1 2.623 4.548l-.645 25.891a3.769 3.769 0 0 1-6.435 2.666 3.771 3.771 0 0 1-1.105-2.666Z'
    />
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={4}
      d='M62 106.64c25.339 0 45.88-20.541 45.88-45.88 0-25.339-20.541-45.88-45.88-45.88-25.339 0-45.88 20.541-45.88 45.88 0 25.339 20.541 45.88 45.88 45.88Z'
    />
  </Svg>
)
export default AlertIcon
