import { HTMLAttributes, DetailedHTMLProps } from "react";

export interface TagProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: "s" | "m";
    children: React.ReactNode;
    color?: "ghost" | "red" | "green" | "grey" | "primary";
    href?: string;
}
