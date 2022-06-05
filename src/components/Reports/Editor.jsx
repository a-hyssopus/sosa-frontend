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
    setReport, setReports,
    setReportText,
    setReportTitle
} from "../../store/reports/reports";
import LanguageDropdown from "../LanguageDropdown";
import UploadForm from "./UploadForm";

const Editor = ({toEdit, toCreate}) => {
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

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [cats, setCatsLocal] = useState(0);
    const [dogs, setDogsLocal] = useState(0);
    const [reportToAddLanguage, setReportToAddLanguage] = useState(languagesAbbreviation[0]);

    const id = report._id;

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCatsLabel(res[activeLanguage].reports["cats-label"]))
                dispatch(setDogsLabel(res[activeLanguage].reports["dogs-label"]))
                dispatch(setPeriodLabel(res[activeLanguage].reports["period-label"]))
            })
    }, [activeLanguage])

    const handleLanguageChange = event => {
        setReportToAddLanguage(event.target.value);
    }

    const saveButtonHandler = () => {
        if (isEditReportMode) {
            const dataEdit = JSON.stringify({
                [reportToAddLanguage]: {
                    title: report?.[reportToAddLanguage]?.title,
                    text: report?.[reportToAddLanguage]?.text
                },
                images: report.images,
                sterilized: {cats: report?.sterilized?.cats, dogs: report?.sterilized?.dogs},
                period: report.period
            })

            postRequest(`http://localhost:3001/reports/${id}`, dataEdit, 'PATCH')
                .then(() => getRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`))
                .then(res => dispatch(setReport(res)))
                .then(() => dispatch(setEditReportMode(false)))
        }

        if (isCreateReportMode) {
            const dataCreate = JSON.stringify({
                images: report.images,
                period: report.period,
                sterilized: {cats, dogs},
                [reportToAddLanguage]: {title, text}
            })

            postRequest(`http://localhost:3001/reports?${new URLSearchParams({"lang": activeLanguage})}`, dataCreate, 'POST')
                .then(() => getRequest(`http://localhost:3001/reports?${new URLSearchParams({"lang": activeLanguage})}`))
                .then(res => dispatch(setReports(res)))
                .then(() => dispatch(setCreateReportMode(false)));
        }
    }

    const cancelButtonHandler = () => {
        dispatch(setEditReportMode(false));
        dispatch(setCreateReportMode(false))
        dispatch(setReport({}))
    }

    return (
        <div>
            <input type="text"
                   placeholder="Title"
                   value={toEdit ? report[activeLanguage]?.title : title}
                   autoFocus
                   onChange={toEdit ? event => dispatch(setReportTitle({
                       language: reportToAddLanguage,
                       title: event.target.value
                   })) : event => setTitle(event.target.value)}/>
            <LanguageDropdown handleLanguageChange={handleLanguageChange}/>
            <label>{catsLabel}</label>
            <input
                type="number"
                value={toEdit ? report.sterilized?.cats : cats}
                onChange={toEdit ? event => dispatch(setCats(event.target.value)) : event => setCatsLocal(event.target.value)}/>
            <label>{dogsLabel}</label>
            <input type="number"
                   value={toEdit ? report.sterilized?.dogs : dogs}
                   onChange={toEdit ? event => dispatch(setDogs(event.target.value)) : event => setDogsLocal(event.target.value)}/>
            <label>{periodLabel}</label>
            <ReportDatePicker/>
            <textarea value={toEdit ? report[activeLanguage]?.text : text} placeholder="Description"
                      onChange={toEdit ? event => dispatch(setReportText({
                          language: reportToAddLanguage,
                          text: event.target.value
                      })) : event => setText(event.target.value)}/>
            <UploadForm/>
            <button onClick={saveButtonHandler}>{saveButton}</button>
            <button onClick={cancelButtonHandler}>{cancelButton}</button>
        </div>
    )
}

export default Editor;
