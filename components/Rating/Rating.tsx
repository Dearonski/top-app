"use client";

import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { useState, KeyboardEvent } from "react";
import StarIcon from "./star.svg";
import { RatingProps } from "./Rating.props";

export const Rating = forwardRef(
    (
        {
            isEditable = false,
            rating,
            error,
            setRating,
            tabIndex,
            ...props
        }: RatingProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
            new Array(5).fill(<></>)
        );
        const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

        useEffect(() => {
            constructRating(rating);
        }, [rating, tabIndex]);

        const computeFocus = (r: number, i: number): number => {
            if (!isEditable) {
                return -1;
            }
            if (!rating && i == 0) {
                return tabIndex ?? 0;
            }
            if (r == i + 1) {
                return tabIndex ?? 0;
            }
            return -1;
        };

        const constructRating = (currentRating: number) => {
            const updatedArray = ratingArray.map(
                (r: JSX.Element, i: number) => {
                    return (
                        <span
                            className={`${
                                isEditable && "cursor-pointer"
                            } inline-block ${
                                i < currentRating && "[&>svg]:fill-primary"
                            } `}
                            onMouseEnter={() => changeDisplay(i + 1)}
                            onMouseLeave={() => changeDisplay(rating)}
                            onClick={() => onClick(i + 1)}
                            tabIndex={computeFocus(rating, i)}
                            onKeyDown={handleKey}
                            ref={(r) => ratingArrayRef.current?.push(r)}
                        >
                            <StarIcon className="mr-[5px] " />
                        </span>
                    );
                }
            );
            setRatingArray(updatedArray);
        };

        const changeDisplay = (i: number) => {
            if (!isEditable) {
                return;
            }
            constructRating(i);
        };

        const onClick = (i: number) => {
            if (!isEditable || !setRating) {
                return;
            }
            setRating(i);
        };

        const handleKey = (e: KeyboardEvent) => {
            if (!isEditable || !setRating) {
                return;
            }
            if (e.code == "ArrowRight" || e.code == "ArrowUp") {
                if (!rating) {
                    setRating(1);
                } else {
                    e.preventDefault();
                    setRating(rating < 5 ? rating + 1 : 5);
                }
                ratingArrayRef.current[rating]?.focus();
            }
            if (e.code == "ArrowLeft" || e.code == "ArrowDown") {
                e.preventDefault();
                setRating(rating > 1 ? rating - 1 : 1);
                ratingArrayRef.current[rating - 2]?.focus();
            }
        };

        return (
            <div
                {...props}
                ref={ref}
                className={`relative ${
                    error && "[&>span>span>svg]:stroke-red"
                }`}
            >
                {ratingArray.map((r, i) => (
                    <span key={i}>{r}</span>
                ))}
                {error && (
                    <span className="absolute -bottom-5 left-0 text-red">
                        {error.message}
                    </span>
                )}
            </div>
        );
    }
);
