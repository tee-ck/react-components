import React from "react";
import {MdOutlineExpandMore} from "react-icons/md";

import "./Dropdown.scss";

interface DropdownComponent extends React.FC<DropdownProps> {
    Menu: React.FC<DropdownMenuProps>;
    Item: React.FC<DropdownItemProps>;
}

type DropdownState = "opening" | "opened" | "closing" | "closed";

interface DropdownProps extends React.HTMLProps<HTMLDivElement> {
    onFocus?(event: React.FocusEvent<HTMLDivElement>): void;
    onBlur?(event: React.FocusEvent<HTMLDivElement>): void;
    readOnly?: boolean;
    disabled?: boolean;
}

const Dropdown: DropdownComponent = (props: DropdownProps) => {
    const {children, className: _className, onFocus, onBlur, readOnly, disabled, ...rest} = props;
    const className = ["dropdown-container", _className].filter(Boolean).join(" ");

    const [state, setState] = React.useState<DropdownState>("closed");
    const [timer, setTimer] = React.useState<number>(0);

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        if (readOnly || disabled) {
            return;
        }

        if (["opening", "opened", "closing"].includes(state)) {
            return;
        }

        setState("opening");
        window.clearTimeout(timer);
        setTimer(window.setTimeout(() => setState("opened"), 300))

        onFocus && onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (readOnly || disabled) {
            return;
        }

        if (["closing", "closed", "opening"].includes(state)) {
            return;
        }

        setState("closing");
        window.clearTimeout(timer);
        setTimer(window.setTimeout(() => setState("closed"), 300));

        onBlur && onBlur(e);
    };

    return (
        <div className={className} data-state={state} tabIndex={0} aria-readonly={readOnly} aria-disabled={disabled} {...rest} onFocus={handleFocus} onBlur={handleBlur}>
            {children}
        </div>
    );
};

interface DropdownMenuProps extends React.HTMLProps<HTMLDivElement> {

}

Dropdown.Menu = (props: DropdownMenuProps) => {
    const {children, className: _className, ...rest} = props;
    const className = ["dropdown-menu", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}>
            {children}
        </div>
    )
};
Dropdown.Menu.displayName = "Dropdown.Menu";

interface DropdownItemProps extends React.HTMLProps<HTMLDivElement> {
    selected?: boolean;
    caret?: boolean;
}

Dropdown.Item = (props: DropdownItemProps) => {
    const {children, className: _className, selected, caret, ...rest} = props;
    const className = ["dropdown-item", _className].filter(Boolean).join(" ");

    return (
        <div className={className} tabIndex={0} aria-selected={selected} {...rest}>
            {children}
            {caret && <MdOutlineExpandMore/>}
        </div>
    );
};
Dropdown.Item.displayName = "Dropdown.Item";
Dropdown.Item.defaultProps = {
    selected: false,
    caret: false,
};

export default Dropdown;