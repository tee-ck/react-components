import React from "react";
import ReactDOM from "react-dom";

import {CgCloseO} from "react-icons/cg";

import "./Modal.scss";

interface ModalComponent extends React.FC<ModalProps> {
    Header: React.FC<ModalHeaderProps>;
    Body: React.FC<ModalBodyProps>;
    Footer: React.FC<ModalFooterProps>;
}

interface ModalProps extends React.HTMLProps<HTMLDivElement> {
    open?: boolean;
    managed?: boolean;
    animationMs?: number;
    toggle?(): void;
}

const Modal: ModalComponent = (props: ModalProps) => {
    const {children, className: _className, open: _open, managed, animationMs, toggle, ...rest} = props;
    const className = ["modal-content", _className].filter(Boolean).join(" ");

    const contentEl = React.useRef<HTMLDivElement>(null);
    const [containerEl,] = React.useState<HTMLDivElement>(() => {
        const elem = document.createElement("div");
        elem.classList.add("modal-container");

        return elem;
    });
    const [open, setOpen] = React.useState<boolean>(_open);

    const handleToggle = () => {
        if (managed) {
            setOpen(!open);
        }

        toggle && toggle();
    };

    React.useEffect(() => {
        if (open) {
            containerEl.style.animation = `fade-in ${animationMs}ms ease-in-out forwards`;
            containerEl.onclick = (e: MouseEvent) => {
                if (e.target === containerEl) {
                    handleToggle();
                }
            };
            contentEl.current.style.animation = `modal-open ${animationMs}ms ease-in-out forwards`;

            document.body.appendChild(containerEl);

        } else {
            containerEl.style.animation = `fade-out ${animationMs}ms ease-in-out forwards`;
            contentEl.current.style.animation = `modal-close ${animationMs}ms ease-in-out forwards`;

            setTimeout(() => containerEl.remove(), animationMs);
        }

    }, [open]);

    React.useEffect(() => {
        setOpen(_open);

    }, [_open]);

    return ReactDOM.createPortal(
        <div ref={contentEl} role={"dialog"} className={className} {...rest}>
            {(managed || toggle) && <CgCloseO className={"modal-toggle"} onClick={handleToggle}/>}
            {children}
        </div>,
        containerEl
    );
};
Modal.defaultProps = {
    open: false,
    managed: false,
    animationMs: 300,
};

interface ModalHeaderProps extends React.HTMLProps<HTMLDivElement> {

}

Modal.Header = (props: ModalHeaderProps) => {
    const {className: _className, ...rest} = props;
    const className = ["modal-header", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}/>
    );
};
Modal.Header.displayName = "Modal.Header";

interface ModalBodyProps extends React.HTMLProps<HTMLDivElement> {

}

Modal.Body = (props: ModalBodyProps) => {
    const {className: _className, ...rest} = props;
    const className = ["modal-body", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}/>
    );
}
Modal.Body.displayName = "Modal.Body";

Modal.Footer = (props: ModalFooterProps) => {
    const {className: _className, ...rest} = props;
    const className = ["modal-footer", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}/>
    );
};
Modal.Footer.displayName = "Modal.Footer";

interface ModalFooterProps extends React.HTMLProps<HTMLDivElement> {

}

export default Modal;