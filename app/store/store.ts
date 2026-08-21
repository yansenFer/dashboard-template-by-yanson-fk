import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from './features/darkMode/darkModeSlice'
import sidebarReducer from './features/sidebar/sidebarSlice'
import accentColorReducer from './features/accentColor/accentColorSlice'
export const store = configureStore({
  reducer: {
    dark: darkModeReducer,
    sidebar: sidebarReducer,
    accentColor: accentColorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
