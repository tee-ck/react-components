import React from "react";

import "./Card.scss";

interface CardComponent extends React.FC<CardProps> {
    Header: React.FC<CardHeaderProps>;
    Body: React.FC<CardBodyProps>;
    Footer: React.FC<CardFooterProps>;
}

interface CardProps extends React.HTMLProps<HTMLDivElement> {

}

const Card: CardComponent = (props: CardProps) => {
    const {children, className: _className, ...rest} = props;
    const className = ["card-container", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}>
            {children}
        </div>
    );
};

interface CardHeaderProps extends React.HTMLProps<HTMLDivElement> {

}

Card.Header = (props: CardHeaderProps) => {
    const {children, className: _className, ...rest} = props;
    const className = ["card-header", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}>
            {children}
        </div>
    );
};
Card.Header.displayName = "Card.Header";

interface CardBodyProps extends React.HTMLProps<HTMLDivElement> {

}

Card.Body = (props: CardBodyProps) => {
    const {children, className: _className, ...rest} = props;
    const className = ["card-body", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}>
            {children}
        </div>
    );
};
Card.Body.displayName = "Card.Body";

interface CardFooterProps extends React.HTMLProps<HTMLDivElement> {

}

Card.Footer = (props: CardFooterProps) => {
    const {children, className: _className, ...rest} = props;
    const className = ["card-footer", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}>
            {children}
        </div>
    );
};
Card.Footer.displayName = "Card.Footer";

export default Card;