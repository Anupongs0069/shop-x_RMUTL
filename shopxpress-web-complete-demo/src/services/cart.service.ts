import CartContract from "../contracts/CartContract"
import httpRequest from "../httpRequest"

const ROUTE_PREFIX = 'Carts'
const cartService = {
    getUserCart: () => httpRequest.get<CartContract>(`${ROUTE_PREFIX}/User`),
    addProductToCart: (productId: number, quantity: number) => httpRequest.post(`${ROUTE_PREFIX}/AddProduct`, { productId, quantity }),
    removeProductFromCart: (cartId: number, productId: number, quantity: number) => httpRequest.post(`${ROUTE_PREFIX}/RemoveProduct/${cartId}`, { productId, quantity }),
    checkoutCart: (cartId: number) => httpRequest.post(`${ROUTE_PREFIX}/Checkout/${cartId}`)
}

export default cartService;