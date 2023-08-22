import { FooterProps } from "./Footer.props";
import { format } from "date-fns";

export const Footer: React.FC<FooterProps> = ({ className, ...props }) => {
    return (
        <footer
            className={`${className} bg-primary py-[25px] px-[30px] grid  grid-cols-footer_mobile md:grid-cols-footer gap-x-10 gap-y-[10px] text-white text-base leading-5`}
            {...props}
        >
            <div>
                OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены
            </div>
            <a className="hover:text-gray_light" href="#" target="_blank">
                Пользовательское соглашение
            </a>
            <a className="hover:text-gray_light" href="#" target="_blank">
                Политика конфиденциальности
            </a>
        </footer>
    );
};
