import {configureStore} from '@reduxjs/toolkit'
import i18nReducer from "./i18n.js"
import sterilizationCounterReducer from "./shared-ui-elements/sterilizationCounter"
import donateReducer from "./shared-ui-elements/donate"
import ourStoriesReducer from "./ourStories/ourStories";

export const store = configureStore({
    reducer: {
        i18n: i18nReducer,
        donate: donateReducer,
        sterilizationCounter: sterilizationCounterReducer,
        ourStories: ourStoriesReducer
    }
})

