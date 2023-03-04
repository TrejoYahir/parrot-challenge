import { apiSlice } from "../../app/api/apiSlice"
import { User, UserResponse } from "../../shared/Interfaces"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<User, void>({
      query: () => '/api/v1/users/me',
      transformResponse: (response: UserResponse) => {
        return response.result
      },
    })
  })
})

export const {
  useGetUserQuery
} = userApiSlice