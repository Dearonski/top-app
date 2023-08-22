import { firstLevelMenu } from "../../../helpers/helpers";

export async function generateStaticParams() {
    return firstLevelMenu.map(async (firstLevel) => {
        return {
            type: firstLevel.route,
        };
    });
}

export default function Course({ params }: { params: { type: string } }) {
    return <div>{params.type}</div>;
}
