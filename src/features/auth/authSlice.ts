import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Credentials } from '../../shared/Interfaces'

const initialState: Credentials = {
  accessToken:  localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload
      state.accessToken = access
      state.refreshToken = refresh
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
    },
    logOut: (state) => {
      state.accessToken = null
      state.refreshToken = null
      localStorage.clear()
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken

export default authSlice.reducer