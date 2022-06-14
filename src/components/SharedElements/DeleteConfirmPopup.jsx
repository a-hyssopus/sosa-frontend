import React from 'react';
import {message, Popconfirm} from 'antd';
import {useDispatch, useSelector} from "react-redux";

const DeleteConfirmPopup = (props) => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const confirmLabel = useSelector(state => state.i18n.deleteConfirm.confirm);
    const cancelLabel = useSelector(state => state.i18n.deleteConfirm.cancel);
    const yesLabel = useSelector(state => state.i18n.deleteConfirm.yes);
    const noLabel = useSelector(state => state.i18n.deleteConfirm.no);
    const popupTitleLabel = useSelector(state => state.i18n.deleteConfirm["popup-title"]);

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
            okText={yesLabel}
            cancelText={noLabel}>
            {props.children}
        </Popconfirm>
    )
}

export default DeleteConfirmPopup;
