import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { ICredentials } from '../../shared/Interfaces'

const initialState: ICredentials = {
  accessToken:  localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
      return { ...state, accessToken: access, refreshToken: refresh }
    },
    logOut: (state) => {
      localStorage.clear()
      return { ...state, access: null, refresh: null }
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export const selectAccessToken = (state: RootState) => state.auth.accessToken
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken

export default authSlice.reducer