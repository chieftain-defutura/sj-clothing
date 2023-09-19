import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const CopyIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#462D85'
        fillRule='evenodd'
        d='M14 6.5c0-.552-.448-.5-1-.5H3c-.552 0-1-.052-1 .5V16h12V6.5Zm2-.5v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Zm4-3.937V14.5a1 1 0 0 1-2 0v-12c0-.552-.448-.5-1-.5H5c-.552 0-1-.526-1-1.078S4.448 0 5 0h13c1.219 0 2 .813 2 2.063Z'
        clipRule='evenodd'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default CopyIcon
