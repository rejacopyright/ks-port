import { configureStore, createSlice } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { CookieStorage } from 'redux-persist-cookie-storage'
import thunk from 'redux-thunk'
import Cookies from 'js-cookie'

// Original Reducer
const reducer = createSlice({
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
const persistedReducer = persistReducer(
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
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

// Store - Persist
export const persistor = persistStore(store)

// Dispatcher
export const { setUser: updateUser, logout: logoutApp } = reducer.actions
export const setUser = (user) => store.dispatch(updateUser(user))
export const logout = () => store.dispatch(logoutApp())
