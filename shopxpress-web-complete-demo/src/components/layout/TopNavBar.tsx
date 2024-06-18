import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import logo from '../../logo.svg';
import { PublicRoutes } from '../../constants/ApplicationRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useUserCartContext } from '../../context/UserCartContext';

const TopNavBar: React.FC = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const { itemInCart , setItemInCart} = useUserCartContext();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar collapseOnSelect className='navbar-pastel-orange' expand='sm'>
        <Container>
          <Navbar.Brand role='button' onClick={() => navigate('/')} className='text-white'>
            <img alt='' src={logo} width='30' height='30' className='d-inline-block align-top' />{' '}
            ShopXPress
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end text-white'>
            <Nav.Link onClick={() => navigate('/cart')}>
              <Button variant='outline-link' className='position-relative'><FontAwesomeIcon icon={faCartShopping} color='white' />
                <Badge
                  pill
                  bg="warning"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {itemInCart}
                </Badge>
              </Button>
            </Nav.Link>
            {isAuthenticated ? (
              <NavDropdown title={`${currentUser?.firstName} ${currentUser?.lastName}`} id='basic-nav-dropdown'>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item
                  onClick={() => {
                    logout();
                    setItemInCart(0);
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav className='align-items-center'>
                <Nav.Link onClick={() => navigate(PublicRoutes.LOGIN)} className='text-white'>Login</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopNavBar;
