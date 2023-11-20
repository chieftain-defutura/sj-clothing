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
  navigation: any
  id: string
  // route: RouteProp<RootStackParamList, 'Checkout'>
  size: {
    country: string
    sizeVarient: {
      size: string
      measurement: string
      quantity: number
    }
  }
  description: string
  price: string
  offerPrice: string
  gender: string
  productName: string
  productImage: any
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
  colors: string[]
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
  OriginalImages: string
  imagePrices: {
    FrontAndBack: string
    LeftAndRight: string
  }
}

export interface IOrder {
  description: string
  gender: string
  id: string
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
    orderplaced: {
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
