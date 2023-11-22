import { User } from 'firebase/auth'
import { create } from 'zustand'

export interface IUserData {
  name: string
  email: string
  profile: string
  phoneNo: number
  isNewUser: boolean
  avatar: {
    gender: string
    skinTone: string
  }
  language: string
  address: [
    {
      fullAddress: string
      floor: string
      landMark: string
      saveAsAddress: string
    },
  ]
  rate: number
  orderId: string
  confirmDetails: boolean
}

type State = {
  user: User | null
  userData?: IUserData | null
  isFetching: boolean
  displayName: string | null
  name: string | null
  email: string | null
  profile: string | null
  phoneNo: number | null
  avatar: {
    gender: string | null
    skinTone: string | null
  }
  language: string | null
  address: [
    {
      fullAddress: string | null
      floor: string | null
      landMark: string | null
      saveAsAddress: string | null
    },
  ]
  currency: {
    symbol: string | null
    currency: string | null
    abrive: string | null
  }
  rate: number | null
  orderId: string | null
  confirmDetails: boolean
  createAvatarAnimationFinished: boolean
}

type Action = {
  updateFetching: (fetching: boolean) => void
  updateUser: (user: User | null) => void
  updateUserData: (userData: IUserData) => void
  updateName: (name: string | null) => void
  // Add actions to update name, email, address, profile, phoneNo, and avatar
  updateProfile: (profile: string | null) => void
  updateEmail: (email: string | null) => void
  updatePhoneNo: (phoneNo: number | null) => void
  updateAddress: (
    address: [
      {
        fullAddress: string
        floor: string
        landMark: string
        saveAsAddress: string
      },
    ],
  ) => void
  updateAvatar: (avatar: { gender: string | null; skinTone: string | null }) => void
  updateLanguage: (language: string | null) => void
  updateCurrency: (currency: { symbol: string; currency: string; abrive: string }) => void
  updateOderId: (orderId: string | null) => void
  updateRate: (rate: number | null) => void
  updateConfirmDetails: (confirmDetails: boolean) => void
  updateAnimation: (value: boolean) => void
}

export const userStore = create<State & Action>((set) => ({
  user: null,
  isFetching: true,
  displayName: null,
  name: null,
  email: null,
  profile: null,
  phoneNo: null,
  avatar: {
    gender: null,
    skinTone: '3',
  },
  language: 'en',
  address: [
    {
      fullAddress: null,
      floor: null,
      landMark: null,
      saveAsAddress: null,
    },
  ],
  currency: {
    symbol: '€',
    currency: 'EUR',
    abrive: 'EUR',
  },
  rate: null,
  orderId: null,
  confirmDetails: false,
  createAvatarAnimationFinished: false,
  updateFetching: (fetching) => set(() => ({ isFetching: fetching })),
  updateUser: (user) => set(() => ({ user })),
  updateUserData: (userData) => set(() => ({ userData })),
  updateName: (name) => set(() => ({ name })),
  updateProfile: (profile) => set(() => ({ profile })),
  updateEmail: (email) => set(() => ({ email })),
  updatePhoneNo: (phoneNo) => set(() => ({ phoneNo })),
  updateAddress: (address) => set(() => ({ address })),
  updateAvatar: (avatar) => set(() => ({ avatar })),
  updateLanguage: (language) => set(() => ({ language })),
  updateCurrency: (currency) => set(() => ({ currency })),
  updateOderId: (orderId) => set(() => ({ orderId })),
  updateRate: (rate) => set(() => ({ rate })),
  updateConfirmDetails: (confirmDetails) => set(() => ({ confirmDetails })),
  updateAnimation: (value) => set(() => ({ createAvatarAnimationFinished: value })),
}))
