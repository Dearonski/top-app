"use client";

import { SortEnum, SortProps } from "./Sort.props";
import SortIcon from "./sort.svg";

const iconStyle = "[&>svg]:hidden grid-cols-[1fr]";
const iconStyleActive =
    "[&>svg]:block [&>svg]:mr-2 font-bold text-primary grid-cols-[20px,_1fr]";

export const Sort: React.FC<SortProps> = ({
    sort,
    setSort,
    className,
    ...props
}) => {
    return (
        <div
            className={`${className} inline-grid grid-cols-[auto_auto] gap-10`}
            {...props}
        >
            <button
                onClick={() => setSort(SortEnum.Rating)}
                className={`${
                    sort == SortEnum.Rating ? iconStyleActive : iconStyle
                } grid items-center gap-2 cursor-pointer`}
            >
                <SortIcon />
                По рейтингу
            </button>
            <button
                onClick={() => setSort(SortEnum.Price)}
                className={`${
                    sort == SortEnum.Price ? iconStyleActive : iconStyle
                } grid items-center gap-2 cursor-pointer`}
            >
                <SortIcon />
                По цене
            </button>
        </div>
    );
};
