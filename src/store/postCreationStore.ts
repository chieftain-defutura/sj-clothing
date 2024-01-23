import { create } from 'zustand'
import { IUserPost } from '../constant/types'

type State = {
  post: {
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
    product: string
    caption: string
    uid: string
  }
  editPost: IUserPost | null
  openPost: boolean
}
type Action = {
  updatepost: (post: {
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
    product: string
    caption: string
    uid: string
  }) => void
  updateEditPost: (editPost: IUserPost | null) => void
  updateOpenPost: (fetching: boolean) => void
}

export const PostStore = create<State & Action>((set) => ({
  post: {
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
    product: '',
    caption: '',
    uid: '',
  },
  openPost: true,
  editPost: null,
  updateEditPost: (editPost) => set(() => ({ editPost })),
  updatepost: (post) => set(() => ({ post })),
  updateOpenPost: (fetching) => set(() => ({ openPost: fetching })),
}))
