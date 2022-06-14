import React from "react";

import { DatePicker } from 'antd';
import moment from "moment";

import {useDispatch, useSelector} from "react-redux";

import { setPeriod } from "../../store/reports/reports";
import {dateFormat} from "../../utils/dateFormat";

const { RangePicker } = DatePicker;

const ReportDatePicker = () => {
    const dispatch = useDispatch();

    const period = useSelector(state => state.reports.report.period);
    const formattedPeriod = period?.map(date => moment(date));

    const startDatePlaceholder = useSelector(state => state.i18n.reports["end-date"]);
    const endDatePlaceholder = useSelector(state => state.i18n.reports["start-date"]);

    return (
        <>
            <RangePicker
                value={formattedPeriod}
                format={dateFormat}
                placeholder={[startDatePlaceholder, endDatePlaceholder]}
                onChange={v => {
                    const period = v.map(date => moment(date).format());
                    dispatch(setPeriod(period));
                }}
            />
        </>
    )
}

export default ReportDatePicker;
