import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

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
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const report = useSelector(state => state.reports.report);
    const isEditReportMode = useSelector(state => state.reports.isEditReportMode);

    const catsLabel = useSelector(state => state.i18n.reports["cats-label"]);
    const dogsLabel = useSelector(state => state.i18n.reports["dogs-label"]);
    const periodLabel = useSelector(state => state.i18n.reports["period-label"]);
    const moneyLabel = useSelector(state => state.i18n.reports["money-label"]);
    const animalsLabel = useSelector(state => state.i18n.reports["animals-label"]);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const edit = useSelector(state => state.i18n.buttons.edit);
    const deleteButton = useSelector(state => state.i18n.buttons.delete);

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const {id} = useParams();
    const {[activeLanguage]: {title, text} = ""} = report;
    const {sterilized: {cats, dogs} = ""} = report;

    useEffect(() => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setReport(res)))
            .then(() => setIsLoading(false))
    }, [isEditReportMode]);

    const handleEdit = () => {
        dispatch(setEditReportMode(true))
    };

    const confirmDeleteHandler = () => {
        deleteRequest(`${process.env.REACT_APP_BACKEND_URL}/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({}))
            .then(() => {
                getRequest(`${process.env.REACT_APP_BACKEND_URL}/reports?${new URLSearchParams({"lang": activeLanguage})}`)
                    .then(res => {
                        dispatch(setReports(res))
                    }).then(() => history(`/reports`))
            });
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
                    {isLoggedIn && <div className="report-container--buttons">
                        <Button onClick={handleEdit}>{edit}</Button>
                        <DeleteConfirmPopup confirmDeleteHandler={confirmDeleteHandler}>
                            <Button danger>{deleteButton}</Button>
                        </DeleteConfirmPopup>
                    </div>}
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
