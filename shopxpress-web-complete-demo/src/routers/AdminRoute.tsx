import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

const AdminRoute = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<>Admin Dashboard</>} />
        <Route path='products' element={<>Admin products</>} />
        <Route path='product-categories' element={<>Admin product categories</>} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  );
};

export default AdminRoute;
