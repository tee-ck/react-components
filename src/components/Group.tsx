import React from "react";

import "./Group.scss";

interface GroupProps extends React.HTMLProps<HTMLDivElement> {

}

const Group = (props: GroupProps) => {
    const {className: _className, children, ...rest} = props;
    const className = ["group", _className].filter(Boolean).join(" ");

    return (
        <div className={className} {...rest}>
            {children}
        </div>
    );
};
export default Group;