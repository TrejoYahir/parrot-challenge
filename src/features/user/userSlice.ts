import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IUser } from '../../shared/Interfaces'

const initialState: Partial<IUser> = {
  email: null,
  username: null,
  uuid: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { username, email, uuid } = action.payload
      return {...state, username, email, uuid }
    },
  },
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer