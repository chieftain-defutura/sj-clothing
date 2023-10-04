import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const EditIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M14.167 2.5A2.357 2.357 0 0 1 17.5 5.833L6.25 17.083l-4.583 1.25 1.25-4.583L14.167 2.5Z'
    />
  </Svg>
)
export default EditIcon
