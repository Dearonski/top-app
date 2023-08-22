import { HhAdvantagesProps } from "./Advantages.props";
import CheckIcon from "./check.svg";

export const Advantages: React.FC<HhAdvantagesProps> = ({ advantages }) => {
    return (
        <>
            {advantages.map((a) => (
                <div
                    key={a._id}
                    className="grid grid-cols-[50px,_1fr] gap-y-[10px] gap-x-10 mb-[30px]"
                >
                    <CheckIcon />
                    <div className="self-center font-bold">{a.title}</div>
                    <div className="h-full w-px bg-gray_border justify-self-center"></div>
                    <div>{a.description}</div>
                </div>
            ))}
        </>
    );
};
