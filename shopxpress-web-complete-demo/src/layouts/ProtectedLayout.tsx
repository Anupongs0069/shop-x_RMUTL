import { Outlet } from 'react-router-dom';

const ProtectedLayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
