import ProductContract from "../contracts/ProductContract";
import httpRequest from "../httpRequest";

const ROUTE_PREFIX = 'Products'
const productService = {
    getTopNewProducts: () => httpRequest.get<ProductContract[]>(`${ROUTE_PREFIX}/TopNew`),
    getTopSellerProducts: () => httpRequest.get<ProductContract[]>(`${ROUTE_PREFIX}/TopSpending`),
    getProducts: () => httpRequest.get<ProductContract[]>(`${ROUTE_PREFIX}`),
    getProductById: (productId: number) => httpRequest.get<ProductContract>(`${ROUTE_PREFIX}/${productId}`)
}

export default productService;