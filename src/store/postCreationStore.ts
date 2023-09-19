import { create } from 'zustand'

// Define the store state shape
interface IPostCreationData {}

type State = {
  style?: {
    title: string | null
    type: string | null
  }
  color?: string | null
  image?: {
    title: string | null
    design: {
      name: string | null
      image: any
    }
  }
  text?: {
    title: string | null
    design: {
      font: string | null
      color: any
    }
  }
  productandcaption?: {
    product: string | null
    caption: string | null
  }
}

type Action = {
  setStyle: (style?: { title: string | null; type: string | null }) => void
  setColor: (color?: string | null) => void
  setImage: (image?: {
    title: string | null
    design: {
      name: string | null
      image: any
    }
  }) => void
  setText: (text?: {
    title: string | null
    design: {
      font: string | null
      color: any
    }
  }) => void
  setproductandcaption: (productandcaption?: {
    product: string | null
    caption: string | null
  }) => void
}

// Create the Zustand store
export const PostCreationStore = create<State & Action>((set) => ({
  style: {
    title: '',
    type: '',
  },
  color: '',
  image: {
    title: '',
    design: {
      name: '',
      image: '',
    },
  },
  text: {
    title: '',
    design: {
      font: '',
      color: '',
    },
  },
  productandcaption: {
    product: '',
    caption: '',
  },
  setStyle: (style) => set(() => ({ style })),
  setColor: (color) => set(() => ({ color })),
  setImage: (image) => set(() => ({ image })),
  setText: (text) => set(() => ({ text })),
  setproductandcaption: (productandcaption) => set(() => ({ productandcaption })),
}))
