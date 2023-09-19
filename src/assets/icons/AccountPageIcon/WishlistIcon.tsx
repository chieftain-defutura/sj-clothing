import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const WishListIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M17.789 4.489V17.11c0 1.611-1.156 2.289-2.567 1.511l-4.366-2.433c-.467-.256-1.223-.256-1.69 0L4.8 18.622c-1.411.778-2.567.1-2.567-1.51V4.488c0-1.9 1.556-3.456 3.456-3.456h8.644c1.9 0 3.456 1.556 3.456 3.456Z'
    />
    <Path
      stroke='#462D85'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M7.79 7.833h4.443M10.012 10.056V5.61'
    />
  </Svg>
)
export default WishListIcon
