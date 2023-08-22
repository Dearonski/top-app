"use client";

import { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Rating } from "../Rating/Rating";
import { Textarea } from "../Textarea/Textarea";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import { ReviewFormProps } from "./ReviewForm.props";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { API } from "../../helpers/api";
import axios from "axios";

export const ReviewForm: React.FC<ReviewFormProps> = ({
    productId,
    isOpened,
    className,
    ...props
}) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(
                API.review.createDemo,
                { ...formData, productId }
            );
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError("Что-то пошло не так");
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className={`${className} text-sm leading-6 grid grid-cols-[[start]_1fr_[end]] sm:grid-cols-[[start]_1fr_1fr_[end]] xl:grid-cols-reviewForm gap-y-5 gap-x-[30px] items-center`}
                {...props}
            >
                <Input
                    {...register("name", {
                        required: { value: true, message: "Заполните имя" },
                    })}
                    placeholder="Имя"
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1}
                />
                <Input
                    {...register("title", {
                        required: {
                            value: true,
                            message: "Заполните заголовок",
                        },
                    })}
                    placeholder="Заголовок отзыва"
                    className="xl:justify-self-start"
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                />
                <div className="grid grid-cols-[auto_1fr] gap-5 col-[start_/_end] xl:col-start-3">
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{
                            required: {
                                value: true,
                                message: "Укажите рейтинг",
                            },
                        }}
                        render={({ field }) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>
                <Textarea
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Заполните описание",
                        },
                    })}
                    placeholder="Текст отзыва"
                    className="col-[start_/_end]"
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                />
                <div className="col-[start_/_end]">
                    <Button appearance="primary" tabIndex={isOpened ? 0 : -1}>
                        Отправить
                    </Button>
                    <span className="ml-[15px]">
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </span>
                </div>
            </div>
            {isSuccess && (
                <div className="bg-green_light p-5 relative rounded-[5px] mt-5">
                    <div className="font-bold">Ваш отзыв отправлен</div>
                    <div className="">
                        Спасибо, ваш отзыв будет опубликован после проверки.
                    </div>
                    <CloseIcon
                        className="absolute top-5 right-5 cursor-pointer"
                        onClick={() => setIsSuccess(false)}
                    />
                </div>
            )}
            {error && (
                <div className="bg-red_light p-5 relative rounded-[5px] mt-5 [&>svg>path]:stroke-red">
                    Что-то пошло не так, попробуйте обновить страницу.
                    <CloseIcon
                        className="absolute top-5 right-5 cursor-pointer"
                        onClick={() => setError(undefined)}
                    />
                </div>
            )}
        </form>
    );
};
