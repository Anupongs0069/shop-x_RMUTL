import { Alert, Carousel, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../context/AuthContext';
import Promotion1 from '../../assets/images/promotion-1.png';
import Promotion2 from '../../assets/images/promotion-2.webp';
import Promotion3 from '../../assets/images/promotion-3.png';
import ProductCard from '../../components/control/ProductCard';
import useHomePage from './hooks/useHomepage';


const HomePage = () => {
  const { currentUser } = useAuth();
  const { loadingNewProducts, loadingTopProducts, topSellerProducts, topNewProducts } = useHomePage();

  return (
    <div>
      <Alert variant="warning" className="text-center my-4">
        <h4>{currentUser ? `Welcome back ${currentUser.firstName} ${currentUser.lastName}!` : 'Welcome to Shopping Express!'}</h4>
        <p>Discover amazing deals and express delivery on all your favorite products. Happy shopping!</p>
      </Alert>
      <div id='promotion'>
        <Carousel
          indicators={false}
          nextIcon={<FontAwesomeIcon icon={faAngleRight} size='2x' color='grey' />}
          prevIcon={<FontAwesomeIcon icon={faAngleLeft} size='2x' color='grey' />}>
          <Carousel.Item interval={1000}>
            <img src={Promotion1} className='d-block w-100 carousel-image' alt='promotion1' />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img src={Promotion2} className='d-block w-100 carousel-image' alt='promotion2' />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img src={Promotion3} className='d-block w-100 carousel-image' alt='promotion3' />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div id='topSellProducts' className='mt-3'>
        <div className='border-bottom w-100 d-flex align-items-center'>
          <span>Top Seller</span>
          <Link to='/products?category=top-sell' className='btn btn-outline-link ms-auto'>View all</Link>
        </div>
        <div className='p-3 d-flex gap-4 flex-wrap'>
          {
            loadingNewProducts ? <Spinner animation="border" /> : (
              topSellerProducts.map((p, i) => <ProductCard key={i} productId={p.productId}
                description={p.description}
                productName={p.name}
                category={p.productCategoryName}
                imageUrl={p.imageUrl} />
              )
            )
          }
        </div>
      </div>
      <div id='mostRecent' className='mt-3'>
        <div className='border-bottom w-100 d-flex align-items-center'>
          <span>Most Recent</span>
          <Link to='/products?category=most-recent' className='btn btn-outline-link ms-auto'>View all</Link>
        </div>
        <div className='p-3 d-flex gap-4 flex-wrap'>
          {
            loadingTopProducts ? <Spinner animation="border" /> : (
              topNewProducts.map((p, i) => <ProductCard key={i} productId={p.productId}
                description={p.description}
                productName={p.name}
                category={p.productCategoryName}
                imageUrl={p.imageUrl} />
              )
            )
          }
        </div>
      </div>
    </div>
  );
};

export default HomePage;
