import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import ReportDatePicker from "./DatePicker"
import {getRequest} from "../../utils/getRequest";
import {setAnimalsLabel, setCatsLabel, setDogsLabel, setPeriodLabel} from "../../store/i18n/i18n";
import {postRequest} from "../../utils/postRequest";
import {
    setCats,
    setCreateReportMode,
    setDogs,
    setEditReportMode,
    setReport,
    setReports,
    setReportText,
    setReportTitle
} from "../../store/reports/reports";
import LanguageDropdown from "../SharedElements/LanguageDropdown";
import UploadForm from "./UploadForm";
import {Button, Input} from "antd";

import "./style.scss"

const {TextArea} = Input;

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
    const [reportToAddLanguage, setReportToAddLanguage] = useState(activeLanguage);

    const id = report._id;

    useEffect(() => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCatsLabel(res[activeLanguage].reports["cats-label"]))
                dispatch(setDogsLabel(res[activeLanguage].reports["dogs-label"]))
                dispatch(setPeriodLabel(res[activeLanguage].reports["period-label"]))
                dispatch(setAnimalsLabel(res[activeLanguage].reports["animals-label"]))
            });
    }, [activeLanguage])

    const handleLanguageChange = value => {
        setReportToAddLanguage(value);
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

            postRequest(`${process.env.REACT_APP_BACKEND_URL}/reports/${id}`, dataEdit, 'PATCH')
                .then(() => getRequest(`${process.env.REACT_APP_BACKEND_URL}/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`))
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

            postRequest(`${process.env.REACT_APP_BACKEND_URL}/reports?${new URLSearchParams({"lang": activeLanguage})}`, dataCreate, 'POST')
                .then(() => getRequest(`${process.env.REACT_APP_BACKEND_URL}/reports?${new URLSearchParams({"lang": activeLanguage})}`))
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
        <div className="reports-container--form-container">
            <div className="reports-container--form-container--title-input">
                <Input type="text"
                       placeholder="Title"
                       value={toEdit ? report[reportToAddLanguage]?.title : title}
                       autoFocus
                       onChange={event => toEdit ? dispatch(setReportTitle({
                           language: reportToAddLanguage,
                           title: event.target.value
                       })) : setTitle(event.target.value)}/>
                <LanguageDropdown handleLanguageChange={handleLanguageChange} activeLanguage={activeLanguage}/>
            </div>
            <div className="reports-container--form-container--form">
                <div className="reports-container--form-container--inputs">
                    <label>{catsLabel}</label>
                    <Input
                        type="number"
                        min="0"
                        value={toEdit ? report.sterilized?.cats : cats}
                        onChange={event => toEdit ? dispatch(setCats(event.target.value)) : setCatsLocal(event.target.value)}/>
                </div>
                <div className="reports-container--form-container--inputs">
                    <label>{dogsLabel}</label>
                    <Input type="number"
                           min="0"
                           value={toEdit ? report.sterilized?.dogs : dogs}
                           onChange={event => toEdit ? dispatch(setDogs(event.target.value)) : setDogsLocal(event.target.value)}/>
                </div>
                <div className="reports-container--form-container--inputs">
                    <label>{periodLabel}</label>
                    <ReportDatePicker/>
                </div>
            </div>
            <TextArea value={toEdit ? report[activeLanguage]?.text : text}
                      rows="5"
                      placeholder="Description"
                      onChange={event => toEdit ? dispatch(setReportText({
                          language: reportToAddLanguage,
                          text: event.target.value
                      })) : setText(event.target.value)}/>
            <UploadForm/>
            <div className="reports-container--buttons-container">
                <Button onClick={cancelButtonHandler}>{cancelButton}</Button>
                <Button type="primary" onClick={saveButtonHandler}>{saveButton}</Button>
            </div>
        </div>
    )
}

export default Editor;
