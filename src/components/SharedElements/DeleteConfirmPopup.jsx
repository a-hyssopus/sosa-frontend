import React, {useEffect} from 'react';
import {message, Popconfirm} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../utils/getRequest";
import {setDeleteCancelLabel, setDeleteConfirmLabel, setDeleteTitleLabel} from "../../store/i18n/i18n";

const DeleteConfirmPopup = (props) => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const confirmLabel = useSelector(state => state.i18n.deleteConfirm.confirm);
    const cancelLabel = useSelector(state => state.i18n.deleteConfirm.cancel);
    const popupTitleLabel = useSelector(state => state.i18n.deleteConfirm["popup-title"]);

    useEffect(() => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setDeleteCancelLabel(res[activeLanguage]["delete-confirm"].cancel));
                dispatch(setDeleteConfirmLabel(res[activeLanguage]["delete-confirm"].confirm));
                dispatch(setDeleteTitleLabel(res[activeLanguage]["delete-confirm"]["popup-title"]));
            })
    })

    const confirm = (id = '', bank = '') => {
        message.success(confirmLabel);
        props.confirmDeleteHandler(id, bank);
    };

    const cancel = (e) => {
        message.error(cancelLabel);
    };

    return (
        <Popconfirm
            title={popupTitleLabel}
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">
            {props.children}
        </Popconfirm>
    )
}

export default DeleteConfirmPopup;
