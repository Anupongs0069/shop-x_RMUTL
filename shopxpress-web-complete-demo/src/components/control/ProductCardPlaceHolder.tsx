import { FC } from "react";
import { Card, Placeholder } from "react-bootstrap";

const ProductCardPlaceHolder: FC = () => {
    return (
        <Card style={{ width: '18rem' }} bg="white">
            <Card.Body>
                <Placeholder variant="primary" xs={6} />
            </Card.Body>
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>

            </Card.Body>
            <Card.Body className="text-end">
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
    )
}

export default ProductCardPlaceHolder;