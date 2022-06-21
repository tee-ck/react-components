import React from "react";

import "./Divider.scss";

interface DividerProps extends React.HTMLProps<HTMLDivElement> {

}

const Divider: React.FC<DividerProps> = (props: DividerProps) => {
    const {children, style: _style, ...rest} = props;
    const style: React.CSSProperties = {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        padding: ".3rem .5rem",
        ..._style,
    };

    return (
        <div style={style} {...rest}>
            <span style={{position: "absolute", display: "block", width: "100%", borderTop: "1px solid lightgrey", top: "50%"}}/>
            <span style={{position: "absolute", background: "white", padding: "0 .5rem"}}>{children}</span>
            <span style={{visibility: "hidden"}}>{children}</span>
        </div>
    );
};

export default Divider;