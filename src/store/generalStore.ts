import { create } from 'zustand'

type State = {
  Accessory: boolean
  AccessoryName: string
  premiumText: string
}
type Action = {
  updateAccessory: (Accessory: boolean) => void
  updatePremiumText: (premiumText: string) => void
}

export const generalStore = create<State & Action>((set) => ({
  Accessory: false,
  AccessoryName: 'Accessories',
  premiumText: 'comming soon',
  updateAccessory: (Accessory) => set(() => ({ Accessory })),
  updatePremiumText: (premiumText) => set(() => ({ premiumText })),
}))
