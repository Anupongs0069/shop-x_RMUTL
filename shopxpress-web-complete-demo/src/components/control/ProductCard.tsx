import { FC } from "react";
import { Badge, Card, Image } from "react-bootstrap";

import emptyImage from '../../assets/images/emptyImage.png';
import { Link } from "react-router-dom";

interface IProductCardProps {
    productName: string
    description: string
    productId: number
    imageUrl: string
    category: string
}

const ProductCard: FC<IProductCardProps> = ({ productId, productName, description, imageUrl, category }) => {

    return (
        <Card style={{ width: '18rem' }} className='bg-white'>
            <Card.Img variant="top" className='object-fit-contain' as={Image} height={150} rounded
                src={imageUrl ?? ''}
                alt={productName}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = emptyImage;
                }} />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Body className='d-flex justify-content-between align-items-end'>
                <Badge bg="success">{category}</Badge>
                <Link className='btn btn-outline-primary' to={`/products/${productId}`}>View</Link>
            </Card.Body>
        </Card>
    )
}
export default ProductCard;