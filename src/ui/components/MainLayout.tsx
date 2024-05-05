import { FC, PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import BookingIcon from '/src/assets/booking.svg';
import SearchIcon from '/src/assets/search.svg';
import InfoIcon from '/src/assets/info.svg';
import Logo from '/src/assets/tree-city-solid.svg';
import { Link } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { toast } from 'react-toastify';

type Props = PropsWithChildren & {
  title?: string;
};

interface menuOption {
  icon: ReactElement;
  route: string;
  name: string;
}

const menuOptions: menuOption[] = [
  {
    icon: <BookingIcon />,
    route: '/myReserves',
    name: 'Reserves',
  },
  {
    icon: <SearchIcon />,
    route: '/search',
    name: 'Search',
  },
  {
    icon: <InfoIcon />,
    route: '/about',
    name: 'Acerca de',
  },
];

const DesktopHeader = () => {
  return (
    <div className='flex p-8 justify-between items-end pl-32 w-full '>
      <Logo />
      <h1 className='text-5xl font-bold text-primary mx-4'>  ByteSpace</h1>
    </div>
  );
};

const DesktopSideBarContent = () => {
  const path = location.pathname;
  return (
    <div className='h-full flex flex-col justify-between  items-center '>
      {/*  menu */}
      <div>
        {menuOptions.map((opt, idx) => {
          return (
            <div
              key={idx}
              className={
                (path === opt.route ? 'fill-primary ' : ' fill-secondary  hover:fill-hover ') +
                ' h-8 w-8 mb-12 '
              }
            >
              <Link to={opt.route}>{opt.icon}</Link>
            </div>
          );
        })}
      </div>

      {/** Exit button */}
    </div>
  );
};

const MainLayout: FC<Props> = ({ children, title = 'ByteSpace' }) => {
  //a md window have 768 pixels
  const md = 768;

  //set html head metadata
  useEffect(() => {
    document.title = title;
  }, []);

  //state of the current windw dimension
  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  //detect size of the current browser window
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  //avoid recurrennt executions of detectSize
  const [mounted, setMounted] = useState(false);

  //run each time the window dimension changes
  useEffect(() => {
    //listed al the window redimensions
    window.addEventListener('resize', detectSize);

    if (!mounted) {
      setMounted(true);
      detectSize();
    }

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [mounted, windowDimenion]);

  return (
    <div className='w-screen h-screen bg-background'>
      {/* Header */}
      <div className='fixed w-full'>
        {/* Aquí va el componente de encabezado */}
      </div>
      {/* Contenido de la página */}
      <div className='h-full w-full pt-24'>{children}</div>
    </div>
  );
};

export { MainLayout };