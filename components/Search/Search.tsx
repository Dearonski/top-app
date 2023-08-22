"use client";

import { useState, KeyboardEvent } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { SearchProps } from "./Search.props";
import GlassIcon from "./glass.svg";
import { useRouter } from "next/navigation";

export const Search: React.FC<SearchProps> = ({ className, ...props }) => {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const goToSearch = () => {
        router.push(`/search?q=${search}`);
        setSearch("");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            goToSearch();
        }
    };

    return (
        <div className={`${className} relative w-full`} {...props}>
            <Input
                className="w-full [&>input]:w-full"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button
                appearance="primary"
                className="absolute top-[3px] right-[3px] w-[30px] h-[30px] p-[7px]"
                onClick={goToSearch}
            >
                <GlassIcon />
            </Button>
        </div>
    );
};
