import { firstLevelMenu } from "../../../../helpers/helpers";
import { getMenu, getPage, getProducts } from "../../../../api/api";
import { MenuItem } from "../../../../interfaces/menu.interface";
import { TopPageComponent } from "./TopPageComponents/TopPage.component";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return firstLevelMenu.map(async (firstLevel, i) => {
        await getMenu(i).then((menu: MenuItem[]) => {
            menu.map((secondlevel) => {
                secondlevel.pages.map((thirdLevel) => {
                    return {
                        type: firstLevel.route,
                        alias: thirdLevel.alias,
                    };
                });
            });
        });
    });
}

export default async function Course({
    params,
}: {
    params: { alias: string; type: string };
}) {
    const firstCategoryItem = firstLevelMenu.find(
        (m) => m.route == params.type
    );
    if (!firstCategoryItem) {
        return notFound();
    }
    const page = await getPage(params.alias);
    const products = await getProducts(page);
    if (!products) {
        return notFound();
    }

    return (
        <TopPageComponent
            firstCategory={firstCategoryItem.id}
            page={page}
            products={products}
        />
    );
}
