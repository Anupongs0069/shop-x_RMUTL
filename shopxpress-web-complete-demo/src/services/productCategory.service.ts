
import ProductCategoryContract from "../contracts/ProductCategoryContract";
import httpRequest from "../httpRequest";

const ROUTE_PREFIX = 'ProductCategories'
const productCategoryService = {
    getProductCAtegories: () => httpRequest.get<ProductCategoryContract[]>(ROUTE_PREFIX)
}

export default productCategoryService;