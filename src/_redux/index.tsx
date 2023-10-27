import { configureStore, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { persistReducer, persistStore } from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'
import thunk from 'redux-thunk'

// Original Reducer
const reducer: any = createSlice({
  name: 'state',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action?.payload
    },
    logout: (state) => {
      state.user = {}
    },
  },
})

// Persist Reducer
const persistedReducer: any = persistReducer(
  {
    key: 'root',
    storage: new CookieStorage(Cookies, {
      expiration: {
        default: 1 / 24, // Expire in 1 hour
      },
    }),
  },
  reducer.reducer
)

// Store - Redux
export const store: any = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

// Store - Persist
export const persistor = persistStore(store)

// Dispatcher
export const { setUser: updateUser, logout: logoutApp } = reducer.actions
export const setUser = (user: any) => store.dispatch(updateUser(user))
export const logout = () => store.dispatch(logoutApp())
