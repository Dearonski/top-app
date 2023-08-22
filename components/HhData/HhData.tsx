import { priceRu } from "../../helpers/helpers";
import { Card } from "../Card/Card";
import { HhDataProps } from "./HhData.props";
import RateIcon from "./rate.svg";

export const HhData: React.FC<HhDataProps> = ({
    count,
    juniorSalary,
    middleSalary,
    seniorSalary,
}) => {
    return (
        <div className="grid xl:grid-cols-hhData gap-[30px] grid-cols-[1fr]">
            <Card className="p-5 text-center">
                <div className="font-light text-xl leading-[27px] mb-[10px]">
                    Всего вакансий
                </div>
                <div className="font-bold text-4xl leading-[49px] text-primary">
                    {count}
                </div>
            </Card>
            <Card className="grid sm:grid-cols-salary p-5 text-center sm:[&>div]:border-r-[1px] sm:[&>div]:border-b-0 [&>div]:border-gray_light last:[&>div]:border-none gap-y-5 [&>div]:border-b-[1px] [&>div]:pb-5 sm:[&>div]:pb-0">
                <div>
                    <div className="font-light text-xl leading-[27px] mb-[10px]">
                        Начальный
                    </div>
                    <div className="font-bold text-[26px] leading-[35px] mb-[10px]">
                        {priceRu(juniorSalary)}
                    </div>
                    <div className="grid grid-cols-[repeat(3,_20px)] gap-[10px] justify-center">
                        <RateIcon className="[&>circle]:fill-red" />
                        <RateIcon />
                        <RateIcon />
                    </div>
                </div>
                <div>
                    <div className="font-light text-xl leading-[27px] mb-[10px]">
                        Средний
                    </div>
                    <div className="font-bold text-[26px] leading-[35px] mb-[10px]">
                        {priceRu(middleSalary)}
                    </div>
                    <div className="grid grid-cols-[repeat(3,_20px)] gap-[10px] justify-center">
                        <RateIcon className="[&>circle]:fill-red" />
                        <RateIcon className="[&>circle]:fill-red" />
                        <RateIcon />
                    </div>
                </div>
                <div>
                    <div className="font-light text-xl leading-[27px] mb-[10px]">
                        Профессионал
                    </div>
                    <div className="font-bold text-[26px] leading-[35px] mb-[10px]">
                        {priceRu(seniorSalary)}
                    </div>
                    <div className="grid grid-cols-[repeat(3,_20px)] gap-[10px] justify-center">
                        <RateIcon className="[&>circle]:fill-red" />
                        <RateIcon className="[&>circle]:fill-red" />
                        <RateIcon className="[&>circle]:fill-red" />
                    </div>
                </div>
            </Card>
        </div>
    );
};
