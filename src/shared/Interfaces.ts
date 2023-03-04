export interface Credentials {
  accessToken: string | null
  refreshToken: string | null
}

export interface Authentication {
  username: string
  password: string
}

export interface SpinnerProps {
  color?: string
  isLoading: boolean
  size?: number
  [x:string]: any
}

export interface Store {
  uuid: string
  name: string
  availabilityState: string
  providers: Provider[]
  secret: string
  legacyId: string | null
  organizationUuid: string
}

export interface Provider {
  [x:string]: any
}

export interface User {
  uuid: string
  email: string
  username: string
  stores: Store[]
}

export interface UserResponse {
  status: string
  result: User
} 

export interface Product {
  uuid: string
  name: string
  description: string
  imageUrl: string
  legacyId: string | null
  price: string
  alcoholCount: number
  soldAlone: boolean
  availabilityState: string
  providerAvailability: string | null
  category: Category
} 

export interface Category {
  uuid: string,
  name: string,
  sortPosition: number
}

export interface ProductResponse {
  status: string
  results: Product[]
} 