import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './features/darkMode/darkModeSlice'
export const store = configureStore({
  reducer: {
    dark: darkModeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
