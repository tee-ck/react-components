import React from "react";

import "./NumberDevice.scss";

import Input, {BigFloat} from "./Input";

interface NumberDeviceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    onChange?(value: string): void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    value?: number | string;
    decimal?: number;
    currency?: string;
}

const NumberDevice: React.FC<NumberDeviceProps> = (props: NumberDeviceProps) => {
    const {className: _className, onChange, size, value: _value, decimal: _decimal, currency, ...rest} = props;
    const className = ["number-device", _className].filter(Boolean).join(" ");

    const [value, setValue] = React.useState<BigFloat>(new BigFloat(_value, _decimal));
    const [displayValue, setDisplayValue] = React.useState<string>(value.toString());

    const handleKeyClick = (key: string) => {
        switch (key) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                setDisplayValue(value.append(key).toString());
                break;
            case "00":
                setDisplayValue(value.append("0").append("0").toString());
                break;
            case "AC":
                setDisplayValue(value.clean().toString());
                break;
        }
    };

    const handleChange = (value: string) => {
        setValue(new BigFloat(value, _decimal));
    };

    React.useEffect(() => {
        onChange && onChange(displayValue);

    }, [displayValue]);

    React.useEffect(() => {
        setDisplayValue(value.toString());

    }, [value]);

    React.useEffect(() => {
        const __value = new BigFloat(_value, _decimal);
        if (!value.isEqual(__value)) {
            setValue(__value);
        }

    }, [_value]);

    return (
        <div className={className} data-size={size} {...rest}>
            <Input.Number value={displayValue} decimal={_decimal} currency={currency} onChange={handleChange} />

            <div className={"keypad"} style={{marginTop: 5}}>
                {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["AC", "0", "00"]].map((row: string[]) => (
                    <React.Fragment>
                        {row.map((col: string) => (
                            <button key={col} onClick={() => handleKeyClick(col)}>
                                {col}
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
NumberDevice.defaultProps = {
    size: "sm",
    value: 0,
    decimal: 2,
    currency: ""
};

export default NumberDevice;