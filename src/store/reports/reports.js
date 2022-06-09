import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    reports: [],
    report: {
        images: [],
        period: [],
        sterilized: {
            cats: 0,
            dogs: 0
        },
        money: 0
    },
    isEditReportMode: false,
    isCreateReportMode: false,
}

export const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        setReports: (state, {payload}) => {
            state.reports = payload;
        },
        setReport: (state, {payload}) => {
            state.report = payload;
        },
        setReportTitle: (state, {payload}) => {
            state.report[payload.language].title = payload.title;
        },
        setReportText: (state, {payload}) => {
            state.report[payload.language].text = payload.text;
        },
        setCats: (state, {payload}) => {
            state.report.sterilized.cats = payload;
        },
        setDogs: (state, {payload}) => {
            state.report.sterilized.dogs = payload;
        },
        setPeriod: (state, {payload}) => {
            state.report.period = payload;
        },
        setReportImages: (state, {payload}) => {
            state.report.images = [...state.report.images, payload];
        },
        deleteReportImage: (state, {payload}) => {
            state.report.images = state.report.images.filter(({uid}) => uid !== payload)
        },
        setEditReportMode: (state, {payload}) => {
            state.isEditReportMode = payload;
        },
        setCreateReportMode: (state, {payload}) => {
            state.isCreateReportMode = payload;
        }
    },
})

export const {
    setReports,
    setReport,
    setEditReportMode,
    setCreateReportMode,
    setReportText,
    setReportTitle,
    setCats,
    setDogs,
    setPeriod,
    setReportImages,
    deleteReportImage,
} = reportsSlice.actions

export default reportsSlice.reducer
