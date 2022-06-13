import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCreateReportMode, setReport, setReports} from "../../store/reports/reports";
import ReportCard from "./Card";
import {getRequest} from "../../utils/getRequest";
import Editor from "./Editor";
import {Button} from "antd";

import "./style.scss"
import Spinner from "../SharedElements/Spinner";
import {setAnimalsLabel, setCatsLabel, setDogsLabel, setPeriodLabel} from "../../store/i18n/i18n";

const Reports = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const reports = useSelector((state) => state.reports.reports);
    const isCreateReportMode = useSelector(state => state.reports.isCreateReportMode);

    const activeLanguage = useSelector((state) => state.i18n.activeLanguage)
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    useEffect(() => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/reports?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setReports(res)))
            .then(() => setIsLoading(false));
        return () => {
            dispatch(setReports([]));
        }
    }, [activeLanguage]);

    const handleSaveEntryButtonClick = () => {
        dispatch(setReport({
            images: [],
            period: [],
            sterilized: {
                cats: 0,
                dogs: 0
            }
        }))
        dispatch(setCreateReportMode(true));
    };

    const readReportsLayout = () => (
        <div className={isLoading ? "reports-container reports-container--spinner" : "reports-container"}>
            {isLoading ? <Spinner/> :
                <div className="reports-container--cards">
                    {isLoggedIn && <Button size="large" shape="circle" onClick={handleSaveEntryButtonClick}>+</Button>}
                    {reports.length ? (
                        reports.map(report => (report[activeLanguage] && <ReportCard
                            key={report._id}
                            id={report._id}
                            src={report?.images[0]?.url}
                            title={report[activeLanguage].title}/>))
                    ) : null}
                </div>}
        </div>
    )

    return (
        <>
            {isCreateReportMode ? <Editor/> : readReportsLayout()}
        </>
    )
}

export default Reports;
