import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import storeReducer from '../features/store/storeSlice'
import { configureStore } from "@reduxjs/toolkit";
import { EmptyObject, PreloadedState } from "redux";
import { RootState } from "../app/store";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

type ReducerTypes = RootState

export const getMockStore = (state?: PreloadedState<ReducerTypes & EmptyObject>) => {
  const preloadedState = state || {}

  return configureStore({
      reducer: {
        auth: authReducer,
        user: userReducer,
        store: storeReducer,
      },
      preloadedState,
    })
}

export const Wrapper = (children: React.ReactNode)  => {
  const store = getMockStore()
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  )
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
