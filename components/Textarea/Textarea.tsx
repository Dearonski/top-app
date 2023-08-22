import { ForwardedRef, forwardRef } from "react";
import { TextAreaProps } from "./Textarea.props";

export const Textarea = forwardRef(
    (
        { className, error, ...props }: TextAreaProps,
        ref: ForwardedRef<HTMLTextAreaElement>
    ) => {
        return (
            <div className={`relative ${className}`}>
                <textarea
                    className={`py-[7px] px-[15px] text-black outline-primary bg-white shadow-card rounded-[5px] text-base leading-[22px] placeholder:text-gray_input w-full ${
                        error && "border-[1px] border-red"
                    }`}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <span className="absolute text-red -bottom-[15px] left-0">
                        {error.message}
                    </span>
                )}
            </div>
        );
    }
);
