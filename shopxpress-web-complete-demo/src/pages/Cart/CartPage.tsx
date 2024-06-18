import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Card, ListGroup, Image, Button, Placeholder, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCartShopping, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import emptyImage from '../../assets/images/emptyImage.png';
import ConfirmDialog from "../../components/dialog/ConfirmDialog";
import { toast } from "react-toastify";
import NavigationBreadcrumb, { PageLink } from "../../components/control/NavigationBreadcrumb";
import useCart from "./hooks/useCart";
import { useUserCartContext } from "../../context/UserCartContext";

const CartPage: FC = () => {
    const { userCart, loading, removeProductFromCart, checkoutCart, getUserCart } = useCart();
    const { setItemInCart } = useUserCartContext();
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<number>();
    const [showRemoveConfirm, setShowRemoveConfirm] = useState<boolean>(false);
    const pageLinks = useMemo((): Array<PageLink> => {
        return [
            {
                title: 'Home',
                to: '/'
            },
            {
                title: 'Cart',
                to: '',
                active: true
            }
        ];
    }, [])

    const checkOutCart = useCallback(() => {
        setShowConfirm(true);
        console.log('Call checkOutCart')
    }, [setShowConfirm])

    const removeProduct = useCallback((id: number) => {
        setShowRemoveConfirm(true);
        setSelectedProductId(id);
        console.log('Remove product')
    }, [setShowRemoveConfirm, setSelectedProductId])

    const handleOnHide = useCallback(async (type: 'delete' | 'checkout') => {
        if (type === 'checkout') {
            setShowConfirm(false);
        }
        else {
            setShowRemoveConfirm(false);
        }
        setSelectedProductId(undefined);
    }, [setShowConfirm, setShowRemoveConfirm, setSelectedProductId])

    const handleConfirm = useCallback(async (type: 'delete' | 'checkout') => {
        if (type === 'checkout') {
            await checkoutCart();
            await getUserCart();
            setShowConfirm(false);
            toast.success('Checkout completed.')
        }
        else {
            if (selectedProductId) {
                await removeProductFromCart(selectedProductId);
                await getUserCart();
            }
            setShowRemoveConfirm(false);
        }
        setSelectedProductId(undefined);
        // eslint-disable-next-line
    }, [setShowConfirm, setShowRemoveConfirm, selectedProductId, setSelectedProductId, getUserCart, checkoutCart])

    useEffect(() => {
        setItemInCart(userCart?.cartProducts?.length ?? 0)
    }, [userCart, setItemInCart])

    return (
        <>
            <NavigationBreadcrumb pageLinks={pageLinks} />
            <h3>Cart Detail</h3>
            <hr />
            <div>
                {
                    loading ? (
                        <Card bg="white" className="p-4">
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>
                        </Card>
                    ) : (
                        <Card bg="white">
                            <Card.Body>
                                {
                                    userCart && (
                                        <>
                                            <ListGroup variant="flush" color="white" className="gap-2">
                                                {
                                                    userCart.cartProducts.length > 0 ? userCart.cartProducts.map((p, i) =>
                                                        <ListGroup.Item as="div" action className="d-flex flex-wrap justify-content-between align-items-center flex-column flex-md-row" key={i}>
                                                            <div>
                                                                <Image src={p.productImageUrl} className="object-fit-contain" style={{ height: '6em' }} onError={e => {
                                                                    const target = e.target as HTMLImageElement;
                                                                    target.src = emptyImage;
                                                                }} />

                                                            </div>
                                                            <div className="ms-2 me-auto">
                                                                <div className="fw-bold">{p.productName}</div>
                                                                <div className="small">{p.productDescription}</div>
                                                                <div className="small">Price {p.productPrice}$</div>
                                                            </div>
                                                            <Badge bg="primary" pill>
                                                                {p.quantity}
                                                            </Badge>
                                                            <Button variant="outline-link" onClick={() => removeProduct(p.productId)} ><FontAwesomeIcon icon={faTrash} color='grey' /></Button>
                                                        </ListGroup.Item>
                                                    ) :
                                                        (<Alert variant="light" className="text-center">
                                                            Your cart is empty! <FontAwesomeIcon icon={faCartArrowDown} />
                                                        </Alert>)
                                                }
                                            </ListGroup>
                                            <div className="pt-4 d-flex">
                                                <span className="ms-auto">Total {userCart?.cartProducts?.reduce((accumulator, currentValue) => accumulator + currentValue.productPrice, 0)}$</span>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    !userCart && <Alert variant="light" className="text-center">
                                        Your cart is empty! <FontAwesomeIcon icon={faCartArrowDown} />
                                    </Alert>
                                }

                            </Card.Body>
                            {
                                (userCart?.cartProducts?.length ?? 0) > 0 &&
                                <Card.Body className="d-flex justify-content-end">
                                    <Button variant="primary" onClick={checkOutCart} >Checkout<FontAwesomeIcon icon={faCartShopping} className="ms-2" /></Button>
                                </Card.Body>
                            }

                        </Card>
                    )
                }

                <ConfirmDialog show={showConfirm} message="Are you sure to checkout products?" onHide={() => handleOnHide('checkout')} onConfirm={() => handleConfirm('checkout')} />
                <ConfirmDialog show={showRemoveConfirm} message="Are you sure to remove products?" onHide={() => handleOnHide('delete')} onConfirm={() => handleConfirm('delete')} />
            </div>
        </>
    )
}

export default CartPage;