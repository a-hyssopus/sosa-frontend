import React from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

const Spinner = () => {
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 45,
                color: "#0236D4"
            }}
            spin
        />
    );

    return (
        <Spin size="large" indicator={antIcon} style={{position: "absolute", top: "65%"}}/>
    )
}

export default Spinner;
