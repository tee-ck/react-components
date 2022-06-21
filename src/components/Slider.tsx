import React, {useEffect} from "react";

import "./Slider.scss";

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    min: number;
    max: number;
    value: number;
    step?: number;
    onChange?(value: number): void;
}

const Slider: React.FC<SliderProps> = (props: SliderProps) => {
    const {className: _className, min, max, value: _value, step, onChange, onWheel, ...rest} = props;
    const className = ["slider-container", _className].filter(Boolean).join(" ");

    const containerEl = React.useRef<HTMLDivElement>(null);
    const linerEl = React.useRef<HTMLDivElement>(null);
    const fillEl = React.useRef<HTMLDivElement>(null);
    const thumbEl = React.useRef<HTMLDivElement>(null);
    const [value, setValue] = React.useState<number>(props.value);

    const attachEvent = () => {
        const rect = containerEl.current!.getBoundingClientRect();
        const handleDrag = (e: MouseEvent) => {
            const newValue = Math.min(Math.max(Math.round((e.clientX - rect.left) / rect.width * (max - min) + min), min), max);

            if (newValue !== value) {
                setValue(newValue - newValue % step);
            }
        };

        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", handleDrag);
        });
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        containerEl.current!.focus();
        attachEvent();
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const rect = containerEl.current!.getBoundingClientRect();
        const newValue = Math.min(Math.max(Math.round((e.touches[0].clientX - rect.left) / rect.width * (max - min) + min), min), max);

        if (newValue !== value) {
            setValue(newValue - newValue % step);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case "ArrowDown":
            case "ArrowLeft":
                e.preventDefault();
                setValue(Math.max(value - step, min));
                break;
            case "ArrowUp":
            case "ArrowRight":
                e.preventDefault();
                setValue(Math.min(value + step, max));
                break;
            case "Home":
                e.preventDefault();
                setValue(min);
                break;
            case "End":
                e.preventDefault();
                setValue(max);
                break;
        }
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        containerEl.current!.focus();
        const direction = e.deltaY > 0 ? -1 : 1;

        if (direction === -1) {
            setValue(Math.max(value - step, min));

        } else {
            setValue(Math.min(value + step, max));
        }

        onWheel && onWheel(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerEl.current!.getBoundingClientRect();
        const newValue = Math.min(Math.max(Math.round((e.clientX - rect.left) / rect.width * (max - min) + min), min), max);

        if (newValue !== value) {
            setValue(newValue - newValue % step);
        }
    }

    React.useEffect(() => {
        onChange && onChange(value);

        const percentage = (value - min) / (max - min) * 100;
        const linerWidth = linerEl.current!.getBoundingClientRect().width;
        const thumbWidth = thumbEl.current!.getBoundingClientRect().width;
        const usableWidth = linerWidth - thumbWidth;
        thumbEl.current!.style.left = `${percentage * usableWidth / 100}px`;
        fillEl.current!.style.width = `${percentage * usableWidth / 100 + (thumbWidth / 2)}px`;

    }, [value]);

    React.useEffect(() => {
        setValue(_value);

    }, [_value]);

    React.useEffect(() => {
        containerEl.current.addEventListener("wheel", e => e.preventDefault());

    }, []);

    return (
        <div ref={containerEl} role={"slider"} className={className} tabIndex={0} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} {...rest}
             onKeyDown={handleKeyDown} onWheel={handleWheel} onClick={handleClick}>
            <div ref={linerEl} className={"slider-liner"}/>
            <div ref={fillEl} className={"slider-fill"} />
            <div ref={thumbEl} className={"slider-thumb"} onMouseDown={handleMouseDown} onTouchMove={handleTouchMove}/>
        </div>
    );
};
Slider.defaultProps = {
    min: 0,
    max: 100,
    value: 0,
    step: 1,
};

export default Slider;