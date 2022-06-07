import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCreateReportMode, setReport, setReports} from "../../store/reports/reports";
import ReportCard from "./Card";
import {getRequest} from "../../utils/getRequest";
import Editor from "./Editor";

const Reports = () => {
    const dispatch = useDispatch();

    const reports = useSelector((state) => state.reports.reports);
    const isCreateReportMode = useSelector(state => state.reports.isCreateReportMode);

    const activeLanguage = useSelector((state) => state.i18n.activeLanguage)
    const saveEntryButton = useSelector((state) => state.i18n.buttons.saveEntryButton)
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    useEffect(() => {
        getRequest(`http://localhost:3001/reports?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setReports(res)))
    }, [activeLanguage])

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
        <>
            {isLoggedIn && <button onClick={handleSaveEntryButtonClick}>{saveEntryButton}</button>}
            {reports.length && (
                reports.map(report => (report[activeLanguage] && <ReportCard
                    key={report._id}
                    id={report._id}
                    src={report?.images[0]?.url}
                    title={report[activeLanguage].title}/>))
            )}
        </>
    )

    return (
        <div>
            {isCreateReportMode ? <Editor/> : readReportsLayout()}
        </div>
    )
}

export default Reports;
