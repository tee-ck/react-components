import React from "react";
import ReactDOM from "react-dom";

import "./Drawer.scss";

interface DrawerProps extends React.HTMLProps<HTMLDivElement> {
    open?: boolean;
    position?: "left" | "right" | "top" | "bottom";
    animationMs?: number;
    toggle?(): void;
}

const Drawer: React.FC<DrawerProps> = (props: DrawerProps) => {
    const {children, className: _className, open: _open, position, animationMs, toggle, ...rest} = props;
    const className = ["drawer-content", _className].filter(Boolean).join(" ");

    const contentEl = React.useRef<HTMLDivElement>(null);
    const [containerEl,] = React.useState<HTMLDivElement>(() => {
        const elem = document.createElement("div");
        elem.classList.add("drawer-container");

        return elem;
    });
    const [open, setOpen] = React.useState(_open);

    const handleToggle = () => {
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
            document.body.appendChild(containerEl);

            contentEl.current.style.animation = `drawer-open-${position} ${animationMs}ms ease-in-out forwards`;

        } else {
            containerEl.style.animation = `fade-out ${animationMs}ms ease-in-out forwards`;
            contentEl.current.style.animation = `drawer-close-${position} ${animationMs}ms ease-in-out forwards`;

            setTimeout(() => containerEl.remove(), animationMs);
        }

    }, [open]);

    React.useEffect(() => {
        setOpen(_open);

    }, [_open]);

    return ReactDOM.createPortal(
        <div ref={contentEl} className={className} data-position={position} {...rest}>
            {children}
        </div>,
        containerEl
    );
};
Drawer.defaultProps = {
    open: false,
    position: "bottom",
    animationMs: 300,
};

export default Drawer;