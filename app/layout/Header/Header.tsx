"use client";

import { HeaderProps } from "./Header.props";
import Logo from "../logo.svg";
import { ButtonIcon } from "../../../components/ButtonIcon/ButtonIcon";
import { Sidebar } from "../Sidebar/Sidebar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
    const [isOpened, setIsOpened] = useState(false);
    const router = usePathname();

    useEffect(() => {
        setIsOpened(false);
    }, [router]);

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20,
            },
        },
        closed: {
            opacity: 0,
            x: "100%",
        },
    };
    return (
        <header
            className={`${className} grid grid-cols-[1fr_40px] gap-[10px] m-[15px_15px_0_15px]`}
            {...props}
        >
            <Logo />
            <ButtonIcon
                appearance="white"
                icon="menu"
                onClick={() => setIsOpened(true)}
            />
            <motion.div
                className="fixed z-10 top-0 left-0 right-0 bottom-0 bg-body overflow-y-scroll px-[10px] py-5"
                variants={variants}
                initial="closed"
                animate={isOpened ? "opened" : "closed"}
            >
                <Sidebar />
                <ButtonIcon
                    className="fixed z-20 top-[15px] right-[15px]"
                    appearance="white"
                    icon="close"
                    onClick={() => setIsOpened(false)}
                />
            </motion.div>
        </header>
    );
};
