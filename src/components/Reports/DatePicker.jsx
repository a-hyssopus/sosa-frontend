import React, {useState} from "react";

import { DatePicker } from 'antd';
import moment from "moment";

import { setPeriod } from "../../store/reports/reports"
import {useDispatch, useSelector} from "react-redux";

const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';

const ReportDatePicker = () => {
    const dispatch = useDispatch();

    const period = useSelector(state => state.reports.report.period);
    const formattedPeriod = period?.map(date => moment(date));

    return (
        <>
            <RangePicker
                value={formattedPeriod}
                format={dateFormat}
                onChange={v => {
                    const period = v.map(date => moment(date).format());
                    dispatch(setPeriod(period));
                }}
            />
        </>
    )
}

export default ReportDatePicker;
