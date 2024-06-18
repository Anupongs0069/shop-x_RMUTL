import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { PublicRoutes } from '../constants/ApplicationRoutes';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('PrivateRoute isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  // return (
  //     isAuthenticated ?
  //         <Routes>
  //             <Route path={''} element={<DashboardPage />} />
  //         </Routes>
  //         :
  //         <Navigate to={PublicRoutes.LOGIN} />
  // )
  return isAuthenticated ? <Outlet /> : <Navigate to={PublicRoutes.LOGIN} />;
};

export default PrivateRoute;
