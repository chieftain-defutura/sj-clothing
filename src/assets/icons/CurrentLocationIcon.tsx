import * as React from 'react'
import Svg, { SvgProps, Path, Defs, LinearGradient, Stop } from 'react-native-svg'

const CurrentLocationIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      stroke='url(#a)'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8.5 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z'
    />
    <Path
      stroke='url(#b)'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8.5 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z'
    />
    <Path stroke='url(#c)' strokeLinecap='round' strokeLinejoin='round' d='M8.5 2.667V1.333' />
    <Path stroke='url(#d)' strokeLinecap='round' strokeLinejoin='round' d='M3.166 8H1.833' />
    <Path stroke='url(#e)' strokeLinecap='round' strokeLinejoin='round' d='M8.5 13.333v1.334' />
    <Path stroke='url(#f)' strokeLinecap='round' strokeLinejoin='round' d='M13.833 8h1.333' />
    <Defs>
      <LinearGradient id='a' x1={3.5} x2={13.5} y1={8} y2={8} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#462D85' />
        <Stop offset={1} stopColor='#DB00FF' />
      </LinearGradient>
      <LinearGradient id='b' x1={6.5} x2={10.5} y1={8} y2={8} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#462D85' />
        <Stop offset={1} stopColor='#DB00FF' />
      </LinearGradient>
      <LinearGradient id='c' x1={8.5} x2={9.5} y1={2} y2={2} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#462D85' />
        <Stop offset={1} stopColor='#DB00FF' />
      </LinearGradient>
      <LinearGradient id='d' x1={1.833} x2={3.166} y1={8.5} y2={8.5} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#462D85' />
        <Stop offset={1} stopColor='#DB00FF' />
      </LinearGradient>
      <LinearGradient id='e' x1={8.5} x2={9.5} y1={14} y2={14} gradientUnits='userSpaceOnUse'>
        <Stop stopColor='#462D85' />
        <Stop offset={1} stopColor='#DB00FF' />
      </LinearGradient>
      <LinearGradient
        id='f'
        x1={13.833}
        x2={15.166}
        y1={8.5}
        y2={8.5}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopColor='#462D85' />
        <Stop offset={1} stopColor='#DB00FF' />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default CurrentLocationIcon
