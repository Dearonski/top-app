import { ButtonIconProps, icons } from "./ButtonIcon.props";

const styles = {
    primary: "[&>svg>*]:fill-white bg-primary hover:bg-primary_hover",
    white: "bg-white hover:bg-primary [&:hover>svg>*]:fill-white [&>svg>*]:fill-primary",
};

export const ButtonIcon: React.FC<ButtonIconProps> = ({
    appearance,
    icon,
    className,
    ...props
}) => {
    const styleButton = styles[appearance];
    const IconComp = icons[icon];

    return (
        <button
            className={`w-10 h-10 shadow-card rounded-[10px] flex items-center justify-center ${styleButton} ${className}`}
            {...props}
        >
            <IconComp />
        </button>
    );
};
