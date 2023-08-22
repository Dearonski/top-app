import { Rating } from "../Rating/Rating";
import { ReviewProps } from "./Review.props";
import UserIcon from "./user.svg";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const Review: React.FC<ReviewProps> = ({
    review,
    className,
    ...props
}) => {
    const { name, title, description, createdAt, rating } = review;
    return (
        <div
            className={`grid grid-cols-review_mobile sm:grid-cols-review items-center gap-[10px] text-sm leading-6 ${className}`}
            {...props}
        >
            <UserIcon />
            <div className="col-[titlestart_/_end] sm:col-start-2 sm:col-span-1">
                <span className="font-bold">{name}:</span>&nbsp;&nbsp;
                <span>{title}</span>
            </div>
            <div className="mr-[10px] col-[start_/_dateend] sm:col-start-3 sm:col-span-1">
                {format(new Date(createdAt), "dd MMMM yyyy", { locale: ru })}
            </div>
            <div>
                <Rating rating={rating} />
            </div>
            <div className="col-[start_/_end]">{description}</div>
        </div>
    );
};
