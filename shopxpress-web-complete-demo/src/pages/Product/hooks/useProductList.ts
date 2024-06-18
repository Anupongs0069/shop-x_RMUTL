import { useEffect, useState } from "react";
import ProductContract from "../../../contracts/ProductContract";
import { toast } from "react-toastify";
import productService from "../../../services/product.service";
import productCategoryService from "../../../services/productCategory.service";
import ProductCategoryContract from "../../../contracts/ProductCategoryContract";

const useProductList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductContract[]>([]);
    const [productCategories, setProductCategories] = useState<ProductCategoryContract[]>([]);

    useEffect(() => {
        try {
            const fetchProduct = async () => {
                const { data: products } = await productService.getProducts();
                setProducts(products);
            }

            const fetchCategories = async () => {
                const { data: categories } = await productCategoryService.getProductCAtegories();
                setProductCategories(categories);
            }
            fetchProduct();
            fetchCategories();

        } catch (error: any) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setProducts, setProductCategories])

    return {
        loading,
        products,
        productCategories
    }
}

export default useProductList;