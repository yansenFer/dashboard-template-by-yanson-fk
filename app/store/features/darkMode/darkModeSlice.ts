import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DarkModeState {
  isDark: boolean
}

const initialState: DarkModeState = {
  isDark: false,
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setIsDark } = darkModeSlice.actions

export default darkModeSlice.reducer
