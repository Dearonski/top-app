"use client";

import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { useContext, KeyboardEvent } from "react";
import { AppContext } from "../../context/app.context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion } from "framer-motion";

const firstLevelActive = "text-primary [&>svg]:fill-primary";

export const Menu = () => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const path = usePathname();

    const variants = {
        visible: {
            marginBottom: 10,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        hidden: { marginBottom: 0 },
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            height: "auto",
            marginBottom: 10,
        },
        hidden: { opacity: 0, height: 0, marginBottom: 0 },
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu &&
            setMenu(
                menu.map((m) => {
                    if (m._id.secondCategory == secondCategory) {
                        m.isOpened = !m.isOpened;
                    }
                    return m;
                })
            );
    };

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code == "Space" || key.code == "Enter") {
            key.preventDefault();
            openSecondLevel(secondCategory);
        }
    };

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map((menu) => (
                    <div key={menu.route}>
                        <Link href={`/${menu.route}`}>
                            <div
                                className={`grid grid-cols-firstLevelMenu gap-5 items-center text-lg leading-[25px] mt-5 font-medium hover:text-primary [&:hover>svg]:fill-primary ${
                                    menu.id == firstCategory && firstLevelActive
                                }`}
                            >
                                {menu.icon}
                                <span>{menu.name}</span>
                            </div>
                        </Link>

                        {menu.id == firstCategory && buildSecondLevel(menu)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className="ml-3 pl-8 mt-[15px] border-l-[1px] border-l-white_dark">
                {menu.map((m) => {
                    if (
                        m.pages.map((p) => p.alias).includes(path.split("/")[2])
                    ) {
                        m.isOpened = true;
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div
                                onKeyDown={(key: KeyboardEvent) =>
                                    openSecondLevelKey(
                                        key,
                                        m._id.secondCategory
                                    )
                                }
                                tabIndex={0}
                                className="mb-[10px] cursor-pointer uppercase text-gray_dark text-xs font-light"
                                onClick={() =>
                                    openSecondLevel(m._id.secondCategory)
                                }
                            >
                                {m._id.secondCategory}
                            </div>
                            <motion.div
                                layout
                                variants={variants}
                                initial={m.isOpened ? "visible" : "hidden"}
                                animate={m.isOpened ? "visible" : "hidden"}
                                className="overflow-hidden"
                            >
                                {buildThirdLevel(
                                    m.pages,
                                    menuItem.route,
                                    m.isOpened ?? false
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (
        pages: PageItem[],
        route: string,
        isOpened: boolean
    ) => {
        return pages.map((p) => {
            const thirdLevelActive = `/${route}/${p.alias}` == path;
            return (
                <motion.div key={p._id} variants={variantsChildren}>
                    <Link
                        tabIndex={isOpened ? 0 : -1}
                        href={`/${route}/${p.alias}`}
                        className={`cursor-pointer text-gray_dark font-medium text-sm leading-[19px] block hover:text-primary -outline-offset-1 ${
                            thirdLevelActive && "text-primary"
                        }`}
                    >
                        {p.category}
                    </Link>
                </motion.div>
            );
        });
    };

    return (
        <div>
            <ul>{buildFirstLevel()}</ul>
        </div>
    );
};
