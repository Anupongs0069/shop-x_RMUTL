import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import AdminTopNavBar from '../components/layout/AdminTopNavBar';

const AdminLayout = () => {
  return (
    <div>
      <AdminTopNavBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminLayout;
