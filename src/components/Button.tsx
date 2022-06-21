import React from "react";

import "./Button.scss";

export type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";

interface ButtonComponent extends React.FC<ButtonProps> {
    Group: React.FC<ButtonGroupProps>;
}

interface ButtonProps extends React.HTMLProps<HTMLDivElement> {
    variant?: ButtonVariant;
    outlined?: boolean;
}

const Button: ButtonComponent = (props: ButtonProps) => {
    const {children, className: _className, variant, outlined, disabled, ...rest} = props;
    const className = ["button", outlined && "outlined", variant, _className].filter(Boolean).join(" ");

    return (
        <div role="button" tabIndex={0} aria-disabled={disabled} className={className} {...rest}>
            {children}
        </div>
    );
};
Button.defaultProps = {
    variant: "primary",
};

interface ButtonGroupProps extends React.HTMLProps<HTMLDivElement> {

}

Button.Group = (props: ButtonGroupProps) => {
    const {children, className: _className, ...rest} = props;
    const className = ["button-group", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}>
            {children}
        </div>
    );
};
Button.Group.displayName = "Button.Group";

export default Button;