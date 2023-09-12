import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const Phonepe = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill='#462D85'
        d='M19.677.432a15.995 15.995 0 1 0-7.35 31.134A15.995 15.995 0 0 0 19.676.432Z'
      />
      <Path
        fill='#fff'
        d='M23.26 11.825a1.182 1.182 0 0 0-1.161-1.148h-2.146l-4.914-5.643a1.822 1.822 0 0 0-1.878-.537l-1.703.537a.396.396 0 0 0-.18.625l5.368 5.094h-8.13a.425.425 0 0 0-.443.445v.893a1.182 1.182 0 0 0 1.161 1.162h1.253v4.291c0 3.216 1.698 5.094 4.557 5.094a6.163 6.163 0 0 0 2.503-.448v2.865a1.41 1.41 0 0 0 1.43 1.43h1.25a.579.579 0 0 0 .536-.537V13.167h2.05a.424.424 0 0 0 .447-.448v-.893Zm-5.729 7.685a4.267 4.267 0 0 1-1.789.357c-1.43 0-2.143-.713-2.143-2.323v-4.289h3.932v6.255Z'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h32v32H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Phonepe
