import { API } from "../helpers/api";
import { MenuItem } from "../interfaces/menu.interface";
import { TopPageModel } from "../interfaces/page.interface";
import { ProductModel } from "../interfaces/product.interface";

export async function getMenu(firstCategory: number): Promise<MenuItem[]> {
    const res = await fetch(API.topPage.find, {
        method: "POST",
        body: JSON.stringify({
            firstCategory,
        }),
        headers: new Headers({ "Content-Type": "application/json" }),
    });
    return res.json();
}

export async function getPage(alias: string): Promise<TopPageModel> {
    const res = await fetch(API.topPage.byAlias + alias, {
        method: "GET",
        headers: new Headers({ "Content-Type": "application/json" }),
    });
    return res.json();
}

export async function getProducts(
    page: TopPageModel
): Promise<ProductModel[] | undefined> {
    const res = await fetch(API.product.find, {
        method: "POST",
        body: JSON.stringify({
            category: page.category,
            limit: 10,
        }),
        headers: new Headers({ "Content-Type": "application/json" }),
    });
    if (res.ok) {
        return res.json();
    } else {
        return undefined;
    }
}
