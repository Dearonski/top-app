"use client";

import { useReducer } from "react";
import {
    Htag,
    Tag,
    Advantages,
    HhData,
    Sort,
    Product,
} from "../../../../../components";
import { SortEnum } from "../../../../../components/Sort/Sort.props";
import { TopLevelCategory } from "../../../../../interfaces/page.interface";
import { TopPageProps } from "./TopPageComponent.props";
import { sortReducer } from "../../../../../components/Sort/sort.reducer";

export const TopPageComponent: React.FC<TopPageProps> = ({
    page,
    products,
    firstCategory,
}) => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
        sortReducer,
        { products, sort: SortEnum.Rating }
    );

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    return (
        <div>
            <div className="grid grid-cols-[auto,_1fr] sm:grid-cols-title items-baseline justify-items-start gap-5 mb-[30px]">
                <Htag tag="h1">{page.title}</Htag>
                {products && (
                    <Tag color="grey" size="m">
                        {products.length}
                    </Tag>
                )}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts &&
                    sortedProducts.map((p) => (
                        <Product layout key={p._id} product={p} />
                    ))}
            </div>
            <div className="grid grid-cols-hhTitle items-baseline justify-items-start gap-5">
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color="red" size="m">
                    hh.ru
                </Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && (
                <HhData {...page.hh} />
            )}
            {page.advantages && page.advantages.length > 0 && (
                <>
                    <Htag tag="h2">Преимущества</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            )}
            {page.seoText && (
                <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: page.seoText }}
                ></div>
            )}
            <Htag tag="h2">Получаемые навыки</Htag>
            <div className="space-x-[5px] space-y-[5px]">
                {page.tags.map((t) => (
                    <Tag color="primary" key={t}>
                        {t}
                    </Tag>
                ))}
            </div>
        </div>
    );
};
