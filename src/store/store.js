import {configureStore} from '@reduxjs/toolkit'
import i18nReducer from "./i18n.js"
import sterilizationCounterReducer from "./shared-ui-elements/sterilizationCounter"
import donateReducer from "./shared-ui-elements/donate"
import ourStoriesReducer from "./ourStories/ourStories";
import donateInfoToUpdateReducer from "./shared-ui-elements/donateInfoToUpdate";
import loginReducer from "./login";

export const store = configureStore({
    reducer: {
        i18n: i18nReducer,
        donate: donateReducer,
        donateInfoToUpdate: donateInfoToUpdateReducer,
        sterilizationCounter: sterilizationCounterReducer,
        ourStories: ourStoriesReducer,
        login: loginReducer
    }
})

