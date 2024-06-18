import { FC } from "react";
import { Navigate, Outlet, Route, Routes, useSearchParams } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

const ProductPage: FC = () => {

    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route path="" element={<ProductList />} />
                <Route path=':id' element={<ProductDetail />} />
                <Route path='*' element={<Navigate to='/error/404' />} />
            </Route>

        </Routes>
    )
}

export default ProductPage;