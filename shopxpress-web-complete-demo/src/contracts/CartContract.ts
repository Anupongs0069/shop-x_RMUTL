import CartProductContract from "./CartProductContract";

interface CartContract {
    cartId: number;
    userId: number;
    cartProducts: CartProductContract[];
}

export default CartContract