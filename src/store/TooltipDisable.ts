import { create } from 'zustand'

type State = {
  disable: boolean
}

type Actions = {
  updateDisable: (newValue: boolean) => void
}

export const tooltipDisableStore = create<State & Actions>((set) => ({
  disable: false,
  updateDisable: (newValue) => set({ disable: newValue }),
}))
