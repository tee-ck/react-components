import React from "react";

import "./CountDown.scss";

interface CountDownProps extends Omit<React.HTMLProps<HTMLDivElement>, "children"> {
    destination: Date | string;
    children?: React.ReactNode | ((deltas: number[]) => React.ReactNode);
}

const CountDown = (props: CountDownProps) => {
    const {className: _className, destination: _destination, children, ...rest} = props;
    const className = ["countdown", _className].filter(Boolean).join(" ");
    const destination = typeof _destination === "string" ? new Date(_destination) : _destination;

    return (
        <div className={className} {...rest}>
            {typeof children === "function" ? children(diffTime(destination)) : children}
        </div>
    );
};
export default CountDown;

const diffTime = (destination: Date) => {
    const now = new Date();
    const diff = destination.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return [
        days,
        hours,
        minutes,
        seconds,
    ];
};