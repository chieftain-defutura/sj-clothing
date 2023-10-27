import { User } from 'firebase/auth'
import { create } from 'zustand'

export interface IUserData {
  name: string
  email: string
  address: string
  profile: string
  phoneNo: number
  isNewUser: boolean
  avatar: {
    gender: string
    skinTone: string
  }
}

type State = {
  user: User | null
  userData?: IUserData | null
  isFetching: boolean
  displayName: string | null
  name: string | null
  email: string | null
  address: string | null
  profile: string | null
  phoneNo: number | null
  avatar: {
    gender: string | null
    skinTone: string | null
  }
}

type Action = {
  updateFetching: (fetching: boolean) => void
  updateUser: (user: User | null) => void
  updateUserData: (userData: IUserData) => void
  updateName: (name: string | null) => void
  // Add actions to update name, email, address, profile, phoneNo, and avatar
  updateProfile: (profile: string | null) => void
  updateEmail: (email: string | null) => void
  updateAddress: (address: string | null) => void
  updatePhoneNo: (phoneNo: number | null) => void
  updateAvatar: (avatar: { gender: string | null; skinTone: string | null }) => void
}

export const userStore = create<State & Action>((set) => ({
  user: null,
  isFetching: true,
  displayName: null,
  name: null,
  email: null,
  address: null,
  profile: null,
  phoneNo: null,
  avatar: {
    gender: null,
    skinTone: null,
  },
  updateFetching: (fetching) => set(() => ({ isFetching: fetching })),
  updateUser: (user) => set(() => ({ user })),
  updateUserData: (userData) => set(() => ({ userData })),
  updateName: (name) => set(() => ({ name })),
  updateProfile: (profile) => set(() => ({ profile })),
  updateEmail: (email) => set(() => ({ email })),
  updateAddress: (address) => set(() => ({ address })),
  updatePhoneNo: (phoneNo) => set(() => ({ phoneNo })),
  updateAvatar: (avatar) => set(() => ({ avatar })),
}))
