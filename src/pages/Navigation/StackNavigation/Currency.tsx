import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONT_FAMILY, gradientColors, gradientOpacityColors } from '../../../styles/theme'
import styled from 'styled-components/native'
import LanguageGrayIcon from '../../../assets/icons/AccountPageIcon/LanguageGrayIcon'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'
import Svg, { Path, Defs, G, Rect, ClipPath } from 'react-native-svg'
import CurrencyGrayIcon from '../../../assets/icons/AccountPageIcon/CurrencyGrayIcon'
import { Image } from 'react-native'

const CurrencyData = [
  {
    symbol: (
      <Svg width='14' height='16' viewBox='0 0 14 16' fill='none'>
        <Path
          d='M13.0445 12.7855C13.1025 12.8436 13.1486 12.9125 13.18 12.9883C13.2114 13.0642 13.2275 13.1454 13.2275 13.2275C13.2275 13.3096 13.2113 13.3909 13.1799 13.4667C13.1485 13.5425 13.1024 13.6114 13.0444 13.6694C12.208 14.5058 11.1514 15.0877 9.9974 15.3475C8.84341 15.6072 7.6394 15.5341 6.52529 15.1367C5.41118 14.7394 4.43271 14.034 3.70358 13.1026C2.97445 12.1711 2.52461 11.0519 2.40632 9.875H1.125C0.95924 9.875 0.800269 9.80915 0.683058 9.69194C0.565848 9.57473 0.5 9.41576 0.5 9.25C0.5 9.08424 0.565848 8.92527 0.683058 8.80806C0.800269 8.69085 0.95924 8.625 1.125 8.625H2.375V7.375H1.125C0.95924 7.375 0.800269 7.30915 0.683058 7.19194C0.565848 7.07473 0.5 6.91576 0.5 6.75C0.5 6.58424 0.565848 6.42527 0.683058 6.30806C0.800269 6.19085 0.95924 6.125 1.125 6.125H2.40632C2.52461 4.94807 2.97445 3.82887 3.70358 2.89745C4.43271 1.96603 5.41118 1.26065 6.52529 0.863261C7.6394 0.465875 8.84341 0.392804 9.9974 0.65254C11.1514 0.912276 12.208 1.49416 13.0444 2.33056C13.1025 2.38858 13.1486 2.45747 13.1801 2.53331C13.2115 2.60915 13.2277 2.69045 13.2278 2.77256C13.2278 2.85466 13.2117 2.93597 13.1803 3.01184C13.1489 3.0877 13.1028 3.15664 13.0448 3.2147C12.9867 3.27276 12.9178 3.31882 12.8419 3.35023C12.7661 3.38165 12.6848 3.39781 12.6026 3.39779C12.5205 3.39777 12.4392 3.38158 12.3634 3.35013C12.2875 3.31868 12.2186 3.27259 12.1606 3.2145C11.4991 2.55292 10.6653 2.09023 9.75393 1.87904C8.84254 1.66785 7.89019 1.71664 7.00516 2.01986C6.12012 2.32308 5.33794 2.86855 4.74754 3.59426C4.15714 4.31997 3.78223 5.19679 3.66544 6.125H8.625C8.79076 6.125 8.94973 6.19085 9.06694 6.30806C9.18415 6.42527 9.25 6.58424 9.25 6.75C9.25 6.91576 9.18415 7.07473 9.06694 7.19194C8.94973 7.30915 8.79076 7.375 8.625 7.375H3.625V8.625H7.375C7.54076 8.625 7.69973 8.69085 7.81694 8.80806C7.93415 8.92527 8 9.08424 8 9.25C8 9.41576 7.93415 9.57473 7.81694 9.69194C7.69973 9.80915 7.54076 9.875 7.375 9.875H3.66544C3.78223 10.8032 4.15714 11.68 4.74754 12.4057C5.33794 13.1314 6.12012 13.6769 7.00516 13.9801C7.89019 14.2834 8.84254 14.3321 9.75393 14.121C10.6653 13.9098 11.4991 13.4471 12.1606 12.7855C12.2778 12.6683 12.4368 12.6025 12.6026 12.6025C12.7683 12.6025 12.9273 12.6683 13.0445 12.7855Z'
          fill='#8C73CB'
        />
      </Svg>
    ),
    currency: 'EUR',
  },
  {
    symbol: (
      <Svg width='21' height='20' viewBox='0 0 21 20' fill='none'>
        <Path
          d='M10.5 17.2916C10.3349 17.2895 10.1772 17.223 10.0604 17.1062C9.94367 16.9895 9.87717 16.8317 9.875 16.6666V3.33331C9.875 3.16755 9.94083 3.00858 10.0581 2.89137C10.1752 2.77416 10.3343 2.70831 10.5 2.70831C10.6657 2.70831 10.8248 2.77416 10.9419 2.89137C11.0592 3.00858 11.125 3.16755 11.125 3.33331V16.6666C11.1228 16.8317 11.0563 16.9895 10.9396 17.1062C10.8228 17.223 10.6651 17.2895 10.5 17.2916Z'
          fill='#8C73CB'
        />
        <Path
          d='M11.7497 15.625H6.33301C6.16725 15.625 6.00827 15.5592 5.89107 15.4419C5.77386 15.3248 5.70801 15.1658 5.70801 15C5.70801 14.8343 5.77386 14.6753 5.89107 14.5581C6.00827 14.4409 6.16725 14.375 6.33301 14.375H11.7497C12.3009 14.4241 12.8496 14.2554 13.2779 13.9049C13.7063 13.5544 13.9803 13.0501 14.0413 12.5C13.9803 11.9499 13.7063 11.4456 13.2779 11.0951C12.8496 10.7446 12.3009 10.5759 11.7497 10.625H9.24967C8.81175 10.6533 8.37256 10.5947 7.9573 10.4528C7.54205 10.3109 7.1589 10.0884 6.82984 9.79802C6.50079 9.50769 6.2323 9.15527 6.03979 8.76085C5.84727 8.36652 5.73452 7.93804 5.70801 7.50001C5.73452 7.06197 5.84727 6.63349 6.03979 6.23914C6.2323 5.84478 6.50079 5.49232 6.82984 5.20198C7.1589 4.91164 7.54205 4.68912 7.9573 4.54721C8.37256 4.4053 8.81175 4.34678 9.24967 4.37501H13.833C13.9988 4.37501 14.1578 4.44086 14.2749 4.55806C14.3922 4.67528 14.458 4.83425 14.458 5.00001C14.458 5.16577 14.3922 5.32474 14.2749 5.44195C14.1578 5.55916 13.9988 5.62501 13.833 5.62501H9.24967C8.69839 5.57588 8.14978 5.74463 7.72142 6.09511C7.29306 6.44559 7.01902 6.94991 6.95801 7.50001C7.01902 8.05011 7.29306 8.55444 7.72142 8.90494C8.14978 9.25535 8.69839 9.42411 9.24967 9.37502H11.7497C12.1876 9.34677 12.6268 9.40527 13.042 9.54719C13.4573 9.68911 13.8404 9.91161 14.1695 10.2019C14.4986 10.4924 14.767 10.8448 14.9596 11.2391C15.1521 11.6335 15.2648 12.0619 15.2913 12.5C15.2648 12.938 15.1521 13.3665 14.9596 13.7609C14.767 14.1553 14.4986 14.5077 14.1695 14.798C13.8404 15.0884 13.4573 15.3109 13.042 15.4528C12.6268 15.5947 12.1876 15.6533 11.7497 15.625Z'
          fill='#8C73CB'
        />
      </Svg>
    ),
    currency: 'Dollor(US)',
  },
  {
    symbol: (
      <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
        <G clip-path='url(#clip0_5211_111)'>
          <Path
            d='M18.3335 9.99999H15.9724L16.2502 8.88888H18.3335C18.4809 8.88888 18.6222 8.83035 18.7264 8.72616C18.8306 8.62197 18.8891 8.48067 18.8891 8.33332C18.8891 8.18598 18.8306 8.04467 18.7264 7.94049C18.6222 7.8363 18.4809 7.77777 18.3335 7.77777H16.5224L17.728 2.9111C17.7373 2.78088 17.7004 2.65155 17.6238 2.54582C17.5472 2.44008 17.4359 2.36469 17.3092 2.33287C17.1826 2.30105 17.0489 2.31484 16.9314 2.37181C16.8139 2.42878 16.7203 2.5253 16.6669 2.64444L15.378 7.77777H11.8391L10.5558 2.64444C10.5257 2.52431 10.4563 2.41769 10.3587 2.3415C10.261 2.26532 10.1407 2.22394 10.0169 2.22394C9.89304 2.22394 9.77275 2.26532 9.67512 2.3415C9.57748 2.41769 9.5081 2.52431 9.47799 2.64444L8.21688 7.77777H4.67799L3.40577 2.64444C3.36591 2.50646 3.27416 2.38929 3.14977 2.3175C3.02539 2.2457 2.87803 2.22487 2.73862 2.25936C2.5992 2.29386 2.47857 2.381 2.40201 2.50251C2.32545 2.62402 2.29893 2.77046 2.32799 2.9111L3.53355 7.77777H1.66688C1.51954 7.77777 1.37823 7.8363 1.27405 7.94049C1.16986 8.04467 1.11133 8.18598 1.11133 8.33332C1.11133 8.48067 1.16986 8.62197 1.27405 8.72616C1.37823 8.83035 1.51954 8.88888 1.66688 8.88888H3.80577L4.08355 9.99999H1.66688C1.51954 9.99999 1.37823 10.0585 1.27405 10.1627C1.16986 10.2669 1.11133 10.4082 1.11133 10.5555C1.11133 10.7029 1.16986 10.8442 1.27405 10.9484C1.37823 11.0526 1.51954 11.1111 1.66688 11.1111H4.35577L5.90577 17.3555C5.93588 17.4757 6.00526 17.5823 6.10289 17.6585C6.20053 17.7347 6.32082 17.776 6.44466 17.776C6.5685 17.776 6.68879 17.7347 6.78643 17.6585C6.88406 17.5823 6.95344 17.4757 6.98355 17.3555L8.53355 11.1111H11.5224L13.0724 17.3555C13.1025 17.4757 13.1719 17.5823 13.2696 17.6585C13.3672 17.7347 13.4875 17.776 13.6113 17.776C13.7352 17.776 13.8555 17.7347 13.9531 17.6585C14.0507 17.5823 14.1201 17.4757 14.1502 17.3555L15.6947 11.1111H18.3335C18.4809 11.1111 18.6222 11.0526 18.7264 10.9484C18.8306 10.8442 18.8891 10.7029 18.8891 10.5555C18.8891 10.4082 18.8306 10.2669 18.7264 10.1627C18.6222 10.0585 18.4809 9.99999 18.3335 9.99999ZM15.1002 8.88888L14.8224 9.99999H12.3891L12.1113 8.88888H15.1002ZM10.0002 5.08888L10.6947 7.77777H9.36133L10.0002 5.08888ZM4.95022 8.88888H7.93911L7.66133 9.99999H5.22799L4.95022 8.88888ZM6.44466 14.9111L5.50577 11.1111H7.38911L6.44466 14.9111ZM8.80577 9.99999L9.08355 8.88888H10.9669L11.2447 9.99999H8.80577ZM13.6058 14.9111L12.6669 11.1111H14.5502L13.6058 14.9111Z'
            fill='#8C73CB'
          />
        </G>
        <Defs>
          <ClipPath id='clip0_5211_111'>
            <Rect width='20' height='20' fill='white' />
          </ClipPath>
        </Defs>
      </Svg>
    ),
    currency: 'WON',
  },
  {
    symbol: (
      <Svg width='21' height='20' viewBox='0 0 21 20' fill='none'>
        <Path
          d='M4.66699 16.6666H16.3337M4.66699 10.8333H13.0003M15.5003 5.6816C14.825 4.29152 13.3996 3.33331 11.7503 3.33331C9.44916 3.33331 7.58366 5.1988 7.58366 7.49998V14.1666C7.58366 15.5474 6.46437 16.6666 5.08366 16.6666'
          stroke='#8C73CB'
          stroke-linecap='round'
        />
      </Svg>
    ),
    currency: 'POUND',
  },
  {
    symbol: (
      <Svg width='21' height='20' viewBox='0 0 21 20' fill='none'>
        <Path
          d='M15.5 2.5H8V17.5M8 9.16667H15.5M5.5 12.5H13'
          stroke='#8C73CB'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </Svg>
    ),
    currency: 'SWIZ',
  },
  {
    symbol: (
      <Svg width='21' height='20' viewBox='0 0 21 20' fill='none'>
        <G clip-path='url(#clip0_5243_143)'>
          <Path
            d='M12.8768 13.099H12.8775C13.2449 13.099 13.6134 13.0975 13.9842 13.0957L14.1326 13.0953C14.5594 13.0935 14.9889 13.0917 15.4227 13.0917C15.5257 13.0917 15.612 13.0113 15.6193 12.9083C15.8295 9.8801 15.5925 8.60076 14.6799 7.83894C14.6445 7.80992 14.5999 7.79374 14.5541 7.79374L14.5315 7.79508C14.4774 7.8007 14.4279 7.82971 14.3956 7.87346C13.8824 8.56516 13.8969 9.19075 14.4433 9.90089C14.6419 10.1588 14.7186 10.5344 14.8097 10.9781C14.8378 11.1162 14.8671 11.2583 14.9014 11.4037C14.5841 11.4032 14.2762 11.401 13.9653 11.3991L13.8839 11.3986C13.5572 11.3969 13.2403 11.3944 12.9298 11.3944C12.3764 11.3944 11.923 11.401 11.5032 11.4149L11.4383 11.4162C10.8923 11.4162 10.6533 11.2183 10.6129 10.7337C10.56 10.0929 10.4995 9.34063 10.4421 8.62215C10.3673 7.68552 10.2968 6.80506 10.252 6.30362C10.1744 5.43473 9.69266 4.02057 9.63723 3.86009C9.60933 3.78125 9.53455 3.72858 9.451 3.72858C9.36677 3.72858 9.29177 3.78211 9.26506 3.86195C9.2221 3.98862 9.16149 4.1231 9.10268 4.25368C8.96016 4.57075 8.81306 4.89828 8.84531 5.23321C8.91578 5.95347 9.04639 6.67605 9.17503 7.38671L9.17946 7.41078C9.25971 7.85464 9.34296 8.31423 9.40889 8.76586C9.47485 9.21984 9.52421 9.69874 9.56744 10.1215C9.6222 10.6567 9.67871 11.21 9.76919 11.7596C9.90706 12.5988 10.3774 13.0689 11.0937 13.0834C11.621 13.094 12.1877 13.099 12.8768 13.099Z'
            fill='#8C73CB'
          />
          <Path
            d='M12.6522 14.7241L13.4337 15.6155C13.4688 15.6562 13.5197 15.6806 13.5595 15.6815L13.5823 15.6834C13.6322 15.6834 13.68 15.6645 13.7167 15.6302L14.5659 14.8373C14.6437 14.7643 14.6499 14.6447 14.58 14.5642L13.745 13.6041C13.7101 13.5641 13.6615 13.5403 13.5964 13.5368C13.5476 13.5368 13.499 13.5562 13.4636 13.5889L12.6062 14.3799C12.5776 14.4056 12.5621 14.4393 12.5526 14.474L11.7766 13.5548C11.7425 13.5137 11.692 13.4884 11.6266 13.4847C11.5772 13.4847 11.5299 13.5032 11.4939 13.5364L10.6428 14.3105C10.5635 14.3825 10.5561 14.5031 10.6263 14.5849L11.4738 15.5695C11.5085 15.6096 11.5586 15.6347 11.618 15.6377H11.6231C11.6726 15.6377 11.7199 15.6197 11.7555 15.5867L12.5977 14.8215C12.6265 14.7937 12.643 14.7597 12.6522 14.7241Z'
            fill='#8C73CB'
          />
          <Path
            d='M8.23616 4.06095C8.19591 3.75266 7.96909 3.47912 7.54272 3.22536C7.38074 3.12849 7.23335 2.98534 7.07743 2.83396C6.99685 2.75524 6.91308 2.67433 6.82323 2.59505C6.78748 2.56283 6.74087 2.54535 6.69217 2.54535L6.66118 2.54758C6.60237 2.55725 6.55188 2.59245 6.52264 2.64312C6.04754 3.45892 6.2203 4.17081 6.42037 4.99539L6.46654 5.18724C6.83562 6.73934 6.98945 8.37742 7.13841 9.9646L7.19406 10.5538C7.2896 11.5442 7.17044 12.203 6.81936 12.627C6.45367 13.0685 5.8129 13.3095 4.74149 13.4085C4.55667 13.4256 4.37319 13.428 4.21914 13.428L3.83499 13.426C2.85502 13.4238 2.14305 13.1586 1.77561 12.6584C1.59748 12.4156 1.53018 12.206 1.55065 11.9582C1.57453 11.67 1.86708 10.7341 2.31786 10.0489C2.38404 9.94867 2.40703 9.82836 2.38274 9.71062C2.35856 9.59288 2.28974 9.49117 2.18948 9.42565C1.9884 9.29273 1.69659 9.35508 1.56783 9.55099C0.936181 10.4416 0.632651 11.7003 0.577778 11.9466C0.404641 12.667 0.522794 13.3702 0.909917 13.9274C1.30575 14.4965 1.94342 14.8606 2.70558 14.9529C3.09158 15 3.49552 15.0226 3.94005 15.0226C4.31036 15.0226 4.70667 15.0068 5.15231 14.9736C6.22075 14.8944 7.02546 14.5426 7.54473 13.9276C8.10272 13.2668 8.32634 12.3094 8.20967 11.0815C8.11083 10.0375 7.98802 8.99106 7.86916 7.97865L7.86224 7.91872C7.77594 7.18089 7.68676 6.41959 7.60816 5.66934C7.58684 5.46484 7.62917 5.23702 7.70205 5.16228C8.1106 4.74294 8.28036 4.39354 8.23616 4.06095Z'
            fill='#8C73CB'
          />
          <Path
            d='M19.8346 10.5366L19.7182 10.3974C19.4922 10.1063 18.9097 9.3634 18.3822 8.76133C18.1262 8.46974 17.642 8.4373 17.3493 8.69306C17.0459 8.95879 17.0155 9.42222 17.2812 9.72579C17.6679 10.1672 18.1002 10.7064 18.4002 11.0873C18.4549 11.1477 18.4967 11.2033 18.5378 11.2587C18.575 11.3087 18.6117 11.3577 18.6554 11.4087C19.0383 11.8531 19.5818 12.7454 18.9248 13.733C17.7154 15.5506 16.3173 16.4724 14.7697 16.4724C14.7695 16.4724 14.7695 16.4724 14.7693 16.4724C14.6477 16.4724 14.5233 16.4667 14.399 16.4552C14.0925 16.428 13.7796 16.3589 13.4766 16.2925C13.413 16.2785 13.3438 16.2644 13.2765 16.2507C13.1916 16.2336 13.1091 16.2169 13.0427 16.2015C12.8862 16.165 12.7769 16.2806 12.7415 16.3712C12.7204 16.4719 12.7815 16.5729 12.8811 16.601C13.2134 16.6943 13.5643 16.822 13.8739 16.9346C14.5767 17.1903 15.3032 17.4542 16.0223 17.4547C16.0792 17.4547 16.1359 17.4525 16.1934 17.4496C17.6994 17.359 18.7428 16.286 19.8356 14.7157C19.862 14.688 20.4795 14.0222 20.4999 12.6846C20.5206 11.346 19.8614 10.5676 19.8346 10.5366Z'
            fill='#8C73CB'
          />
        </G>
        <Defs>
          <ClipPath id='clip0_5243_143'>
            <Rect width='20' height='20' fill='white' transform='translate(0.5)' />
          </ClipPath>
        </Defs>
      </Svg>
    ),
    currency: 'RIYAL',
  },
  {
    symbol: (
      <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
        <Path
          d='M4.50037 1.83334C4.86857 1.5572 5.3909 1.63182 5.66704 2.00001L10.0004 7.77778L14.3337 2.00001C14.6099 1.63182 15.1322 1.5572 15.5004 1.83334C15.8685 2.10948 15.9432 2.63182 15.667 3.00001L11.042 9.16668H14.167C14.6273 9.16668 15.0004 9.53976 15.0004 10C15.0004 10.4603 14.6273 10.8333 14.167 10.8333H10.8337V12.5H14.167C14.6273 12.5 15.0004 12.8731 15.0004 13.3333C15.0004 13.7936 14.6273 14.1667 14.167 14.1667H10.8337V17.5C10.8337 17.9603 10.4606 18.3333 10.0004 18.3333C9.54012 18.3333 9.16704 17.9603 9.16704 17.5V14.1667H5.83371C5.37347 14.1667 5.00037 13.7936 5.00037 13.3333C5.00037 12.8731 5.37347 12.5 5.83371 12.5H9.16704V10.8333H5.83371C5.37347 10.8333 5.00037 10.4603 5.00037 10C5.00037 9.53976 5.37347 9.16668 5.83371 9.16668H8.95871L4.33371 3.00001C4.05757 2.63182 4.13218 2.10948 4.50037 1.83334Z'
          fill='#8C73CB'
        />
      </Svg>
    ),
    currency: 'YEN',
  },
]

const Currency = () => {
  const [isDropdownSizesOpen, setIsDropdownSizesOpen] = useState<boolean>(false)
  const [currency, setCurrency] = useState({
    symbol: null,
    currency: 'EUR',
  })
  const toggleDropdownSizes = () => {
    setIsDropdownSizesOpen((prevState) => !prevState)
  }
  return (
    <LinearGradient
      colors={gradientOpacityColors}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
      }}
    >
      <Text style={styles.title}>Choose your Currency</Text>
      <CurrencyGrayIcon width={190} height={190} />
      <View style={{ width: 208, paddingTop: 64 }}>
        <SelectContent onPress={toggleDropdownSizes}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {/* {currency.symbol} */}
            <SelectText>{currency.currency}</SelectText>
          </View>
          <Svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <Path
              d='M5 7.5L10 12.5L15 7.5'
              stroke='#DB00FF'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </Svg>
        </SelectContent>
        {isDropdownSizesOpen && (
          <Animated.View entering={FadeInUp.duration(800).delay(200)} exiting={FadeOutUp}>
            <SelectDropDownList>
              {CurrencyData.filter((f) => f.currency !== currency.currency).map(
                (f: any, i: number) => (
                  <Pressable
                    key={i}
                    onPress={() => [setCurrency(f), toggleDropdownSizes()]}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {f.symbol}
                    <SelectListText>{f.currency}</SelectListText>
                  </Pressable>
                ),
              )}
            </SelectDropDownList>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  )
}

export default Currency

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: COLORS.textClr,
    fontFamily: FONT_FAMILY.ArvoRegular,
    textAlign: 'center',
    paddingBottom: 24,
  },
})

const SelectContent = styled.Pressable`
  border-color: ${COLORS.textSecondaryClr};
  border-width: 1px;
  padding: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const SelectDropDownList = styled.View`
  border-color: ${COLORS.dropDownClr};
  border-width: 1px;
  border-radius: 5px;
  margin-top: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
`

const SelectText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.textSecondaryClr};
`
const SelectListText = styled.Text`
  font-size: 14px;
  font-family: ${FONT_FAMILY.ArvoRegular};
  color: ${COLORS.SecondaryTwo};
  padding-horizontal: 12px;
  padding-vertical: 7px;
`
