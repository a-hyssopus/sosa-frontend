import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    aboutUs: ""
}

export const aboutUsSlice = createSlice({
    name: 'aboutUs',
    initialState,
    reducers: {
        setAboutUs(state, {payload}) {
            state.aboutUs = payload;
        }
    }
})

export const {setAboutUs} = aboutUsSlice.actions

export default aboutUsSlice.reducer
