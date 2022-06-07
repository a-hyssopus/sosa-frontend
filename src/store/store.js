import {configureStore} from "@reduxjs/toolkit";
import i18nReducer from "./i18n/i18n.js";
import sterilizationCounterReducer from "./sharedUIElements/sterilizationCounter";
import donateReducer from "./sharedUIElements/donate";
import ourStoriesReducer from "./ourStories/ourStories";
import donateInfoToUpdateReducer from "./sharedUIElements/donateInfoToUpdate";
import reportsReducer from "./reports/reports";
import loginReducer from "./login/login";
import aboutUsReducer from "./aboutUs/aboutUs";

export const store = configureStore({
    reducer: {
        i18n: i18nReducer,
        donate: donateReducer,
        donateInfoToUpdate: donateInfoToUpdateReducer,
        sterilizationCounter: sterilizationCounterReducer,
        ourStories: ourStoriesReducer,
        login: loginReducer,
        reports: reportsReducer,
        aboutUs: aboutUsReducer,
    }
})

