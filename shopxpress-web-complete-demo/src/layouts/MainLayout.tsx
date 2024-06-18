import { FC } from 'react';
import TopNavBar from '../components/layout/TopNavBar';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <div>
      <TopNavBar />
      <Container>
        <Outlet />
      </Container>
      <footer className='w-100 position-absolute bg-white p-4 mt-4'>
        <Container>
          <Row>
            <Col>
              <p>&copy; 2024 ShopXPress. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default MainLayout;
