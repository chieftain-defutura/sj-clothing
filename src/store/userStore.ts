import type { User } from 'firebase/auth'
import { create } from 'zustand'

interface IUserData {
  email: string
  isNewUser: boolean
}

type State = {
  user: User | null
  userData?: IUserData
  isFetching: boolean
}

type Action = {
  updateFetching: (fetching: boolean) => void
  updateUser: (user: User | null) => void
  updateUserData: (user: IUserData) => void
}

// Create your store, which includes both state and (optionally) actions

export const userStore = create<State & Action>((set) => ({
  user: null,
  isFetching: true,
  updateFetching: (fetching) => set(() => ({ isFetching: fetching })),
  updateUser: (user) => set(() => ({ user })),
  updateUserData: (userData) => set(() => ({ userData })),
}))
