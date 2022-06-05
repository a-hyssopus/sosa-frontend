import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {getRequest} from "../../utils/getRequest";
import {setEditReportMode, setReport, setReports} from "../../store/reports/reports";

import {Card} from "antd";
import {deleteRequest} from "../../utils/deleteRequest";
const {Meta} = Card;

const ReportCard = ({ title = '', src = '', id = '' }) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const deleteButton = useSelector(state => state.i18n.buttons.deleteButton);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const handleReportOnClick = () => {
        getRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setReport(res)))
    }

    const handleEdit = () => {
        getRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(() => dispatch(setEditReportMode(true)))
            .then(() => history(`/reports/${id}`));
    }

    const handleDelete = () => {
        deleteRequest(`http://localhost:3001/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({}))
            .then(() => getRequest(`http://localhost:3001/reports?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setReports(res))));
    }

    return (
        <>
            <Link to={`/reports/${id}`}>
                <Card
                    hoverable
                    onClick={handleReportOnClick}
                    style={{width: 240}}
                    cover={<img src={src}/>}
                >
                    <Meta title={title}/>
                </Card>
            </Link>
            {isLoggedIn && <>
                <button onClick={handleEdit}>{editButton}</button>
                <button onClick={handleDelete}>{deleteButton}</button>
            </>}
        </>
    )
}

export default ReportCard;
