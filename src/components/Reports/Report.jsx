import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import Editor from "./Editor";
import {getRequest} from "../../utils/getRequest";
import {setEditReportMode, setReport, setReports} from "../../store/reports/reports";
import {deleteRequest} from "../../utils/deleteRequest";
import moment from "moment";

const Report = () => {
    const dispatch = useDispatch();

    const report = useSelector(state => state.reports.report);
    const isEditReportMode = useSelector(state => state.reports.isEditReportMode);

    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const deleteButton = useSelector(state => state.i18n.buttons.deleteButton);

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const {id} = useParams();
    const {[activeLanguage]: {title, text} = ""} = report;
    const {sterilized: {cats, dogs} = ""} = report;

    useEffect(() => {
        getRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setReport(res)));
    }, [isEditReportMode]);

    const handleEdit = () => {
        getRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            // .then(res => dispatch(setReport(res)))
            .then(() => dispatch(setEditReportMode(true)))
    }

    const handleDelete = () => {
        deleteRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(() => getRequest(`http://localhost:3001/reports?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setReports(res))));
    }

    const readReportLayout = () => (
        <>
            <h1>{title}</h1>
            {text}
            {cats}
            {dogs}
            {report.period?.length && report.period?.map(date => moment(date).format())}
            <button onClick={handleEdit}>{editButton}</button>
            <button onClick={handleDelete}>{deleteButton}</button>
        </>
    );

    return (
        <div>
            { isEditReportMode ? <Editor/> : readReportLayout() }
        </div>
    )
}

export default Report;
