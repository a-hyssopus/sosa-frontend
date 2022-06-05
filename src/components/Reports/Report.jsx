import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import Editor from "./Editor";
import {getRequest} from "../../utils/getRequest";
import {setEditReportMode, setReport, setReports} from "../../store/reports/reports";
import {deleteRequest} from "../../utils/deleteRequest";
import {dateFormat} from "../../utils/dateFormat";
import moment from "moment";
import {setCatsLabel, setDogsLabel, setPeriodLabel} from "../../store/i18n";

const Report = () => {
    const dispatch = useDispatch();

    const report = useSelector(state => state.reports.report);
    const isEditReportMode = useSelector(state => state.reports.isEditReportMode);

    const catsLabel = useSelector(state => state.i18n.reports["cats-label"]);
    const dogsLabel = useSelector(state => state.i18n.reports["dogs-label"]);
    const periodLabel = useSelector(state => state.i18n.reports["period-label"]);

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

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCatsLabel(res[activeLanguage].reports["cats-label"]))
                dispatch(setDogsLabel(res[activeLanguage].reports["dogs-label"]))
                dispatch(setPeriodLabel(res[activeLanguage].reports["period-label"]))
            })
    }, [activeLanguage])

    const handleEdit = () => {
        // getRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
        //     .then(() => dispatch(setEditReportMode(true)))
            dispatch(setEditReportMode(true))
    };

    const handleDelete = () => {
        deleteRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(() => getRequest(`http://localhost:3001/reports?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setReports(res))));
    };


    const readReportLayout = () => (
        <>
            <h1>{title}</h1>
            {catsLabel}: {cats}
            {dogsLabel}: {dogs}
            {periodLabel}: {report.period?.length && report.period?.map(date => moment(date).format(dateFormat))}
            <p>{text}</p>
            {report?.images?.length && report.images.map(image => <img key={image.uid} src={image.url}/>)}
            <button onClick={handleEdit}>{editButton}</button>
            <button onClick={handleDelete}>{deleteButton}</button>
        </>
    );

    return (
        <div>
            { isEditReportMode ? <Editor toEdit/> : readReportLayout() }
        </div>
    )
}

export default Report;
