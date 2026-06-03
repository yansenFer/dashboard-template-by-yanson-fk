import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DarkModeState {
  isDark: boolean
}

const getInitialIsDark = (): boolean => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('isDark')
    if (saved !== null) {
      return saved === 'true'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return false
}

const initialState: DarkModeState = {
  isDark: getInitialIsDark(),
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('isDark', action.payload ? 'true' : 'false')
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsDark } = darkModeSlice.actions

export default darkModeSlice.reducer
