import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const SvgComponent = (props: SvgProps) => (
  <Svg width={20} height={20} fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#fff'
        fillOpacity={0.4}
        d='m19.35 4.786-2.51-3.39A3.338 3.338 0 0 0 14.13 0H5.87a3.333 3.333 0 0 0-2.705 1.38L.612 4.794a3.328 3.328 0 0 0 .103 3.987L8.04 19.054a2.488 2.488 0 0 0 3.063.687c.344-.17.644-.416.877-.72L19.25 8.86a3.333 3.333 0 0 0 .1-4.075Zm-3.857-2.41 2.515 3.398c.013.018.017.04.03.06h-4.077l-1.19-4.167h1.358a1.677 1.677 0 0 1 1.364.709ZM10 15.932 7.75 7.5h4.5L10 15.932ZM7.77 5.833l1.19-4.166h2.077l1.19 4.166H7.771ZM4.514 2.364a1.672 1.672 0 0 1 1.357-.697h1.357l-1.19 4.166H1.931c.012-.018.015-.04.029-.058l2.554-3.41ZM2.04 7.771a1.583 1.583 0 0 1-.154-.271h4.14l2.495 9.358L2.04 7.771Zm9.436 9.096 2.5-9.367h4.155a1.748 1.748 0 0 1-.203.35l-6.452 9.017Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
