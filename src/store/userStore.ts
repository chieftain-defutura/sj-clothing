import { User } from 'firebase/auth'
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
  updateUserData: (userData: IUserData) => void
}

export const userStore = create<State & Action>((set) => ({
  user: null,
  isFetching: true,
  updateFetching: (fetching) => set(() => ({ isFetching: fetching })),
  updateUser: (user) => set(() => ({ user })),
  updateUserData: (userData) => set(() => ({ userData })),
}))
