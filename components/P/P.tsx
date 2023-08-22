import { PProps } from "./P.props";

const sizes = {
    s: "text-sm leading-6",
    m: "text-base",
    l: "text-lg leading-[29px]",
};

export const P: React.FC<PProps> = ({
    size = "m",
    children,
    className,
    ...props
}) => {
    return (
        <p className={`${sizes[size]} ${className} `} {...props}>
            {children}
        </p>
    );
};
