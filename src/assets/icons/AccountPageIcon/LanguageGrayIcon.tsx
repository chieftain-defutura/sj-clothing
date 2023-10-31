import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const LanguageGrayIcon = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 120 120' {...props}>
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeWidth={2}
      d='M64.744 27.356s-3 34.144-45 61.463M13.781 27.356h63.956M45.75 17.025v10.331'
    />
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeWidth={2}
      d='M31.425 41.344S47.25 69 60 77.494M62.906 102.975 83.044 56.1a1.67 1.67 0 0 1 3.056 0l20.119 46.875M69.844 86.813H99.3'
    />
  </Svg>
)
export default LanguageGrayIcon
