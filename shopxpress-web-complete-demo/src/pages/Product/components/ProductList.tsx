import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavigationBreadcrumb, { PageLink } from "../../../components/control/NavigationBreadcrumb";
import useProductList from "../hooks/useProductList";
import ProductCardPlaceHolder from "../../../components/control/ProductCardPlaceHolder";
import ProductCard from "../../../components/control/ProductCard";
import { Form } from "react-bootstrap";
import SearchInput from "../../../components/control/SearchInput";

const ProductList = () => {
    const { products, loading, productCategories } = useProductList();
    const [selectedCategoryId, setSelectedCategoryID] = useState<number>();
    const [searchName, setSearchName] = useState<string>('')

    const pageLinks = useMemo((): Array<PageLink> => {
        return [
            {
                title: 'Home',
                to: '/'
            },
            {
                title: 'Products',
                to: '/products',
                active: true
            }
        ];
    }, []);

    const displayProducts = useMemo(() => {

        if (searchName && selectedCategoryId) {
            return products.filter(product => {
                return product.productCategoryId === selectedCategoryId && product.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
            });
        } else if (searchName) {
            console.log(searchName)
            return products.filter(product => {
                return product.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1;
            });
        } else if (selectedCategoryId) {
            return products.filter(product => {
                return product.productCategoryId === selectedCategoryId;
            });
        }
        return products
    }, [searchName, selectedCategoryId, products])

    const onProductCategoryChanged = useCallback((categoryId: string) => {
        setSelectedCategoryID(parseInt(categoryId));
    }, [setSelectedCategoryID]);

    return (
        <>
            <NavigationBreadcrumb pageLinks={pageLinks} />
            <h3>Product List</h3>
            <hr />
            <div className="d-flex justify-content-end mb-3">
                <div className="d-flex gap-2 align-items-center">
                    <div>Search :</div>
                    <div>
                        <SearchInput onTextChanged={setSearchName} placeHolder="Product Name..." />
                    </div>
                    <div>Product Category :</div>
                    <div>
                        <Form.Select aria-label="Product Category" value={selectedCategoryId} onChange={(e) => onProductCategoryChanged(e.target.value)}>
                            <option value=""></option>
                            {
                                productCategories.map((category, i) => <option key={i} value={category.productCategoryId}>{category.name}</option>)
                            }
                        </Form.Select>
                    </div>
                </div>
            </div>
            <div className="d-flex gap-4 flex-wrap">
                {
                    loading ? [1, 2, 3, 4].map((c, i) => <ProductCardPlaceHolder key={i} />)
                        : (
                            displayProducts.map((p, i) => <ProductCard key={i} productId={p.productId}
                                description={p.description}
                                productName={p.name}
                                category={p.productCategoryName}
                                imageUrl={p.imageUrl} />
                            )
                        )
                }
            </div>
        </>
    )
}

export default ProductList;