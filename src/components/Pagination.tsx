import React from "react";

import "./Pagination.scss";
import {MdOutlineChevronLeft, MdOutlineChevronRight, MdOutlineFirstPage, MdOutlineLastPage} from "react-icons/md";

interface PaginationProps extends React.HTMLProps<HTMLDivElement> {
    pages: number; // total number of pages
    index: number; // current page
    siblings?: number; // number of pages to display before and after current page
    onIndexChange?(index: number): void;
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {
    const {className: _className, pages, index: _index, siblings, onIndexChange, ...rest} = props;
    const className = ["pagination-container", _className].filter(Boolean).join(" ");

    const [index, setIndex] = React.useState<number>(_index);

    const handleFirstPageClick = () => {
        index > 1 && setIndex(1);
    };

    const handleLastPageClick = () => {
        index < pages && setIndex(pages)
    };

    const handlePrevPageClick = () => {
        index > 1 && setIndex(index - 1);
    };

    const handleNextPageClick = () => {
        index < pages && setIndex(index + 1);
    };

    React.useEffect(() => {
        if (index <= 0 || index > pages) {
            return;
        }
        onIndexChange && onIndexChange(index);

    }, [index]);

    React.useEffect(() => {
        if (_index <= 0 || _index > pages) {
            return;
        }

        setIndex(_index);

    }, [_index]);

    return (
        <div className={className} {...rest}>
            <span className="pagination-item" tabIndex={0} onClick={handleFirstPageClick}><MdOutlineFirstPage/></span>
            <span className="pagination-item" tabIndex={0} onClick={handlePrevPageClick}><MdOutlineChevronLeft/></span>
            {siblings > 0 && new Array(siblings).fill(0).map((_, i) => {
                const _index = index - siblings + i;
                const disabled = _index <= 0;

                return (
                    <span role="button" key={_index} className={`pagination-item${disabled ? " disabled" : ""}`} tabIndex={disabled ? undefined : 0} onClick={() => !disabled && setIndex(_index)}>{!disabled && _index}</span>
                )
            })}
            <span className="pagination-item selected" tabIndex={0}>{index}</span>
            {siblings > 0 && new Array(siblings).fill(0).map((_, i) => {
                const _index = index + i + 1;
                const disabled = _index > pages;

                return (
                    <span role="button" key={_index} className={`pagination-item${disabled ? " disabled" : ""}`} tabIndex={disabled ? undefined : 0} onClick={() => !disabled && setIndex(_index)}>{!disabled && _index}</span>
                )
            })}
            <span className="pagination-item" tabIndex={0} onClick={handleNextPageClick}><MdOutlineChevronRight/></span>
            <span className="pagination-item" tabIndex={0} onClick={handleLastPageClick}><MdOutlineLastPage/></span>
        </div>
    );
};
Pagination.defaultProps = {
    index: 1,
    siblings: 2,
};

export default Pagination;