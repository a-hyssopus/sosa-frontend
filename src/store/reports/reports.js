import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    reports: [],
    report: {},
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
        setEditReportMode: (state, {payload}) => {
            state.isEditReportMode = payload;
        },
        setCreateReportMode: (state, {payload}) => {
            state.isCreateReportMode = payload;
        },
        // setEmptyReportInfo: (state) => {
        //     state.report = {};
        // }
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
    setEmptyReportInfo
} = reportsSlice.actions

export default reportsSlice.reducer
