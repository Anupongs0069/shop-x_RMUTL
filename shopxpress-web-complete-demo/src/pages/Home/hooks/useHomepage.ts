import { useEffect, useState } from "react";
import ProductContract from "../../../contracts/ProductContract";
import productService from "../../../services/product.service";
import { toast } from "react-toastify";

const useHomePage = () => {
    const [topNewProducts, setTopNewProducts] = useState<ProductContract[]>([]);
    const [topSellerProducts, setTopSellerProducts] = useState<ProductContract[]>([]);
    const [loadingNewProducts, setLoadingNewProducts] = useState<boolean>(false);
    const [loadingTopProducts, setLoadingTopProducts] = useState<boolean>(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoadingNewProducts(true);
                const { data: products } = await productService.getTopNewProducts();
                setTopNewProducts(products);

            } catch (error: any) {
                toast.error(error?.message);
            } finally {
                setLoadingNewProducts(false);
            }
        }
        fetchProduct();

    }, [setTopNewProducts, setLoadingNewProducts, toast])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoadingNewProducts(true);
                const { data: products } = await productService.getTopSellerProducts();
                setTopSellerProducts(products);
            } catch (error: any) {
                toast.error(error?.message);
            } finally {
                setLoadingTopProducts(false);
            }
        }
        fetchProduct();

    }, [setTopSellerProducts, setLoadingTopProducts, toast])

    return {
        topNewProducts,
        topSellerProducts,
        loadingNewProducts,
        loadingTopProducts
    }

}

export default useHomePage;