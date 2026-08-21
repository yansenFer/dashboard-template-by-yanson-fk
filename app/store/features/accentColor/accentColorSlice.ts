import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const ACCENT_COLORS = {
  orange: { label: 'Orange', value: 'oklch(0.646 0.222 41.116)' },
  gray: { label: 'Gray', value: 'oklch(0.446 0.02 264)' },
  blue: { label: 'Dark Blue', value: 'oklch(0.45 0.18 260)' },
  cyan: { label: 'Cyan', value: 'oklch(0.6 0.13 200)' },
  green: { label: 'Green', value: 'oklch(0.55 0.16 150)' },
  violet: { label: 'Violet', value: 'oklch(0.5 0.22 295)' },
  rose: { label: 'Rose', value: 'oklch(0.55 0.22 20)' },
} as const

export type AccentColorId = keyof typeof ACCENT_COLORS

export interface AccentColorState {
  color: AccentColorId
}

const getInitialColor = (): AccentColorId => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('accentColor') as AccentColorId | null
    if (saved && saved in ACCENT_COLORS) {
      return saved
    }
  }
  return 'orange'
}

const initialState: AccentColorState = {
  color: getInitialColor(),
}

export const accentColorSlice = createSlice({
  name: 'accentColor',
  initialState,
  reducers: {
    setAccentColor: (state, action: PayloadAction<AccentColorId>) => {
      state.color = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('accentColor', action.payload)
      }
    },
  },
})

export const { setAccentColor } = accentColorSlice.actions

export default accentColorSlice.reducer
