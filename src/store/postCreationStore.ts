import create from 'zustand'

// Define the store state shape
interface IPostCreationData {
  postcreation: {
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
  }
  setPostCreation: (newPostCreation: Partial<IPostCreationData['postcreation']>) => void
}

// Create the Zustand store
export const PostCreationStore = create<IPostCreationData>((set) => ({
  postcreation: {
    style: {
      title: null,
      type: null,
    },
    color: null,
    image: {
      title: null,
      design: {
        name: null,
        image: null,
      },
    },
    text: {
      title: null,
      design: {
        font: null,
        color: null,
      },
    },
  },
  setPostCreation: (newPostCreation) => set({ postcreation: { ...newPostCreation } }),
}))
