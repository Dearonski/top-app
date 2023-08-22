import { ForwardedRef, forwardRef } from "react";
import { CardProps } from "./Card.props";

const colors = {
    white: "bg-white",
    blue: "bg-card_blue",
};

export const Card = forwardRef(
    (
        { color = "white", children, className, ...props }: CardProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        return (
            <div
                className={`${className} rounded-[5px] shadow-card ${colors[color]}`}
                {...props}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);
