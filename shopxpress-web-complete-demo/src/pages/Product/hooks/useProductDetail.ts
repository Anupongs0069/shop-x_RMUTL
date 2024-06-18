import { useCallback, useEffect, useState } from "react";
import ProductContract from "../../../contracts/ProductContract";
import productService from "../../../services/product.service";
import { toast } from "react-toastify";
import cartService from "../../../services/cart.service";

const useProductDetail = (productId: number) => {
    const [product, setProduct] = useState<ProductContract>();
    const [loading, setLoading] = useState<boolean>(false);
    const [addingProduct, setAddingProduct] = useState<boolean>(false);
    const addProductToCart = useCallback(async (quantity: number) => {
        if (product && quantity > 0) {
            setAddingProduct(true);
            await cartService.addProductToCart(product.productId, quantity);
            setAddingProduct(false);
        }
    }, [product, setAddingProduct])


    if (!productId)
        throw Error('Product id is not valid.')

    useEffect(() => {
        setLoading(true);
        const fetchProduct = async () => {
            try {
                const { data: product } = await productService.getProductById(productId);
                setProduct(product);
            } catch (error: any) {
                toast.error(error?.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [productId, setProduct, setLoading]);

    return {
        loading,
        product,
        addingProduct,
        addProductToCart
    }

}

export default useProductDetail;