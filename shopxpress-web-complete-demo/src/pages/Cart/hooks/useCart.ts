import { useCallback, useEffect, useState } from "react";
import CartContract from "../../../contracts/CartContract";
import { toast } from "react-toastify";
import cartService from "../../../services/cart.service";

const useCart = (fetchAtStart : boolean = true) => {
    const [userCart, setUserCart] = useState<CartContract>();
    const [loading, setLoading] = useState<boolean>(false);

    const checkoutCart = useCallback(async () => {
        try {
            if (userCart) {
                await cartService.checkoutCart(userCart.cartId);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }, [userCart])

    const removeProductFromCart = useCallback(async (productId: number) => {
        try {
            if (userCart) {
                const product = userCart.cartProducts.find(c => c.productId === productId);
                await cartService.removeProductFromCart(userCart.cartId, product!.productId, product!.quantity);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }, [userCart])

    const getUserCart = useCallback(async () => {
        try {
            const { data: userCart } = await cartService.getUserCart();
            setUserCart(userCart);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setUserCart])

    useEffect(() => {
        if(fetchAtStart){
            getUserCart();
        }
    }, [getUserCart, fetchAtStart])

    return {
        userCart,
        loading,
        checkoutCart,
        removeProductFromCart,
        getUserCart
    }
}

export default useCart;