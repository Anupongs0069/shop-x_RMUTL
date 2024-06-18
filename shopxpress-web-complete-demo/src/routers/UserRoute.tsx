import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/Home/HomePage';
import ProductPage from '../pages/Product/ProductPage';
import CartPage from '../pages/Cart/CartPage';

const UserRoute: FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/products/*' element={<ProductPage />} />
        <Route element={<PrivateRoute />}>
        <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<>Checkout</>} />
        </Route>
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

export default UserRoute;
