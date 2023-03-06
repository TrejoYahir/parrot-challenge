import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { IStoreState } from '../../shared/Interfaces'

const initialState: IStoreState = {
  stores: [],
  selectedStoreId: null,
}

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStores: (state, action) => {
      return {...state, stores: action.payload }
    },
    setSelectedStoreId: (state, action) => {
      return {...state, selectedStoreId: action.payload }
    },
  },
})

export const { setStores, setSelectedStoreId } = storeSlice.actions

export const selectStores = (state: RootState) => state.store.stores

export const selectSelectedStore = (state: RootState) => {
  return state.store.stores.find(store => store.uuid === state.store.selectedStoreId)
}
export const selectSelectedStoreId = (state: RootState) => state.store.selectedStoreId

export default storeSlice.reducer