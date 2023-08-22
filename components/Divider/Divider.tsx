import { DividerProps } from "./Divider.props";

export const Divider: React.FC<DividerProps> = ({ className, ...props }) => {
    return (
        <hr
            className={`${className} w-full h-px border-none bg-gray_light mt-5 mb-5`}
            {...props}
        />
    );
};
