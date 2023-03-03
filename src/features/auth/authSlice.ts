import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Credentials } from '../../shared/Interfaces'

const initialState: Credentials = {
  accessToken: null,
  refreshToken: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload
      state.accessToken = access
      state.refreshToken = refresh
    },
    logOut: (state) => {
      state.accessToken = null
      state.refreshToken = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken

export default authSlice.reducer