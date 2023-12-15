import { create } from 'zustand'

type State = {
  Accessory: boolean
  AccessoryName: string
  premiumText: string
  logoVideo: boolean
}
type Action = {
  updateLogoVideo: (logoVideo: boolean) => void
  updateAccessory: (Accessory: boolean) => void
  updatePremiumText: (premiumText: string) => void
}

export const generalStore = create<State & Action>((set) => ({
  Accessory: false,
  logoVideo: false,
  AccessoryName: 'Accessories',
  premiumText: 'comming soon',
  updateAccessory: (Accessory) => set(() => ({ Accessory })),
  updatePremiumText: (premiumText) => set(() => ({ premiumText })),
  updateLogoVideo: (logoVideo) => set(() => ({ logoVideo })),
}))
