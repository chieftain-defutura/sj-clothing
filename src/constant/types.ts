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
  normalPrice: string
  productImage: string | undefined
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
  cartData: ICheckout
  closedItems: number[]
  handleClose: (index: number) => void
}

export interface ICheckout {
  navigation?: any
  id?: string
  style?: string
  color?: string
  textAndImage?: {
    title: string
    position: string
    rate: number
    designs: {
      hashtag: string
      image: string
      originalImage: string
    }
  }
  size?: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
      quantity: number | string
    }
  }
  type?: string
  description?: string
  price?: string
  offerPrice?: string
  gender?: string
  productName?: string
  productImage?: any
  setOpenCheckout: React.Dispatch<React.SetStateAction<boolean>>
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
  fabricImage: string
  sizes: {
    country: string
    gender: string
    sizeVarients: {
      quantity: number
      measurement: number
      show: boolean
      size: string
    }
  }[]
  styles: string
  type: string
}

export interface IAccessory {
  description: string
  normalPrice: string
  offerPrice: string
  productImage: string
  productName: string
  productVideo: string
  styles: string
  type: string
  id: string
}

export interface IMidlevel {
  backSide: boolean
  frontSide: boolean
  leftSide: boolean
  rightSide: boolean
  colors: [
    {
      color: string
      colorName: string
    },
  ]
  description: string
  gender: string
  normalPrice: string
  offerPrice: string
  paymentStatus: string
  productImage: string
  productName: string
  showDesign: boolean
  showTextDesign: boolean
  sizes: {
    country: string
    gender: string
    sizeVarients: {
      measurement: string
      quantity: number
      show: boolean
      size: string
    }[]
  }[]
  styles: string
  type: string
  id: string
}

export interface IDesigns {
  Images: string
  activePost: boolean
  hashTag: string
  type: string
  originalImages: {
    colorCode: string
    url: string
  }[]
  imagePrices: {
    FrontAndBack: string
    LeftAndRight: string
  }
}

export interface IOrder {
  description: string
  gender: string
  id: string
  totalamount: string
  productId: string
  orderStatus: {
    delivery: {
      createdAt: string
      description: string
      status: boolean
    }
    manufacturing: {
      createdAt: string
      description: string
      status: boolean
    }
    orderPlaced: {
      createdAt: string
      description: string
      status: boolean
    }
    readyToShip: {
      createdAt: string
      description: string
      status: boolean
    }
    shipping: {
      createdAt: string
      description: string
      status: boolean
    }
  }
  price: string
  offerPrice: string
  productImage: any
  productName: string
  sizes: {
    country: string
    sizeVarient: {
      measurement: string
      quantity: number
      size: string
    }
  }
  paymentStatus: string
  type: string
  userId: string
}

export interface IRatings {
  userId: string
  productId: string
  orderId: string
  ratings: string
  review: string
}
