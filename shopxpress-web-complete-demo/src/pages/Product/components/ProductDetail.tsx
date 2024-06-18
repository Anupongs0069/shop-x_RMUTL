import { Card, Col, Row, Image, Container, Button, Placeholder, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import emptyImage from '../../../assets/images/emptyImage.png';
import LabelWithData from "../../../components/control/LabelWithData";
import { useCallback, useEffect, useMemo, useState } from "react";
import NavigationBreadcrumb, { PageLink } from "../../../components/control/NavigationBreadcrumb";
import QuantityControl from "../../../components/control/QuantityControl";
import { useAuth } from "../../../context/AuthContext";
import useProductDetail from "../hooks/useProductDetail";
import { useUserCartContext } from "../../../context/UserCartContext";
import useCart from "../../Cart/hooks/useCart";

const ProductDetail = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const { setItemInCart } = useUserCartContext();
    const { getUserCart, userCart } = useCart(false);
    const { loading, product, addingProduct, addProductToCart } = useProductDetail(parseInt(id!));
    const [qty, setQty] = useState<number>(0);
    const pageLinks = useMemo((): Array<PageLink> => {
        return [
            {
                title: 'Home',
                to: '/'
            },
            {
                title: 'Products',
                to: '/products'
            },
            {
                title: product?.name || '',
                to: '',
                active: true
            }
        ];
    }, [product])

    const quantityChange = useCallback((qty: number) => {
        setQty(qty);
    }, [setQty])

    const addToCart = useCallback(async () => {
        if (isAuthenticated) {
            await addProductToCart(qty);
            toast.success(`Add ${qty} ${product?.name} to card`, { closeOnClick: true })
            await getUserCart();
        } else {
            toast.error("Please login before add product to cart.");
        }
    }, [qty, isAuthenticated, product, addProductToCart, getUserCart]);

    useEffect(() => {
        setItemInCart(userCart?.cartProducts.length ?? 0);
    }, [setItemInCart, userCart])

    return (
        <>
            <NavigationBreadcrumb pageLinks={pageLinks} />
            <h3>
                Product Detail
            </h3>
            <hr />
            <div>
                {
                    loading ? <Card bg="white">
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
                            <Placeholder.Button variant="primary" xs={1} />
                        </Card.Body>
                    </Card> : (
                        <Card bg="white">
                            <Card.Body>
                                <Container>
                                    <Row className="mb-3">
                                        <Col xs="12" className="d-flex justify-content-center">
                                            <Image src={product?.imageUrl} className="mx-auto" thumbnail onError={e => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = emptyImage;
                                            }} />

                                        </Col>
                                    </Row>
                                    <LabelWithData label="Name" data={product?.name ?? ''} />
                                    <LabelWithData label="Description" data={product?.description ?? ''} />
                                    <LabelWithData label="Category" data={product?.productCategoryName ?? ''} />
                                    <LabelWithData label="In Stock" data={`${product?.inStock ?? 0}`} />
                                    <LabelWithData label="Price" data={`${product?.price ?? 0}$`} />
                                </Container>

                            </Card.Body>
                            <Card.Body className="d-flex justify-content-end">
                                <QuantityControl min={0} max={product?.inStock ?? 0} onChange={quantityChange} />
                                <Button variant="outline-primary ms-2" disabled={qty < 1 || addingProduct} onClick={addToCart}>{addingProduct ?
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : 'Add To Cart'}</Button>
                            </Card.Body>
                        </Card>
                    )
                }

            </div>
        </>
    )
}
export default ProductDetail;