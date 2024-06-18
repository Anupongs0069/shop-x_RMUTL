import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './routers/AdminRoute';
import UserRoute from './routers/UserRoute';
import { ToastContainer } from 'react-toastify';
import { UserCartProvider } from './context/UserCartContext';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position='bottom-center' />
      <AuthProvider>
        <UserCartProvider>
          <Routes>
            <Route path='/admin/*' element={<AdminRoute />} />
            <Route path='/error/404' element={<>Not found.</>} />
            <Route path='/*' element={<UserRoute />} />
          </Routes>
        </UserCartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
