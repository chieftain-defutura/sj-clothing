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

interface CartItem {
  image: any
  product: string
  productName: string
  size: string
  sizeCm: string
  style: string
  styleName: string
  price: string
  priceInr: string
}

export interface CartComponentProps {
  cartData: CartItem[]
  closedItems: number[]
  handleClose: (index: number) => void
}

export interface IPremiumData {
  description: string
  gender: string
  productVideo: string
  id: string
  normalPrice: string
  offerPrice: string
  productImage: string
  productName: string
  sizes: {
    country: string
    gender: string
    sizeVarients: {
      measurement: number
      show: boolean
      size: string
    }
  }[]
  styles: string
  type: string
}
