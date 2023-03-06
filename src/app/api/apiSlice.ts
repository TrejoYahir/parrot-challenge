import { BaseQueryApi, fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { appLogOut } from '../../features/auth/auth'
import { updateAccessToken } from '../../features/auth/authSlice'
import { TOKEN_ERROR_CODE } from '../../shared/constants'
import { RootState } from '../store'

// define base query
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'same-origin',
  prepareHeaders:(headers, api: any) => {
    // add credentials to requests if access token is defined
    const accessToken = api.getState().auth.accessToken
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

const baseQueryWithRefresh = async (args: string, api: BaseQueryApi, extraOptions: { shout?: boolean }) => {
  let result: any = await baseQuery(args, api,extraOptions)

  // Check if error is caused by expired token
  if (result?.error?.status === 401 && result?.error?.data?.errors[0]?.code === TOKEN_ERROR_CODE) {
    const state = api.getState() as RootState
    const refreshToken = state.auth.refreshToken
    // request new access token
    const newToken = await baseQuery({
      url: '/api/auth/token/refresh',
      method: 'POST',
      body: { refresh: refreshToken }
    }, api, extraOptions)

    // If new access token is provided save it and retry request
    if (!newToken.error && newToken.data) {
      api.dispatch(updateAccessToken(newToken.data))
      result = await baseQuery(args, api, extraOptions)
    } else { // if refresh token is expired or invalid then logout
      appLogOut(api.dispatch)
    }
  } else if (result?.error) {
    appLogOut(api.dispatch) // logout in case of another type of error
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['products'],
  endpoints: builder => ({})
})