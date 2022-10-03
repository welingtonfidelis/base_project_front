import { Container } from "./styles";

interface Props {
    icon: React.ReactElement;
    onClick: () => void;
    title: string;
}

export const IconButton = (props: Props) => {
    const { icon, title, onClick } = props;

    return (
        <Container onClick={onClick} title={title}>
            {icon}
        </Container>
    )

}