import { apiSlice } from "../../app/api/apiSlice"
import { IProduct, IProductBody, IProductResponse, IProductsByCategory } from "../../shared/Interfaces"
import { groupByCategory } from "../../shared/util"

export const storeApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<IProductsByCategory[], string>({
      query: (storeId: string) => `/api/v1/products/?store=${storeId}`,
      providesTags: ['products'],
      transformResponse: (response: IProductResponse) => {
        return groupByCategory(response.results || [])
      }
    }),
    updateProduct: builder.mutation<IProductResponse, IProductBody>({
      invalidatesTags: ['products'],
      query: (product: IProductBody) => ({
        url: `/api/v1/products/${product.productId}/availability`,
        method: 'PUT',
        body: { availability: product.availability }
      })
    })
  })
})

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
} = storeApiSlice