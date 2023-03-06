import { ChangeEvent } from "react"

export interface ICredentials {
  accessToken: string | null
  refreshToken: string | null
}

export interface ICredentialsResponse {
  access: string | null
  refresh: string | null
}

export interface IAuthentication {
  username: string
  password: string
}

export interface ISpinnerProps {
  color?: string
  isLoading: boolean
  size?: number
  [x:string]: any
}

export interface IStore {
  uuid: string
  name: string
  availabilityState: string
  providers: IProvider[]
  secret: string
  legacyId: string | null
  organizationUuid: string
  config: IStoreConfig
}

export interface IStoreConfig {
  brandColor: string
  [x:string]: any
}

export interface IProvider {
  [x:string]: any
}

export interface IUser {
  uuid: string | null
  email: string | null
  username: string | null
  stores: IStore[]
}

export interface IUserResponse {
  status: string
  result: IUser
} 

export interface IProduct {
  uuid: string
  name: string
  description: string
  imageUrl: string
  legacyId: string | null
  price: string
  alcoholCount: number
  soldAlone: boolean
  availability: string
  providerAvailability: string | null
  category: ICategory
} 

export interface ICategory {
  uuid: string,
  name: string,
  sortPosition: number
}

export interface IProductResponse {
  status: string
  results: IProduct[]
} 
export interface IStoreProps {
  products: IProduct[]
}

export interface IProductsByCategory {
  products: IProduct[]
  name: string
  uuid: string
}

export interface IStoreState {
  stores: IStore[]
  selectedStoreId: string | null
}

export interface ILoginResponse{
  user: IUser
  credentials: ICredentials
}


export interface ISelectorProps {
  items: any[]
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => unknown
  defaultSelected: string | undefined
  idField: string
  labelField: string
  [x:string]: any
}

export interface IProductBody {
  productId: string,
  availability: "AVAILABLE" | "UNAVAILABLE"
}