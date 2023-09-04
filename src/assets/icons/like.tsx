import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg'
const Like = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} viewBox='0 0 20 20' fill='none'>
    <Path
      d='M5.81861 8.45347V18M5.81861 8.45347L2 8.45345V18H5.81861M5.81861 8.45347L10.7786 2.66681C11.2493 2.11772 11.9897 1.88167 12.6914 2.05707L12.7367 2.06842C14.0177 2.38866 14.5946 3.88122 13.8623 4.97982L11.5465 8.45345H15.9001C17.105 8.45345 18.0087 9.55571 17.7724 10.7372L16.6268 16.4651C16.4483 17.3576 15.6647 18 14.7545 18H5.81861'
      stroke='white'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </Svg>
)
export default Like
