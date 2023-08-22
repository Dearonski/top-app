import { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./Input.props";

export const Input = forwardRef(
    (
        { className, error, ...props }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div className={`relative ${className}`}>
                <input
                    className={` py-[7px] px-[15px] text-black outline-primary bg-white shadow-card rounded-[5px] text-base leading-[22px] placeholder:text-gray_input 
                    ${error && "border-[1px] border-red"}`}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <span className="absolute -bottom-5 left-0 text-red">
                        {error.message}
                    </span>
                )}
            </div>
        );
    }
);
