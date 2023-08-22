import { Menu, Search } from "../../../components";
import { SidebarProps } from "./Sidebar.props";
import Logo from "./../logo.svg";

export const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
    return (
        <div {...props} className={`${className} gap-5 content-start`}>
            <Logo />
            <Search />
            <Menu />
        </div>
    );
};
