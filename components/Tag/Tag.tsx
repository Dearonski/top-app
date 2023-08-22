import { TagProps } from "./Tag.props";

const sizes = {
    s: "text-xs leading-3",
    m: "text-sm leading-[14px]",
};

const colors = {
    ghost: "border-gray_light border-[1px]",
    red: "text-white bg-red_2 font-bold",
    grey: "text-white font-bold bg-gray",
    green: "text-green bg-green_light font-bold",
    primary: "text-primary border-[1px] border-primary",
};

export const Tag: React.FC<TagProps> = ({
    size = "m",
    children,
    color = "ghost",
    href,
    className,
    ...props
}) => {
    return (
        <div
            className={`inline-block rounded-[20px] px-[10px] py-[5px] ${sizes[size]} ${colors[color]} ${className}`}
            {...props}
        >
            {href ? <a href={href}>{children}</a> : <>{children}</>}
        </div>
    );
};
