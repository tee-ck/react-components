import React from "react";

import "./DatePicker.scss";

interface DatePickerProps extends Omit<React.HTMLProps<HTMLDivElement>, "onChange"> {
    initialDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    minTime?: Date;
    maxTime?: Date;
    timeStep?: number; // in minutes
    format?: string;

    onChange?(date: Date): void;
}

interface DatePickerComponent extends React.FC<DatePickerProps> {

}

const DatePicker: DatePickerComponent = (props) => {
    const {className, initialDate, minDate, maxDate, minTime, maxTime, timeStep, format, onChange, ...rest} = props;

    const classNames = ["date-picker", className].filter(Boolean).join(" ");

    return (
        <div className={classNames} {...rest}>
            <div className="date-picker__input">

            </div>
        </div>
    );
};
export default DatePicker;

const formatDate = (date: Date, format: string) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return format
        .replace(/yyyy/g, year.toString())
        .replace(/MM/g, month.toString().padStart(2, "0"))
        .replace(/dd/g, day.toString().padStart(2, "0"))
        .replace(/HH/g, hours.toString().padStart(2, "0"))
        .replace(/mm/g, minutes.toString().padStart(2, "0"))
        .replace(/ss/g, seconds.toString().padStart(2, "0"))
        .replace(/(am|pm)/gi, hours > 11 ? "pm" : "am");
}