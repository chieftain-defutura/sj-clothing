import * as React from 'react'
import Svg, { SvgProps, G, Mask, Path, Defs, ClipPath } from 'react-native-svg'

const UserIcon = (props: SvgProps) => (
  <Svg fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Mask id='b' width={20} height={20} x={0} y={0} fill='#000' maskUnits='userSpaceOnUse'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
        <Path d='m10 1-.355.014-.352.042-.348.069-.34.095-.335.123-.321.147-.31.173-.295.197-.28.218-.26.24-.24.26-.22.276-.197.294-.174.31-.15.32-.12.332-.098.34-.07.347-.04.351-.014.352.014.552.038.55.069.547.095.543.121.538.148.532.172.523.199.515.225.502.248.494.165.278.188.262.056.088.034.097.008.103-.014.104-.038.095-.057.086-.077.068-.091.051-.099.03-.648.12-.642.14-.638.162-.631.185-.624.207-.617.229-.252.112-.237.137-.223.162-.206.181-.184.202-.164.218-.14.236-.118.248-.16.423-.136.431-.11.438-.086.443-.062.446-.007.185.018.18.042.178.065.17.088.16.107.148.13.13.142.113.16.091.17.073.177.043 1.042.189 1.048.16 1.05.133 1.056.107 1.056.081 1.06.055L9.47 19h1.058l1.06-.026 1.06-.055 1.057-.08 1.054-.108 1.051-.134 1.046-.16 1.044-.188.178-.043.169-.073.158-.091.144-.113.128-.13.11-.147.087-.16.065-.17.042-.178.018-.181-.007-.185-.062-.446-.086-.443-.11-.438-.136-.43-.16-.424-.116-.248-.142-.236-.164-.218-.184-.202-.206-.18-.223-.163-.237-.137-.252-.112-.617-.229-.624-.207-.63-.185-.637-.161-.642-.141-.648-.12-.1-.03-.092-.05-.076-.069-.058-.086-.037-.095-.015-.104.01-.104.034-.096.054-.088.19-.262.165-.278.248-.494.223-.502.199-.515.174-.523.148-.532.12-.538.094-.543.069-.547.04-.55.012-.552-.012-.352-.042-.351-.07-.346-.095-.341-.123-.333-.15-.32-.172-.309-.197-.294-.221-.275-.24-.26-.26-.241-.28-.218-.294-.197-.312-.173-.321-.147-.332-.123-.342-.095-.35-.069-.35-.042L10 1Zm-.002.9.317.014.313.042.307.067.3.095.293.12.28.145.266.17.25.189.234.213.21.232.194.25.17.263.145.28.12.29.096.3.068.306.04.311.015.315-.012.506-.037.506-.064.503-.088.5-.11.495-.136.489-.158.481-.184.473-.206.464-.229.454-.123.207-.142.197-.114.165-.085.181-.06.192-.031.197v.2l.03.197.058.192.086.18.112.166.134.148.157.126.174.102.186.076.193.047.617.114.612.134.606.155.601.175.595.197.589.218.19.086.179.11.165.128.15.146.13.161.11.18.09.186.142.376.122.383.098.39.075.392.055.4-.002.11-.028.11-.056.094-.076.083-.095.058-.107.035-1.02.183-1.024.156-1.029.132-1.031.106-1.034.077-1.037.053-1.035.026h-1.04l-1.035-.026-1.035-.053-1.034-.077-1.033-.106-1.027-.132-1.026-.156-1.02-.183-.105-.035-.097-.058-.076-.083-.054-.095-.03-.109-.002-.11.057-.4.075-.392.099-.39.12-.383.141-.376.092-.186.11-.18.13-.161.15-.146.165-.129.18-.109.19-.086.587-.218.594-.197.6-.175.61-.155.61-.134.616-.114.195-.047.186-.076.175-.102.154-.127.134-.147.114-.165.084-.181.058-.192.03-.197v-.2l-.031-.197-.058-.192-.086-.18-.113-.166-.142-.197-.123-.207-.23-.454-.206-.464-.183-.473-.158-.481-.136-.49-.112-.495-.086-.499-.064-.503-.037-.506-.014-.506.016-.315.04-.311.07-.306.094-.3.121-.29.145-.28.17-.264.192-.25.212-.231.234-.213.25-.19.265-.169.28-.146.291-.119.301-.095.31-.067.312-.042.313-.014Z' />
      </Mask>
      <Path
        fill='#462D85'
        d='m10 1-.355.014-.352.042-.348.069-.34.095-.335.123-.321.147-.31.173-.295.197-.28.218-.26.24-.24.26-.22.276-.197.294-.174.31-.15.32-.12.332-.098.34-.07.347-.04.351-.014.352.014.552.038.55.069.547.095.543.121.538.148.532.172.523.199.515.225.502.248.494.165.278.188.262.056.088.034.097.008.103-.014.104-.038.095-.057.086-.077.068-.091.051-.099.03-.648.12-.642.14-.638.162-.631.185-.624.207-.617.229-.252.112-.237.137-.223.162-.206.181-.184.202-.164.218-.14.236-.118.248-.16.423-.136.431-.11.438-.086.443-.062.446-.007.185.018.18.042.178.065.17.088.16.107.148.13.13.142.113.16.091.17.073.177.043 1.042.189 1.048.16 1.05.133 1.056.107 1.056.081 1.06.055L9.47 19h1.058l1.06-.026 1.06-.055 1.057-.08 1.054-.108 1.051-.134 1.046-.16 1.044-.188.178-.043.169-.073.158-.091.144-.113.128-.13.11-.147.087-.16.065-.17.042-.178.018-.181-.007-.185-.062-.446-.086-.443-.11-.438-.136-.43-.16-.424-.116-.248-.142-.236-.164-.218-.184-.202-.206-.18-.223-.163-.237-.137-.252-.112-.617-.229-.624-.207-.63-.185-.637-.161-.642-.141-.648-.12-.1-.03-.092-.05-.076-.069-.058-.086-.037-.095-.015-.104.01-.104.034-.096.054-.088.19-.262.165-.278.248-.494.223-.502.199-.515.174-.523.148-.532.12-.538.094-.543.069-.547.04-.55.012-.552-.012-.352-.042-.351-.07-.346-.095-.341-.123-.333-.15-.32-.172-.309-.197-.294-.221-.275-.24-.26-.26-.241-.28-.218-.294-.197-.312-.173-.321-.147-.332-.123-.342-.095-.35-.069-.35-.042L10 1Zm-.002.9.317.014.313.042.307.067.3.095.293.12.28.145.266.17.25.189.234.213.21.232.194.25.17.263.145.28.12.29.096.3.068.306.04.311.015.315-.012.506-.037.506-.064.503-.088.5-.11.495-.136.489-.158.481-.184.473-.206.464-.229.454-.123.207-.142.197-.114.165-.085.181-.06.192-.031.197v.2l.03.197.058.192.086.18.112.166.134.148.157.126.174.102.186.076.193.047.617.114.612.134.606.155.601.175.595.197.589.218.19.086.179.11.165.128.15.146.13.161.11.18.09.186.142.376.122.383.098.39.075.392.055.4-.002.11-.028.11-.056.094-.076.083-.095.058-.107.035-1.02.183-1.024.156-1.029.132-1.031.106-1.034.077-1.037.053-1.035.026h-1.04l-1.035-.026-1.035-.053-1.034-.077-1.033-.106-1.027-.132-1.026-.156-1.02-.183-.105-.035-.097-.058-.076-.083-.054-.095-.03-.109-.002-.11.057-.4.075-.392.099-.39.12-.383.141-.376.092-.186.11-.18.13-.161.15-.146.165-.129.18-.109.19-.086.587-.218.594-.197.6-.175.61-.155.61-.134.616-.114.195-.047.186-.076.175-.102.154-.127.134-.147.114-.165.084-.181.058-.192.03-.197v-.2l-.031-.197-.058-.192-.086-.18-.113-.166-.142-.197-.123-.207-.23-.454-.206-.464-.183-.473-.158-.481-.136-.49-.112-.495-.086-.499-.064-.503-.037-.506-.014-.506.016-.315.04-.311.07-.306.094-.3.121-.29.145-.28.17-.264.192-.25.212-.231.234-.213.25-.19.265-.169.28-.146.291-.119.301-.095.31-.067.312-.042.313-.014Z'
      />
      <Path
        stroke='#462D85'
        d='m10 1-.355.014-.352.042-.348.069-.34.095-.335.123-.321.147-.31.173-.295.197-.28.218-.26.24-.24.26-.22.276-.197.294-.174.31-.15.32-.12.332-.098.34-.07.347-.04.351-.014.352.014.552.038.55.069.547.095.543.121.538.148.532.172.523.199.515.225.502.248.494.165.278.188.262.056.088.034.097.008.103-.014.104-.038.095-.057.086-.077.068-.091.051-.099.03-.648.12-.642.14-.638.162-.631.185-.624.207-.617.229-.252.112-.237.137-.223.162-.206.181-.184.202-.164.218-.14.236-.118.248-.16.423-.136.431-.11.438-.086.443-.062.446-.007.185.018.18.042.178.065.17.088.16.107.148.13.13.142.113.16.091.17.073.177.043 1.042.189 1.048.16 1.05.133 1.056.107 1.056.081 1.06.055L9.47 19h1.058l1.06-.026 1.06-.055 1.057-.08 1.054-.108 1.051-.134 1.046-.16 1.044-.188.178-.043.169-.073.158-.091.144-.113.128-.13.11-.147.087-.16.065-.17.042-.178.018-.181-.007-.185-.062-.446-.086-.443-.11-.438-.136-.43-.16-.424-.116-.248-.142-.236-.164-.218-.184-.202-.206-.18-.223-.163-.237-.137-.252-.112-.617-.229-.624-.207-.63-.185-.637-.161-.642-.141-.648-.12-.1-.03-.092-.05-.076-.069-.058-.086-.037-.095-.015-.104.01-.104.034-.096.054-.088.19-.262.165-.278.248-.494.223-.502.199-.515.174-.523.148-.532.12-.538.094-.543.069-.547.04-.55.012-.552-.012-.352-.042-.351-.07-.346-.095-.341-.123-.333-.15-.32-.172-.309-.197-.294-.221-.275-.24-.26-.26-.241-.28-.218-.294-.197-.312-.173-.321-.147-.332-.123-.342-.095-.35-.069-.35-.042L10 1Zm-.002.9.317.014.313.042.307.067.3.095.293.12.28.145.266.17.25.189.234.213.21.232.194.25.17.263.145.28.12.29.096.3.068.306.04.311.015.315-.012.506-.037.506-.064.503-.088.5-.11.495-.136.489-.158.481-.184.473-.206.464-.229.454-.123.207-.142.197-.114.165-.085.181-.06.192-.031.197v.2l.03.197.058.192.086.18.112.166.134.148.157.126.174.102.186.076.193.047.617.114.612.134.606.155.601.175.595.197.589.218.19.086.179.11.165.128.15.146.13.161.11.18.09.186.142.376.122.383.098.39.075.392.055.4-.002.11-.028.11-.056.094-.076.083-.095.058-.107.035-1.02.183-1.024.156-1.029.132-1.031.106-1.034.077-1.037.053-1.035.026h-1.04l-1.035-.026-1.035-.053-1.034-.077-1.033-.106-1.027-.132-1.026-.156-1.02-.183-.105-.035-.097-.058-.076-.083-.054-.095-.03-.109-.002-.11.057-.4.075-.392.099-.39.12-.383.141-.376.092-.186.11-.18.13-.161.15-.146.165-.129.18-.109.19-.086.587-.218.594-.197.6-.175.61-.155.61-.134.616-.114.195-.047.186-.076.175-.102.154-.127.134-.147.114-.165.084-.181.058-.192.03-.197v-.2l-.031-.197-.058-.192-.086-.18-.113-.166-.142-.197-.123-.207-.23-.454-.206-.464-.183-.473-.158-.481-.136-.49-.112-.495-.086-.499-.064-.503-.037-.506-.014-.506.016-.315.04-.311.07-.306.094-.3.121-.29.145-.28.17-.264.192-.25.212-.231.234-.213.25-.19.265-.169.28-.146.291-.119.301-.095.31-.067.312-.042.313-.014Z'
        mask='url(#b)'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h20v20H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)
export default UserIcon