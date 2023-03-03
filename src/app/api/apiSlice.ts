import { BaseQueryApi, fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
import { AUTH_ERROR_CODE } from '../../shared/constants'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'same-origin',
  prepareHeaders:(headers, api: any) => {
    const accessToken = api.getState().auth.accessToken
    console.log('base url', import.meta.env.VITE_API_URL)
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

const baseQueryWithRefresh = async (args: string, api: BaseQueryApi, extraOptions: { shout?: boolean }) => {
  console.log('sending request to', args)
  let result: any = await baseQuery(args, api,extraOptions)
  console.log('request result', result)

  // Refresh token if it's expired and retry request
  if (result?.error?.status === 401 && result?.error?.data?.errors[0]?.code === AUTH_ERROR_CODE) {
    const newToken = await baseQuery('/api/auth/token/refresh', api, extraOptions)
    if (newToken) {
      api.dispatch(setCredentials(newToken))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefresh,
  endpoints: builder => ({})
})