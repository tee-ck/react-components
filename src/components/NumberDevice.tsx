import React from "react";

import "./NumberDevice.scss";

import Input, {InputNumberRef} from "./Input";

interface NumberDeviceProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "value"> {
    onChange?(value: string): void;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    value?: number | string | bigint;
    decimal?: number;
    currency?: string;
}

interface NumberDeviceComponent extends React.FC<NumberDeviceProps> {

}

const NumberDevice: NumberDeviceComponent = React.memo((props: NumberDeviceProps) => {
    const {className: _className, onChange, size, value: _value, decimal: _decimal, currency, ...rest} = props;

    const className = ["number-device", _className].filter(Boolean).join(" ");
    const inputEl = React.useRef<InputNumberRef>(null);

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
                inputEl.current?.command("push", key);
                break;
            case "00":
                inputEl.current?.command("push", "0");
                inputEl.current?.command("push", "0");
                break;
            case "AC":
                inputEl.current?.command("clear");
                break;
        }
    };

    const handleChange = (value: string) => {
        onChange && onChange(value);
    };

    return (
        <div className={className} data-size={size} {...rest}>
            <Input.Number ref={inputEl} value={_value} decimal={_decimal} currency={currency} onChange={handleChange} />

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
});
NumberDevice.defaultProps = {
    size: "sm",
    value: 0,
    decimal: 2,
    currency: ""
};

export default NumberDevice;