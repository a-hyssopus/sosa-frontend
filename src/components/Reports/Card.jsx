import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {getRequest} from "../../utils/getRequest";
import {setEditReportMode, setReport, setReports} from "../../store/reports/reports";

import {Button, Card} from "antd";
import {deleteRequest} from "../../utils/deleteRequest";
import DeleteConfirmPopup from "../SharedElements/DeleteConfirmPopup";
const {Meta} = Card;

const ReportCard = ({ title = '', src = '', id = '' }) => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const deleteButton = useSelector(state => state.i18n.buttons.deleteButton);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const handleReportOnClick = () => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => dispatch(setReport(res)))
    }

    const handleEdit = () => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(() => dispatch(setEditReportMode(true)))
            .then(() => history(`/reports/${id}`));
    }

    const confirmDeleteHandler = () => {
        deleteRequest(`${process.env.REACT_APP_BACKEND_URL}/reports/${id}?${new URLSearchParams({"lang": activeLanguage})}`, JSON.stringify({}))
            .then(() => getRequest(`${process.env.REACT_APP_BACKEND_URL}/reports?${new URLSearchParams({"lang": activeLanguage})}`)
                .then(res => dispatch(setReports(res))));
    }

    return (
        <div className="reports-container--card">
            <Link to={`/reports/${id}`}>
                <Card
                    hoverable
                    onClick={handleReportOnClick}
                    // style={{width: 300}}
                    cover={<img src={src}
                                className="ant-card--image"
                                // style={{maxWidth: "300px", minHeight: "300px", maxHeight: "260px",  objectFit: "cover"}}
                    />}
                >
                    <Meta title={title}/>
                </Card>
            </Link>
            {isLoggedIn && <>
                <Button onClick={handleEdit}>{editButton}</Button>
                <DeleteConfirmPopup confirmDeleteHandler={confirmDeleteHandler}>
                    <Button danger>{deleteButton}</Button>
                </DeleteConfirmPopup>
            </>}
        </div>
    )
}

export default ReportCard;
