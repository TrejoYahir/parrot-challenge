import { apiSlice } from "../../app/api/apiSlice"
import { Product, ProductResponse } from "../../shared/Interfaces"

export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<Product[], string>({
      query: (storeId: string) => `/api/v1/products/?store=${storeId}`,
      transformResponse: (response: ProductResponse) => {
        console.log('store endpoint returning: ', response);
        return response.results
      }
    })
  })
})

export const {
  useGetProductsQuery
} = storeApiSlice