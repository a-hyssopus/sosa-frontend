import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    backgroundFade: true
}

export const backgroundFadeSlice = createSlice({
    name: 'backgroundFade',
    initialState,
    reducers: {
        toggleBackgroundFade: (state) => {
            state.backgroundFade = !state.backgroundFade;
        },
    },
})

export const { toggleBackgroundFade } = backgroundFadeSlice.actions

export default backgroundFadeSlice.reducer
