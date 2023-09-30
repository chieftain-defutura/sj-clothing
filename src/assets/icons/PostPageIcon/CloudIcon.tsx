import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const CloudIcon = (props: SvgProps) => (
  <Svg fill='none' {...props} style={{ position: 'absolute', bottom: 0 }}>
    <Path
      fill='#fff'
      d='M270.564 58.385c-4.588 0-9.098.554-13.37 1.582-6.566-25.157-29.469-43.749-56.684-43.749a58.783 58.783 0 0 0-24.485 5.34C163.328 8.268 145.409 0 125.591 0 90.94 0 62.143 25.276 56.684 58.385 25.316 58.781 0 84.334 0 115.821c0 31.724 25.712 57.435 57.436 57.435 1.424 0 2.887-.039 4.272-.158 8.227 21.677 29.153 37.064 53.717 37.064 13.647 0 26.186-4.786 36.075-12.737a64.227 64.227 0 0 0 32.832 8.979c26.859 0 49.841-16.376 59.611-39.675 7.951 4.193 17.009 6.527 26.621 6.527 31.724 0 57.436-25.711 57.436-57.435 0-31.724-25.712-57.436-57.436-57.436Z'
    />
  </Svg>
)
export default CloudIcon
