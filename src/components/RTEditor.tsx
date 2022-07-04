import React from "react";
import {MdFormatBold} from "react-icons/md";
import {GrBold} from "react-icons/gr";

import "./RTEditor.scss";

interface RTEditorProps extends Omit<React.HTMLProps<HTMLDivElement>, "onChange"> {
    contentStyle?: React.CSSProperties;
    onChange?(content: string): void;
}

interface RTEditorRef {
    getContent(): string;
    setContent(content: string): void;
    insertText(text: string): void;
    insertNode(node: Node): void;
}

const RTEditor = React.forwardRef<RTEditorRef, RTEditorProps>((props, ref) => {
    const {className: _className, contentStyle, onChange, ...rest} = props;

    const className = ["rt-editor", _className].filter(Boolean).join(" ");
    const editorEl = React.useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();

            const img = document.createElement("img");
            img.src = "https://via.placeholder.com/150";
            img.style.display = "block";
            insertNode(img);
        }
    };

    const getContent = () => {
        if (editorEl.current) {
            return editorEl.current.innerHTML;
        }

        return "";
    };

    const setContent = (content: string) => {
        if (editorEl.current) {
            editorEl.current.innerHTML = content;
        }
    };

    const insertText = (text: string) => {
        return insertNode(document.createTextNode(text));
    };

    const insertNode = (node: Node) => {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) {
            return;
        }

        const range = selection.getRangeAt(0);
        range.deleteContents();

        return range.insertNode(node);
    };

    React.useImperativeHandle(ref, () => ({
        getContent,
        setContent,
        insertText,
        insertNode,
    }), []);

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            if (editorEl.current.innerHTML === "" || editorEl.current.innerHTML === "<br>") {
                editorEl.current.innerHTML = "<div><br></div>";
            }

            onChange && onChange(getContent());
        });
        observer.observe(editorEl.current, {
            childList: true,
            characterData: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
        };

    }, []);

    return (
        <div className={className} {...rest}>
            <div className={"editor-toolbar"}>
                <div className={"editor-toolbar-item"}>
                    <GrBold/>
                </div>
            </div>
            <div ref={editorEl} className={"editor-content"} contentEditable={true} onKeyDown={handleKeyDown} style={contentStyle}>
                <div><br/></div>
            </div>
        </div>
    );
});

export default RTEditor;