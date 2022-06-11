import {createSlice} from '@reduxjs/toolkit'
import Cookies from "js-cookie";

const initialState = {
    isLoggedIn: Cookies.get('isLoggedInCookie')
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLoggedIn: (state, {payload}) => {
            state.isLoggedIn = payload;
        }
    },
})

export default loginSlice.reducer

export const {setIsLoggedIn} = loginSlice.actions
