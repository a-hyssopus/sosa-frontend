import React from 'react';
import { Upload } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {  deleteReportImage, setReportImages } from "../../store/reports/reports";

const UploadForm = () => {
    const dispatch = useDispatch();

    const images = useSelector(state => state.reports.report.images);

    const onPreview = async (file) => {
        let src = file.url;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }

        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const beforeUploadHandler = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            file.base64 = reader.result;
            dispatch(setReportImages({uid: file.uid, name: file.name, url: file.base64}))
        };
        reader.readAsDataURL(file);
        return false;
    }

    const onRemoveHandler = (file) => {
        dispatch(deleteReportImage(file.uid))
    }

    return (
        <Upload
            accept="image/png, image/jpeg"
            listType="picture-card"
            fileList={images}
            onPreview={onPreview}
            multiple={true}
            onRemove={onRemoveHandler}
            beforeUpload={beforeUploadHandler}
        >
            {'+ Upload'}
        </Upload>
    );
}

export default UploadForm;
