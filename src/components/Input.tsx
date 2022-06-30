import React from "react";
import {CgClose} from "react-icons/cg";
import {MdCheck} from "react-icons/md";

import "./Input.scss";

export class BigFloat {
    private value: bigint;
    private readonly decimal: number;

    constructor(num: number | string | bigint | BigFloat, decimal: number = 0) {
        if (num instanceof BigFloat) {
            this.value = num.value;
            this.decimal = num.decimal;

            return;
        }

        if (!(typeof num === "bigint" || typeof num === "number" || typeof num === "string")) {
            throw new Error("Numeric constructor argument must be a number, string, bigint or BigFloat");
        }

        this.decimal = decimal;
        if (this.decimal > 0) {
            switch (typeof num) {
                case "number":
                    this.value = (BigInt(num) * BigInt(10 ** this.decimal)) + BigInt(num % 1 * 10 ** this.decimal);
                    break;
                case "string":
                    this.value = (BigInt(num.slice(0, num.length - this.decimal - 1)) * BigInt(10 ** this.decimal)) + (BigInt(num.slice(num.indexOf(".") + 1)) % BigInt(10 ** this.decimal));
                    break;
                case "bigint":
                    this.value = num;
                    break;
            }
        } else {
            this.value = BigInt(num);
        }
    }

    public increase(): BigFloat {
        this.value++;

        return this;
    }

    public decrease(): BigFloat {
        this.value--;

        return this;
    }

    public append(num: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"): BigFloat {
        if (this.value === 0n) {
            this.value = BigInt(num);

        } else {
            this.value *= BigInt(10)
            this.value += BigInt(num);
        }

        return this;
    }

    public removeLast(): BigFloat {
        if (this.value === 0n) {
            return this;
        }

        this.value /= BigInt(10);
        return this;
    }

    public negate(): BigFloat {
        this.value = -this.value;

        return this;
    }

    public clean(): BigFloat {
        this.value = 0n;

        return this;
    }

    public isEqual(num: BigFloat): boolean {
        return this.value === num.value && this.decimal === num.decimal;
    }

    public toString(): string {
        const absolute = (this.value < 0 ? -this.value : this.value).toString();

        if (this.decimal > 0) {
            if (absolute.length <= this.decimal) {
                return `${this.value < 0 ? "-" : ""}0.${absolute.padStart(this.decimal, "0")}`;

            } else {
                return `${this.value < 0 ? "-" : ""}${absolute.slice(0, absolute.length - this.decimal)}.${absolute.slice(absolute.length - this.decimal)}`;
            }
        }

        return absolute;
    }
}

interface InputComponent extends React.FC<InputProps> {
    Textarea: React.FC<InputTextareaProps>;
    Switch: React.FC<InputSwitchProps>;
    CheckBox: React.FC<InputCheckBoxProps>;
    Search: React.FC<InputSearchProps>;
    Number: React.FC<InputNumberProps>;
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    onValueChange?(value: string): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
    onEnter?(event: React.KeyboardEvent<HTMLInputElement>): void;
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week";
}

const Input: InputComponent = (props: InputProps) => {
    const {className: _className, onChange, onKeyDown, onEnter, onValueChange, value, disabled, readOnly, ...rest} = props;
    const className = ["input", _className].filter(Boolean).join(" ");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyDown && onKeyDown(event);

        event.key === "Enter" && onEnter && onEnter(event);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onValueChange && onValueChange(e.target.value);
    };

    return (
        <input className={className} aria-disabled={disabled} aria-readonly={readOnly} disabled={disabled} readOnly={readOnly} value={value} {...rest} onKeyDown={handleKeyDown} onChange={handleChange}/>
    );
};

interface InputTextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
    onChange?(event: React.ChangeEvent<HTMLTextAreaElement>): void;
    onValueChange?(value: string): void;
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    rows?: number;
}

Input.Textarea = (props: InputTextareaProps) => {
    const {className: _className, onChange, onValueChange, disabled, readOnly, ...rest} = props;
    const className = ["input", "textarea", _className].filter(Boolean).join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(e);
        onValueChange && onValueChange(e.target.value);
    };

    return (
        <textarea className={className} aria-disabled={disabled} aria-readonly={readOnly} disabled={disabled} readOnly={readOnly} {...rest} onChange={handleChange}/>
    );
};
Input.Textarea.displayName = "Input.Textarea";
Input.Textarea.defaultProps = {
    rows: 5,
};

interface InputSwitchProps extends Omit<React.HTMLProps<HTMLDivElement>, "onChange"> {
    onChange?(checked: boolean): void;
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    checked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}

Input.Switch = (props: InputSwitchProps) => {
    const {className: _className, checked: _checked, onChange, onClick, disabled, readOnly, ...rest} = props;
    const className = ["switch-container", _className].filter(Boolean).join(" ");

    const [checked, setChecked] = React.useState<boolean>(_checked);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!disabled && !readOnly) {
            setChecked(!checked);
        }

        onClick && onClick(e);
    };

    React.useEffect(() => {
        onChange && onChange(checked);

    }, [checked]);

    React.useEffect(() => {
        setChecked(_checked);

    }, [_checked]);

    return (
        <div role="switch" tabIndex={0} className={className} aria-disabled={disabled} aria-readonly={readOnly} aria-checked={checked} {...rest} onClick={handleClick}>
            <div className="switch-liner"/>
            <div className="switch" style={{visibility: "hidden"}}/>
            <div className="switch spinner"/>
            <div className="switch" style={{visibility: "hidden"}}/>
        </div>
    )
};
Input.Switch.displayName = "Input.Switch";
Input.Switch.defaultProps = {
    checked: false,
};

interface InputCheckBoxProps extends Omit<React.HTMLProps<HTMLDivElement>, "onChange"> {
    onChange?(checked: boolean): void;
    checked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}
Input.CheckBox = (props: InputCheckBoxProps) => {
    const {className: _className, onChange, checked: _checked, disabled, readOnly, ...rest} = props;
    const className = ["checkbox-container", _className].filter(Boolean).join(" ");

    const [checked, setChecked] = React.useState<boolean>(_checked);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!disabled && !readOnly) {
            setChecked(!checked);
        }
    };

    React.useEffect(() => {
        onChange && onChange(checked);

    }, [checked]);

    React.useEffect(() => {
        setChecked(_checked);

    }, [_checked]);

    return (
        <div role="checkbox" tabIndex={0} className={className} aria-disabled={disabled} aria-readonly={readOnly} aria-checked={checked} {...rest} onClick={handleClick}>
            <MdCheck/>
        </div>
    );
};
Input.CheckBox.displayName = "Input.CheckBox";
Input.CheckBox.defaultProps = {
    checked: false,
};

interface InputSearchProps extends Omit<React.HTMLProps<HTMLDivElement>, "onChange"> {
    onFocus?(event: React.FocusEvent<HTMLDivElement>): void;
    onBlur?(event: React.FocusEvent<HTMLDivElement>): void;
    onBeforeInput?(event: React.CompositionEvent<HTMLDivElement>): void;
    onChange?(value: string): void;
    value?: string;
    readOnly?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

Input.Search = (props: InputSearchProps) => {
    const {className: _className, value: _value, placeholder, onFocus, onBlur, onBeforeInput, onChange, readOnly, disabled, ...rest} = props;
    const className = ["input", "search", _className].filter(Boolean).join(" ");

    const searchEl = React.useRef<HTMLDivElement>(null);

    const [focus, setFocus] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>(_value);

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        if (readOnly || disabled) {
            e.preventDefault();
            return;
        }

        setFocus(true);
        onFocus && onFocus(e);

        if (searchEl.current) {
            searchEl.current.focus();
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setFocus(false);
        onBlur && onBlur(e);
    };

    const handleBeforeInput = (e: React.CompositionEvent<HTMLDivElement>) => {
        onBeforeInput && onBeforeInput(e);
        if (readOnly || disabled) {
            e.preventDefault();
            return;
        }

        if (["\n", "\r", "\r\n"].includes(e.data)) {
            e.preventDefault();
        }
    };

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        setValue((e.target as HTMLDivElement).innerText);
    };

    const handleClear = () => {
        searchEl.current.innerText = "";
        setValue("");
    };

    React.useEffect(() => {
        onChange && onChange(value);

    }, [value]);

    React.useEffect(() => {
        setValue(_value);

    }, [_value]);

    return (
        <div role={"searchbox"} className={`${className}${focus ? " focused" : ""}`} tabIndex={0} aria-disabled={disabled} aria-readonly={readOnly} {...rest} onFocus={handleFocus} onBlur={handleBlur}>
            {value === "" && placeholder && <span className="placeholder" tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>{placeholder}</span>}
            <div ref={searchEl} role={"search"} tabIndex={0} contentEditable={!readOnly && !disabled} onFocus={handleFocus} onBlur={handleBlur} onBeforeInput={handleBeforeInput} onInput={handleInput}/>
            {value !== "" && <CgClose style={{cursor: "pointer"}} onClick={handleClear}/>}
        </div>
    );
};
Input.Search.displayName = "Input.Search";
Input.Search.defaultProps = {
    placeholder: "Search",
    value: "",
};

interface InputNumberProps extends Omit<React.HTMLProps<HTMLDivElement>, "onChange"> {
    onChange?(value: string): void;
    onEnter?(e: React.KeyboardEvent<HTMLDivElement>): void;
    value?: string | number;
    decimal?: number;
    currency?: string; // e.g. "€" / "£" / "¥" / "₩"
    disabled?: boolean;
    readonly?: boolean;
}

Input.Number = (props: InputNumberProps) => {
    const {
        className: _className, value: _value, decimal: _decimal, currency: _currency,
        onChange, onKeyDown, onEnter,
        disabled, readOnly, ...rest
    } = props;
    const className = ["input", "input-number", _className].filter(Boolean).join(" ");

    const inputEl = React.useRef<HTMLDivElement>(null);

    const [value, setValue] = React.useState<BigFloat>(new BigFloat(_value, _decimal));
    const [displayValue, setDisplayValue] = React.useState<string>(value.toString());

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown && onKeyDown(e);
        const interrupt = () => {
            e.preventDefault();
            e.stopPropagation();
        };

        if (readOnly || disabled) {
            interrupt();
            return;
        }

        if (e.key === "Enter") {
            onEnter && onEnter(e);
            interrupt();
            return;
        }

        if (e.key.match(/^[0-9]$/)) {
            interrupt();
            setDisplayValue(value.append(e.key as "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9").toString());
        }
        switch (e.key) {
            case "Delete":
                interrupt();
                setDisplayValue(value.clean().toString());
                break;
            case "Backspace":
                interrupt();
                setDisplayValue(value.removeLast().toString());
                break;
            case "ArrowUp":
                interrupt();
                setDisplayValue(value.increase().toString());
                break;
            case "ArrowDown":
                interrupt();
                setDisplayValue(value.decrease().toString());
                break;
            case " ":
                interrupt();
                setDisplayValue(value.append("0").append("0").toString());
                break;
            case "-":
                interrupt();
                setDisplayValue(value.negate().toString());
                break;
        }
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (readOnly || disabled) {
            return;
        }

        if (e.deltaY > 0) {
            setDisplayValue(value.decrease().toString());

        } else {
            setDisplayValue(value.increase().toString());
        }
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

    React.useEffect(() => {
        inputEl.current.addEventListener("wheel", e => e.preventDefault());

    }, []);

    return (
        <div ref={inputEl} role="textbox" tabIndex={0} className={className} aria-disabled={disabled} aria-readonly={readOnly} {...rest} onKeyDown={handleKeyDown} onWheel={handleWheel}>
            <span className="currency">{_currency}</span>
            {displayValue}
        </div>
    );
};
Input.Number.displayName = "Input.Number";
Input.Number.defaultProps = {
    value: 0,
    decimal: 2,
};

export default Input;