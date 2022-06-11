import {Image} from 'antd';
import React, {useState} from 'react';
import {useSelector} from "react-redux";

const CustomImage = () => {
    const [visible, setVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const report = useSelector(state => state.reports.report);

    return (
        <>
            <div className="report-container--images-container">
                {report?.images?.length && report?.images?.map((image, index) =>
                    <Image preview={{
                        visible: false,
                    }}
                           key={image.url}
                           src={image?.url}
                           onClick={() => {
                               setVisible(true)
                               setImageIndex(index)
                           }}/>)}
            </div>
            <div
                style={{
                    display: 'none',
                }}
            >
                <Image.PreviewGroup
                    preview={{
                        visible,
                        current: imageIndex,
                        onVisibleChange: (vis) => setVisible(vis),
                    }}
                >
                    {report?.images?.map(image => <Image key={image.url + "previewGroup"} src={image?.url}/>)}
                </Image.PreviewGroup>
            </div>
        </>
    );
};

export default CustomImage;
