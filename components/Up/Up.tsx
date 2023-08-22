"use client";

import { useAnimation, motion } from "framer-motion";
import { useScrollY } from "../../hooks/useScrollY";
import { useEffect } from "react";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

export const Up: React.FC = () => {
    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        controls.start({
            opacity:
                y /
                (document.body.scrollHeight -
                    document.documentElement.clientHeight),
        });
    }, [y, controls]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <motion.div
            className="h-10 w-10 rounded-[10px] shadow-card bg-primary bottom-[30px] right-[30px] fixed grid items-center justify-items-center hover:bg-primary_hover"
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop} />
        </motion.div>
    );
};
