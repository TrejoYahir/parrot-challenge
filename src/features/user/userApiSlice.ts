import { apiSlice } from "../../app/api/apiSlice"
import { IUser, IUserResponse } from "../../shared/Interfaces"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<IUser, void>({
      query: () => '/api/v1/users/me',
      transformResponse: (response: IUserResponse) => {
        return response.result
      },
    })
  })
})

export const {
  useGetUserQuery,
} = userApiSlice

export default userApiSlice