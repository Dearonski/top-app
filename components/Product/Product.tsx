"use client";

import { declOfNum, priceRu } from "../../helpers/helpers";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { Divider } from "../Divider/Divider";
import { Rating } from "../Rating/Rating";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { Tag } from "../Tag/Tag";
import { ProductProps } from "./Product.props";
import Image from "next/image";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Product = motion(
    forwardRef(
        (
            { product, className, ...props }: ProductProps,
            ref: ForwardedRef<HTMLDivElement>
        ) => {
            const [isReviewOpened, setIsReviewOpened] =
                useState<boolean>(false);
            const reviewRef = useRef<HTMLDivElement>(null);

            const variants = {
                visible: { opacity: 1, height: "auto" },
                hidden: { opacity: 0, height: 0, overflow: "hidden" },
            };

            const scrollToReview = () => {
                setIsReviewOpened(true);
                reviewRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                reviewRef.current?.focus();
            };

            return (
                <div className={`${className}`} {...props} ref={ref}>
                    <Card className="grid mt-[30px] grid-areas-product_mobile grid-cols-product_mobile sm:grid-cols-product_middle sm:grid-areas-product_middle p-10 xl:grid-cols-product xl:grid-areas-product">
                        <div className="grid-in-logo mb-5 xl:mb-0">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_DOMAIN +
                                    product.image
                                }
                                alt={product.title}
                                width={70}
                                height={70}
                                className="rounded-[5px]"
                            />
                        </div>
                        <div className="grid-in-title font-semibold text-[20px] leading-[27px] self-end">
                            {product.title}
                        </div>
                        <div className="grid-in-price whitespace-nowrap mb-[10px] sm:mb-0 text-[20px] leading-[27px] self-end">
                            {priceRu(product.price)}
                            {product.oldPrice && (
                                <Tag color="green" className="ml-[5px]">
                                    {priceRu(product.price - product.oldPrice)}
                                </Tag>
                            )}
                        </div>
                        <div className="grid-in-credit mb-[10px] sm:mb-0 text-[20px] leading-[27px] self-end">
                            {priceRu(product.credit)}/
                            <span className="text-sm leading-[19px]">мес</span>
                        </div>
                        <div className="grid-in-rating whitespace-nowrap mb-[10px] sm:mb-0 self-end">
                            <Rating
                                rating={
                                    product.reviewAvg ?? product.initialRating
                                }
                            />
                        </div>
                        <div className="grid-in-tags mb-5 sm:mb-0 space-x-[5px]">
                            {product.categories.map((c) => (
                                <Tag key={c} className="mt-[7px]" color="ghost">
                                    {c}
                                </Tag>
                            ))}
                        </div>
                        <div className="grid-in-priceTitle whitespace-nowrap font-light text-sm leading-[19px]">
                            цена
                        </div>
                        <div className="grid-in-creditTitle font-light text-sm leading-[19px]">
                            кредит
                        </div>
                        <div className="grid-in-rateTitle whitespace-nowrap font-light text-sm leading-[19px]">
                            <a
                                href="#ref"
                                onClick={scrollToReview}
                                className="text-primary"
                            >
                                {product.reviewCount}{" "}
                                {declOfNum(product.reviewCount, [
                                    "отзыв",
                                    "отзыва",
                                    "отзывов",
                                ])}
                            </a>
                        </div>
                        <Divider className="grid-in-hr" />
                        <div className="grid-in-description text-base leading-6 mb-[15px]">
                            {product.description}
                        </div>
                        <div className="grid-in-feature mb-5 xl:mb-0">
                            {product.characteristics.map((c) => (
                                <div
                                    key={c.name}
                                    className="grid grid-cols-[auto,_1fr,_auto] pr-[60px] text-base leading-8 items-baseline gap-[10px]"
                                >
                                    <span className="font-bold">{c.name}</span>
                                    <span className="border-b-[1px] border-dashed border-gray_light mb-[5px]"></span>
                                    <span>{c.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="grid-in-advBlock text-base leading-[22px]">
                            {product.advantages && (
                                <div className="border-l-2 border-l-green_2 pl-[15px] mb-5">
                                    <div className="font-bold mb-[5px]">
                                        Преимущества
                                    </div>
                                    <div>{product.advantages}</div>
                                </div>
                            )}
                            {product.disadvantages && (
                                <div className="border-l-2 border-l-red pl-[15px]">
                                    <div className="font-bold mb-[5px]">
                                        Недостатки
                                    </div>
                                    <div>{product.disadvantages}</div>
                                </div>
                            )}
                        </div>
                        <Divider className="grid-in-hr2" />
                        <div className="grid-in-actions grid  grid-cols-[1fr] sm:grid-cols-[1fr_1fr] sm:justify-self-start gap-5">
                            <Button appearance="primary">
                                Узнать подробнее
                            </Button>
                            <Button
                                appearance="ghost"
                                arrow={isReviewOpened ? "down" : "right"}
                                onClick={() =>
                                    setIsReviewOpened(!isReviewOpened)
                                }
                            >
                                Читать отзывы
                            </Button>
                        </div>
                    </Card>
                    <motion.div
                        animate={isReviewOpened ? "visible" : "hidden"}
                        variants={variants}
                        initial="hidden"
                        ref={reviewRef}
                        tabIndex={isReviewOpened ? 0 : -1}
                    >
                        <Card color="blue" className="p-[30px]">
                            {product.reviews.map((r) => (
                                <div key={r._id}>
                                    <Review review={r} />
                                    <Divider />
                                </div>
                            ))}
                            <ReviewForm
                                productId={product._id}
                                isOpened={isReviewOpened}
                            />
                        </Card>
                    </motion.div>
                </div>
            );
        }
    )
);
