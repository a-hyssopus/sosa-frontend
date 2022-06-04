import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {languagesAbbreviation} from "../../utils/languages";

import ReportDatePicker from "./DatePicker"
import {getRequest} from "../../utils/getRequest";
import {setCatsLabel, setDogsLabel, setPeriodLabel} from "../../store/i18n";
import {postRequest} from "../../utils/postRequest";
import {
    setCats,
    setCreateReportMode,
    setDogs,
    setEditReportMode,
    setReport,
    setReportText,
    setReportTitle
} from "../../store/reports/reports";
import LanguageDropdown from "../LanguageDropdown";
import UploadForm from "./UploadForm";

const Editor = () => {
    const dispatch = useDispatch();

    const report = useSelector(state => state.reports.report);
    const isEditReportMode = useSelector(state => state.reports.isEditReportMode);
    const isCreateReportMode = useSelector(state => state.reports.isCreateReportMode);

    const catsLabel = useSelector(state => state.i18n.reports["cats-label"]);
    const dogsLabel = useSelector(state => state.i18n.reports["dogs-label"]);
    const periodLabel = useSelector(state => state.i18n.reports["period-label"]);

    const saveButton = useSelector(state => state.i18n.buttons.saveButton);
    const cancelButton = useSelector(state => state.i18n.buttons.cancelButton);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const [reportToAddLanguage, setReportToAddLanguage] = useState(languagesAbbreviation[0]);

    const id = report._id;

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCatsLabel(res[activeLanguage].reports["cats-label"]))
                dispatch(setDogsLabel(res[activeLanguage].reports["dogs-label"]))
                dispatch(setPeriodLabel(res[activeLanguage].reports["period-label"]))
            })
    })

    const handleLanguageChange = event => {
        setReportToAddLanguage(event.target.value);
    }

    const saveButtonHandler = () => {
        if (isEditReportMode) {
            postRequest(`http://localhost:3001/reports/${id}`, JSON.stringify({
                [reportToAddLanguage]: {title: report[reportToAddLanguage].title, text: report[reportToAddLanguage].text}
            }), 'PATCH')
                .then(() => getRequest(`http://localhost:3001/blog-posts/${id}?${new URLSearchParams({"lang": activeLanguage})}`))
                .then(res => dispatch(setReport(res)))
                .then(() => dispatch(setEditReportMode(false)));
        }

        if (isCreateReportMode) {
            postRequest(`http://localhost:3001/reports?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({
                [reportToAddLanguage]: {title: report[reportToAddLanguage].title, text: report[reportToAddLanguage].text}, date: new Date().toISOString()
            }), 'POST')
                .then(() => getRequest(`http://localhost:3001/blog-posts?${new URLSearchParams({"lang": activeLanguage})}`))
                .then(() => dispatch(setCreateReportMode(false)));
        }
    }

    const cancelButtonHandler = () => {
        dispatch(setEditReportMode(false));
        dispatch(setCreateReportMode(false));
    }

    return (
        <div>
            <input type="text"
                   placeholder="Title"
                   value={report[activeLanguage]?.title}
                   autoFocus
                   onChange={event => dispatch(setReportTitle({
                       language: reportToAddLanguage,
                       title: event.target.value
                   }))}/>
            <LanguageDropdown handleLanguageChange={handleLanguageChange}/>
            <label>{catsLabel}</label>
            <input
                type="number"
                value={report.sterilized?.cats}
                onChange={event => dispatch(setCats(event.target.value))}/>
            <label>{dogsLabel}</label>
            <input type="number"
                   value={report.sterilized?.dogs}
                   onChange={event => dispatch(setDogs(event.target.value))}/>
            <label>{periodLabel}</label>
            <ReportDatePicker/>
            <textarea value={report[activeLanguage]?.text} placeholder="Description"
                      onChange={event => dispatch(setReportText({
                          language: reportToAddLanguage,
                          text: event.target.value
                      }))}/>
            <UploadForm/>
            <button onClick={saveButtonHandler}>{saveButton}</button>
            <button onClick={cancelButtonHandler}>{cancelButton}</button>
        </div>
    )
}

export default Editor;
