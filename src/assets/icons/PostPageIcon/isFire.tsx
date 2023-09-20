import * as React from 'react'
import Svg, { SvgProps, Path, Defs, RadialGradient, Stop } from 'react-native-svg'

const IsFireIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <Path
      fill='url(#a)'
      d='M5.556 6.364c-.09.95-.152 2.631.41 3.347 0 0-.265-1.847 2.103-4.164.953-.933 1.173-2.202.84-3.153-.189-.54-.534-.985-.834-1.296a.28.28 0 0 1 .214-.473c1.54.069 4.037.497 5.098 3.16.466 1.168.5 2.376.278 3.604-.14.784-.64 2.528.5 2.742.814.153 1.208-.494 1.385-.96a.278.278 0 0 1 .465-.087c1.375 1.564 1.493 3.407 1.208 4.992-.55 3.066-3.654 5.297-6.739 5.297-3.853 0-6.92-2.204-7.716-6.195-.32-1.61-.157-4.798 2.327-7.048.184-.17.486-.02.461.234Z'
    />
    <Path
      fill='url(#b)'
      d='M11.892 12.097c-1.42-1.828-.784-3.914-.436-4.745.047-.11-.078-.213-.176-.146-.611.416-1.863 1.394-2.446 2.77-.789 1.861-.732 2.772-.265 3.885.281.67-.045.812-.21.837-.159.025-.306-.08-.423-.192a2.514 2.514 0 0 1-.694-1.187c-.025-.097-.151-.124-.21-.044-.437.605-.663 1.575-.674 2.26-.034 2.121 1.717 3.84 3.836 3.84 2.67 0 4.615-2.953 3.081-5.422-.445-.719-.864-1.189-1.383-1.856Z'
    />
    <Defs>
      <RadialGradient
        id='a'
        cx={0}
        cy={0}
        r={1}
        gradientTransform='matrix(-11.0292 -.04793 .07865 -18.09673 9.721 19.422)'
        gradientUnits='userSpaceOnUse'
      >
        <Stop offset={0.314} stopColor='#FF9800' />
        <Stop offset={0.662} stopColor='#FF6D00' />
        <Stop offset={0.972} stopColor='#F44336' />
      </RadialGradient>
      <RadialGradient
        id='b'
        cx={0}
        cy={0}
        r={1}
        gradientTransform='rotate(90.579 .99 9.342) scale(11.5401 8.68476)'
        gradientUnits='userSpaceOnUse'
      >
        <Stop offset={0.214} stopColor='#FFF176' />
        <Stop offset={0.328} stopColor='#FFF27D' />
        <Stop offset={0.487} stopColor='#FFF48F' />
        <Stop offset={0.672} stopColor='#FFF7AD' />
        <Stop offset={0.793} stopColor='#FFF9C4' />
        <Stop offset={0.822} stopColor='#FFF8BD' stopOpacity={0.804} />
        <Stop offset={0.863} stopColor='#FFF6AB' stopOpacity={0.529} />
        <Stop offset={0.91} stopColor='#FFF38D' stopOpacity={0.209} />
        <Stop offset={0.941} stopColor='#FFF176' stopOpacity={0} />
      </RadialGradient>
    </Defs>
  </Svg>
)
export default IsFireIcon
