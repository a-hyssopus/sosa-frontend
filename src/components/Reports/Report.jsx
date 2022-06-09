import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {getRequest} from "../../utils/getRequest";
import {setEditReportMode, setReport, setReports} from "../../store/reports/reports";
import {deleteRequest} from "../../utils/deleteRequest";
import {setAnimalsLabel, setCatsLabel, setDogsLabel, setMoneyLabel, setPeriodLabel} from "../../store/i18n/i18n";

import Editor from "./Editor";

import {Button} from "antd";
import moment from "moment";
import {dateFormat} from "../../utils/dateFormat";
import CustomImage from "./Image";
import DeleteConfirmPopup from "../SharedElements/DeleteConfirmPopup";
import Spinner from "../SharedElements/Spinner";

const Report = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const report = useSelector(state => state.reports.report);
    const isEditReportMode = useSelector(state => state.reports.isEditReportMode);

    const catsLabel = useSelector(state => state.i18n.reports["cats-label"]);
    const dogsLabel = useSelector(state => state.i18n.reports["dogs-label"]);
    const periodLabel = useSelector(state => state.i18n.reports["period-label"]);
    const moneyLabel = useSelector(state => state.i18n.reports["money-label"]);
    const animalsLabel = useSelector(state => state.i18n.reports["animals-label"]);

    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const deleteButton = useSelector(state => state.i18n.buttons.deleteButton);

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const {id} = useParams();
    const {[activeLanguage]: {title, text} = ""} = report;
    const {sterilized: {cats, dogs} = ""} = report;

    useEffect(() => {
        getRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setReport(res)))
            .then(() => setIsLoading(false))
    }, [isEditReportMode]);

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCatsLabel(res[activeLanguage].reports["cats-label"]))
                dispatch(setDogsLabel(res[activeLanguage].reports["dogs-label"]))
                dispatch(setPeriodLabel(res[activeLanguage].reports["period-label"]))
                dispatch(setMoneyLabel(res[activeLanguage].reports["money-label"]))
                dispatch(setAnimalsLabel(res[activeLanguage].reports["animals-label"]))
            })
    }, [activeLanguage])

    const handleEdit = () => {
        dispatch(setEditReportMode(true))
    };

    const confirmDeleteHandler = () => {
        deleteRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({}))
            .then(() => getRequest(`http://localhost:3001/reports?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setReports(res))));
    };

    const readReportLayout = () => (
        <div className="report-container--parent">
            {isLoading ? <Spinner/> : (
                <>
                    <h1>{title}</h1>
                    <div className="report-container">
                        <div className="report-container--info">
                            <p><span>{periodLabel}</span>: {moment(report?.period?.[0]).format(dateFormat)} — {moment(report?.period?.[1]).format(dateFormat)}</p>
                            <p><span>{animalsLabel}</span>:</p>
                            <ul>
                                <li>{catsLabel} — {cats}</li>
                                <li>{dogsLabel} — {dogs}</li>
                            </ul>
                            <p><span>{moneyLabel}</span>: {report.money} $</p>
                        </div>
                        <div className="report-container--info">
                            <p>{text}</p>
                        </div>
                    </div>
                    <CustomImage/>
                    <div className="report-container--buttons">
                        <Button onClick={handleEdit}>{editButton}</Button>
                        <DeleteConfirmPopup confirmDeleteHandler={confirmDeleteHandler}>
                            <Button danger>{deleteButton}</Button>
                        </DeleteConfirmPopup>
                    </div>
                </>)
            }
        </div>
    );

    return (
        <>
            {isEditReportMode ? <Editor toEdit/> : readReportLayout()}
        </>
    )
}

export default Report;
