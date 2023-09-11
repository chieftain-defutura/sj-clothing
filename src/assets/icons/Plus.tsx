import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg'
const PlusIcon = (props: SvgProps) => (
  <Svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
    <G clip-path='url(#clip0_1_675)'>
      <Path
        d='M23 11H13V0.999984C13 0.447703 12.5523 0 12 0C11.4477 0 11 0.447703 11 0.999984V11H0.999984C0.447703 11 0 11.4477 0 12C0 12.5523 0.447703 13 0.999984 13H11V23C11 23.5522 11.4477 24 12 24C12.5522 24 12.9999 23.5522 12.9999 23V13H22.9999C23.5522 13 23.9999 12.5523 23.9999 12C24 11.4477 23.5523 11 23 11Z'
        fill='white'
      />
    </G>
    <Defs>
      <ClipPath id='clip0_1_675'>
        <Rect width='24' height='24' fill='white' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default PlusIcon
