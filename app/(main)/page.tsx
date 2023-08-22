import { Button, Htag, P, Tag, Input, Textarea } from "../../components";

export default async function TopPage() {
    return (
        <div>
            <Htag tag="h1">Текст</Htag>
            <Button appearance="primary" arrow="right">
                Кнопка
            </Button>
            <Button appearance="ghost" arrow="down">
                Кнопка
            </Button>
            <P size="l">Большой</P>
            <P>Средний</P>
            <P size="s">Маленький</P>
            <Tag size="s">Ghost</Tag>
            <Tag size="m" color="red">
                Red
            </Tag>
            <Tag size="m" color="green">
                green
            </Tag>
            <Tag color="primary">Primary</Tag>
            <Input placeholder="Текст" />
            <Textarea />
        </div>
    );
}
