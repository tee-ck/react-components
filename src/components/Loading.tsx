import React from "react";
import ReactDOM from "react-dom";

import "./Loading.scss";

interface LoadingScreenProps extends React.HTMLProps<HTMLDivElement> {
    loading: boolean;
    displayText?: string;
    animationMs?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = (props: LoadingScreenProps) => {
    const {className: _className, loading, displayText, animationMs, ...rest} = props;
    const className = ["loading-screen", _className].filter(Boolean).join(" ");

    const [containerEl,] = React.useState<HTMLDivElement>(() => {
        const elem = document.createElement("div");
        elem.id = "loading-screen-container";

        return elem;
    });

    React.useEffect(() => {
        if (loading) {
            containerEl.style.animation = `fade-in ${animationMs}ms ease-in-out forwards`;
            document.body.appendChild(containerEl);

        } else {
            containerEl.style.animation = `fade-out ${animationMs}ms ease-in-out forwards`;
            setTimeout(() => containerEl.remove(), animationMs);
        }

    }, [loading]);

    return ReactDOM.createPortal(
        <div className={className} {...rest}>
            <LoadingSpinner loading={loading} size={"3rem"} />
            <div style={{marginTop: 5}}>{displayText}</div>
        </div>,
        containerEl
    );
};
LoadingScreen.defaultProps = {
    loading: false,
    displayText: "Loading...",
    animationMs: 300,
};

interface LoadingSpinnerProps extends React.SVGProps<null> {
    loading: boolean;
    size?: number | string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props: LoadingSpinnerProps) => {
    const {className: _className, style: _style, loading, size, ...rest} = props;
    const className = ["loading-spinner", loading && "loading", _className].filter(Boolean).join(" ");
    const style: React.CSSProperties = {
        width: size,
        height: size,
        ..._style,
    };

    return (
        <svg className={className} viewBox="0 0 50 50" {...rest} style={style}>
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
    )
};
LoadingSpinner.defaultProps = {
    loading: false,
    size: "2.5rem",
};

interface LoadingProgressProps extends React.HTMLProps<HTMLDivElement> {
    percentage?: number;
    color?: string;
}

const LoadingProgress: React.FC<LoadingProgressProps> = (props: LoadingProgressProps) => {
    const {className: _className, percentage, color, ...rest} = props;
    const className = ["loading-progress", _className].filter(Boolean).join(" ");

    return (
        <div role="progressbar" className={className} aria-valuenow={percentage} {...rest}>
            <div style={{width: `${percentage}%`}}/>
        </div>
    );
};
LoadingProgress.defaultProps = {
    percentage: 0,
};

const Loading = {
    Screen: LoadingScreen,
    Spinner: LoadingSpinner,
    Progress: LoadingProgress,
};

export default Loading;