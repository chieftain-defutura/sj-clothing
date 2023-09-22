interface Reel {
  id: string
  text: string
  title: string
  description: string
  images: string[]
}

export interface ReelsComponentProps {
  reelsData: Reel[]
}

export interface PremiumCardProps {
  image: any
  productName: string
  price: number
  inr: string
}
