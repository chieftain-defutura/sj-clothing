// import { User } from 'firebase/auth'
// import { create } from 'zustand'

// interface IUserData {
//   email: string
//   isNewUser: boolean
//   displayName: string | null
// }

// type State = {
//   user: User | null
//   userData?: IUserData
//   isFetching: boolean
// }

// type Action = {
//   updateFetching: (fetching: boolean) => void
//   updateUser: (user: User | null) => void
//   updateUserData: (userData: IUserData) => void
// }

// export const userStore = create<State & Action>((set) => ({
//   user: null,
//   isFetching: true,
//   updateFetching: (fetching) => set(() => ({ isFetching: fetching })),
//   updateUser: (user) => set(() => ({ user })),
//   updateUserData: (userData) => set(() => ({ userData })),
// }))

import type { User } from 'firebase/auth'
import { create } from 'zustand'

interface IUserData {
  email: string
  isNewUser: boolean
}

type State = {
  user: User | null
  name?: string | null
  Mail?: string | null
  userData?: IUserData
  isFetching: boolean
}

type Action = {
  updateFetching: (fetching: boolean) => void
  updateUser: (user: User | null) => void
  updateUserData: (user: IUserData) => void
  setMail: (Mail?: string | null) => void
  updateUserName: (name: string) => void
}

// Create your store, which includes both state and (optionally) actions

export const userStore = create<State & Action>((set) => ({
  user: null,
  name: null,
  Mail: '',
  isFetching: true,
  updateFetching: (fetching) => set(() => ({ isFetching: fetching })),
  updateUser: (user) => set(() => ({ user })),
  updateUserData: (userData) => set(() => ({ userData })),
  setMail: (Mail) => set(() => ({ Mail })),
  updateUserName: (name) => set(() => ({ name })),
}))
