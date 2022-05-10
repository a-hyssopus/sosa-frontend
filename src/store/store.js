import { configureStore } from '@reduxjs/toolkit'
import i18nReducer from "./i18n.js"
import sterilizationCounterReducer from "./sterilizationCounter"

export const store = configureStore({
    reducer: {
        i18n: i18nReducer,
        sterilizationCounter: sterilizationCounterReducer,
    }
})

