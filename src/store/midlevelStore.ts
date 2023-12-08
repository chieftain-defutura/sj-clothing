import { create } from 'zustand'

type State = {
  midlevel: {
    isSteps: string
    isSelectedStyle: string
    isSize: {
      country: string
      sizeVarient: {
        size: string
        measurement: string
        quantity: string
      }[]
    }
    isColor: string
    isColorName: string
    isImageOrText: {
      title: string
      position: string
      rate: number
      designs: {
        hashtag: string
        image: string
        originalImage: string
      }
    }
    tempIsImageOrText: {
      title: string
      position: string
      rate: number
      designs: {
        hashtag: string
        image: string
        originalImage: string
      }
    }
    uid: string
  }
}
type Action = {
  updateMidlevel: (midlevel: {
    isSteps: string
    isSelectedStyle: string
    isSize: {
      country: string
      sizeVarient: {
        size: string
        measurement: string
        quantity: string
      }[]
    }
    isColor: string
    isColorName: string
    isImageOrText: {
      title: string
      position: string
      rate: number
      designs: {
        hashtag: string
        image: string
        originalImage: string
      }
    }
    tempIsImageOrText: {
      title: string
      position: string
      rate: number
      designs: {
        hashtag: string
        image: string
        originalImage: string
      }
    }
    uid: string
  }) => void
}

export const MidlevelStore = create<State & Action>((set) => ({
  midlevel: {
    isSteps: '1',
    isSelectedStyle: '',
    isSize: {
      country: '',
      sizeVarient: [
        {
          size: '',
          measurement: '',
          quantity: '',
        },
      ],
    },
    isColor: '',
    isColorName: '',
    isImageOrText: {
      title: '',
      position: '',
      rate: 0,
      designs: {
        hashtag: '',
        image: '',
        originalImage: '',
      },
    },
    tempIsImageOrText: {
      title: '',
      position: '',
      rate: 0,
      designs: {
        hashtag: '',
        image: '',
        originalImage: '',
      },
    },
    uid: '',
  },

  updateMidlevel: (midlevel) => set(() => ({ midlevel })),
}))
