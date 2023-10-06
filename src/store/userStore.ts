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
  displayName: string | null
}

type Action = {
  updateFetching: (fetching: boolean) => void
  updateUser: (user: User | null) => void
  updateUserData: (userData: IUserData) => void
  updateName: (name: string | null) => void
}

export const userStore = create<State & Action>((set) => ({
  user: null,
  isFetching: true,
  displayName: null,
  updateFetching: (fetching) => set(() => ({ isFetching: fetching })),
  updateUser: (user) => set(() => ({ user })),
  updateUserData: (userData) => set(() => ({ userData })),
  updateName: (displayName: string | null) => set(() => ({ displayName })),
}))
