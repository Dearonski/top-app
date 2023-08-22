"use client";

import { motion } from "framer-motion";
import ArrowIcon from "./arrow.svg";
import { ButtonProps } from "./Button.props";

const styles = {
    primary:
        "[&>span>svg]:fill-white bg-primary text-white hover:bg-primary_hover",
    ghost: "text-black border-[1px] border-gray_light hover:bg-primary hover:text-white [&:hover>span>svg]:fill-white",
};

const directions = {
    right: "",
    down: "rotate-90",
    none: "hidden",
};

export const Button: React.FC<ButtonProps> = ({
    appearance,
    arrow = "none",
    children,
    className,
    ...props
}) => {
    const styleButton = styles[appearance];
    const styleArrow = directions[arrow];
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            className={`inline-block p-[10px] cursor-pointer rounded-[5px] text-sm  transition-all ${styleButton} ${className}`}
            {...props}
        >
            {children}
            <span
                className={`inline-block ml-[10px] transition-all ${styleArrow}`}
            >
                <ArrowIcon />
            </span>
        </motion.button>
    );
};
