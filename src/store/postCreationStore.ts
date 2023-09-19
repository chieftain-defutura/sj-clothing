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
  },
  setPostCreation: (newPostCreation) => set({ postcreation: { ...newPostCreation } }),
}))
