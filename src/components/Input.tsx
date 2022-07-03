import React from "react";
import {CgClose} from "react-icons/cg";
import {MdCheck} from "react-icons/md";

import "./Input.scss";
import equal from "fast-deep-equal/es6/react";

interface InputComponent extends React.FC<InputProps> {
    Textarea: React.FC<InputTextareaProps>;
    Switch: React.FC<InputSwitchProps>;
    CheckBox: React.FC<InputCheckBoxProps>;
    Search: React.FC<InputSearchProps>;
    Number: React.ForwardRefExoticComponent<React.PropsWithoutRef<InputNumberProps> & React.RefAttributes<InputNumberRef>>;
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
        <input className={className} aria-disabled={disabled} aria-readonly={readOnly} disabled={disabled} readOnly={readOnly} value={value} {...rest} onKeyDown={handleKeyDown}
               onChange={handleChange}/>
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
            <div ref={searchEl} role={"search"} tabIndex={0} contentEditable={!readOnly && !disabled} onFocus={handleFocus} onBlur={handleBlur} onBeforeInput={handleBeforeInput}
                 onInput={handleInput}/>
            {value !== "" && <CgClose style={{cursor: "pointer"}} onClick={handleClear}/>}
        </div>
    );
};
Input.Search.displayName = "Input.Search";
Input.Search.defaultProps = {
    placeholder: "Search",
    value: "",
};

type InputNumberCommands = "increment" | "decrement" | "push" | "clear" | "delete" | "negative";

interface InputNumberProps extends Omit<React.HTMLProps<HTMLDivElement>, "onChange" | "value"> {
    onChange?(value: string): void;

    onKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
    onEnter?(event: React.KeyboardEvent<HTMLDivElement>): void;

    value?: string | number | bigint;
    decimal?: number;
    currency?: string; // e.g. "€" / "£" / "¥" / "₩"
    disabled?: boolean;
    readonly?: boolean;
}

export interface InputNumberRef {
    command(command: InputNumberCommands, payload?: unknown);
    getValue(): bigint;
}

Input.Number = React.memo(React.forwardRef((props: InputNumberProps, ref: React.Ref<InputNumberRef>) => {
    const {
        className: _className, value: _value, decimal: _decimal, currency: _currency,
        onChange, onKeyDown, onEnter,
        disabled, readOnly, ...rest
    } = props;

    const className = ["input", "input-number", _className].filter(Boolean).join(" ");
    const inputEl = React.useRef<HTMLDivElement>(null);

    const [value, setValue] = React.useState<bigint>(0n);

    const formattedValue = React.useMemo((): string => {
        const _value = (value < 0 ? -value : value).toString();
        const _sign = value < 0 ? "-" : "";

        if (_value.length > _decimal) {
            const separation = _value.length - _decimal;
            return `${_sign}${_value.slice(0, separation)}.${_value.slice(separation)}`;

        } else {
            return `${_sign}0.${"0".repeat(_decimal - _value.length)}${_value}`;
        }

    }, [_decimal, value]);

    const command = (command: InputNumberCommands, payload?: unknown) => {
        switch (command) {
            case "increment":
                setValue(value => value + 1n);
                break;
            case "decrement":
                setValue(value => value - 1n);
                break;
            case "push":
                setValue(value => value * 10n + BigInt(payload as string));
                break;
            case "clear":
                setValue(0n);
                break;
            case "delete":
                setValue(value => value / 10n);
                break;
            case "negative":
                setValue(value => -value);
                break;
        }
    };

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
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
            command("push", e.key);
        }
        switch (e.key) {
            case "Delete":
                interrupt();
                command("clear");
                break;
            case "Backspace":
                interrupt();
                command("delete");
                break;
            case "ArrowUp":
                interrupt();
                command("increment");
                break;
            case "ArrowDown":
                interrupt();
                command("decrement");
                break;
            case " ":
                interrupt();
                break;
            case "-":
                interrupt();
                command("negative");
                break;
        }
    }, [command, disabled, readOnly, onEnter, onKeyDown]) as React.KeyboardEventHandler<HTMLDivElement>;

    const handleWheel = React.useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        if (readOnly || disabled) {
            return;
        }

        if (e.deltaY > 0) {
            command("increment");

        } else {
            command("decrement");

        }
    }, [readOnly, disabled]) as React.EventHandler<React.WheelEvent<HTMLDivElement>>;

    React.useImperativeHandle(ref, () => ({
        command,
        getValue: () => value,
    }), []);

    React.useEffect(() => {
        onChange && onChange(formattedValue);

    }, [formattedValue]);

    React.useEffect(() => {
        if (typeof _value === "string") {
            setValue(BigInt(_value.replace(/[^0-9]/g, "")));

        } else {
            setValue(BigInt(_value));
        }

    }, [_value]);

    React.useEffect(() => {
        const wheelHandler = e => e.preventDefault();

        inputEl.current.addEventListener("wheel", wheelHandler);

        return () => {
            inputEl.current.removeEventListener("wheel", wheelHandler);
        }

    }, []);

    return (
        <div ref={inputEl} role="textbox" tabIndex={0} className={className} aria-disabled={disabled} aria-readonly={readOnly} {...rest} onKeyDown={handleKeyDown} onWheel={handleWheel}>
            <span className="currency">{_currency}</span>
            {formattedValue}
        </div>
    );
}), (prevProps, nextProps) => equal(prevProps, nextProps));
Input.Number.displayName = "Input.Number";
Input.Number.defaultProps = {
    value: 0,
    decimal: 2,
};

export default Input;