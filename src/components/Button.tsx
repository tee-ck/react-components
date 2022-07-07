import React from "react";

import "./Button.scss";

export type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";

interface ButtonProps extends React.HTMLProps<HTMLDivElement> {
    variant?: ButtonVariant;
    outlined?: boolean;
}

const Button = (props: ButtonProps) => {
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

export default Button;