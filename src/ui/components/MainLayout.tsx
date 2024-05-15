import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Logo from '/src/assets/tree-city-solid.svg';
import { Link } from 'react-router-dom';

type Props = PropsWithChildren & {
  title?: string;
};

interface menuOption {
  icon: string; // Cambiado a string
  route: string;
  name: string;
}

const menuOptions: menuOption[] = [
  {
    icon: '/src/assets/booking.svg',
    route: '/home',
    name: 'Home',
  },
  {
    icon: '/src/assets/myreserves.svg',
    route: '/myreserves',
    name: 'Mis reservas',
  },
  {
    icon: '/src/assets/search.svg',
    route: '/search',
    name: 'Buscar',
  },
  {
    icon: '/src/assets/info.svg',
    route: '/about',
    name: 'Acerca de',
  },
  {
    icon: '/src/assets/logout.svg',
    route: '/',
    name: 'Login',
  },
  {
    icon: '/src/assets/admin.svg',
    route: '/admin',
    name: 'Admin',
  }
];

const DesktopHeader: FC = () => {
  return (
    <div className='flex p-8 justify-between items-end pl-32 w-full '>
      <h1 className='text-5xl font-bold text-primary mx-4'>  ByteSpace</h1>
    </div>
  );
};

const DesktopSideBarContent: FC = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <div className='h-full flex flex-col justify-between  items-center '>
      {/*  menu */}
      <div>
        {menuOptions.map((opt, idx) => (
          <div
            key={idx}
            className={
              (path === opt.route ? 'fill-primary ' : ' fill-secondary  hover:fill-hover ') +
              ' h-8 w-8 mb-12 '
            }
          >
            <Link to={opt.route}>
              <img src={opt.icon} alt={opt.name} />
            </Link>
          </div>
        ))}
      </div>

      {/** Exit button */}
    </div>
  );
};

const MainLayout: FC<Props> = ({ children, title = 'ByteSpace' }) => {
  return (
    <div className='w-screen h-screen bg-background'>
      {/* Header */}
      <div className='fixed'>
        <DesktopHeader />
      </div>
      {/* Navbar */}
      <div className='fixed h-full w-24 pl-8 pt-36 pb-10'>
        <DesktopSideBarContent />
      </div>
      {/* Page */}
      <div className='h-full w-full pt-36 pl-28'>{children}</div>
    </div>
  );
};

export { MainLayout };
