import { apiSlice } from '../../app/api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: (credentials) => ({
        url: '/api/auth/token',
        method: 'POST',
        body: credentials
      })
    }),
    refreshToken: build.mutation({
      query: (refreshToken: string) => ({
        url: '/api/auth/token/refresh',
        method: 'POST',
        body: { refresh: refreshToken }
      })
    })
  })
})

export const {
  useLoginMutation
} = authApiSlice