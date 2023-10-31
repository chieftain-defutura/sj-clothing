import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
const CurrencyGrayIcon = (props: SvgProps) => (
  <Svg fill='none' viewBox='0 0 120 120' {...props}>
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M26.25 91.875a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z'
    />
    <Path fill='#8C73CB' d='M101.25 48.75a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z' />
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M91.875 6.493v2.653M91.875 17.104v2.653M85.243 13.125h2.653M95.855 13.125h2.653M69.887 50.214A30 30 0 1 0 41.25 71.25c.317 0 .632 0 .938-.015'
    />
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M65.625 41.25a24.348 24.348 0 1 0-20.422 24.056'
    />
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M33.75 50.625V33.75h15v16.875M37.25 33.75h-3.5A3.75 3.75 0 0 1 30 30M71.25 110.625c16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30-16.569 0-30 13.431-30 30 0 16.569 13.431 30 30 30Z'
    />
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M71.25 105c13.462 0 24.375-10.913 24.375-24.375S84.712 56.25 71.25 56.25 46.875 67.163 46.875 80.625 57.788 105 71.25 105Z'
    />
    <Path
      stroke='#8C73CB'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M63.75 90V73.125h15V90M67.25 73.125h-3.5a3.75 3.75 0 0 1-3.75-3.75'
    />
  </Svg>
)
export default CurrencyGrayIcon
