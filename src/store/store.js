import { configureStore } from '@reduxjs/toolkit'
import i18nReducer from "./i18n.js"

export const store = configureStore({
    reducer: {
        i18n: i18nReducer,
    },
})
