/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              MainLayout.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Logo from '/src/assets/tree-city-solid.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Importa el hook useAuth

const capitalizeFirstLetter = (word: string) => {
  if (typeof word !== 'string') {
      return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const rolesPermitidos = [
  "Investigador contratado",
  "Docente-investigador",
  "Gerente-docente-investigador",
  "Técnico de laboratorio"
];

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
  }
];

const DesktopHeader: FC = () => {
  const { user } = useAuth(); // Obtén el usuario del contexto de autenticación
  const userName = user ? user.id : '';
  console.log("GOLA")
  console.log("Departamento: " + user?.departamento)
  
  const userRol = user ? capitalizeFirstLetter(user.rol) : '';
  const userDepartamento = user && user.departamento ? capitalizeFirstLetter(user.departamento) : '';

  const rolMensaje = rolesPermitidos.includes(userRol)
  ? userDepartamento
  : "No puede estar adscrito a ningún departamento";
  
  return (
    <div className='flex p-8 justify-between items-end pl-32 pr-8 w-full '>
      <h1 className='text-5xl font-bold text-primary mx-4'>ByteSpace</h1>
      <div className="ml-80">
      <span className="text-l font-bold text-primary">Usuario:</span> <span className="text-l text-primary">{userName}</span><br />
      <span className="text-l font-bold text-primary">Rol:</span> <span className="text-l text-primary">{userRol}</span><br />
      <span className="text-l font-bold text-primary">Departamento:</span><span className="text-l text-primary"> {rolMensaje}</span>
</div>
    </div>
  );
};

const DesktopSideBarContent: FC = () => {
  const { user } = useAuth(); // Obtener el usuario del contexto de autenticación
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

    // Definir una función para verificar si el usuario tiene el rol necesario para ver el botón de Admin
    const hasAdminRole = () => {
      // Verificar si el usuario existe y si tiene uno de los roles específicos
      return user && (user.rol === 'gerente' || user.rol === 'gerente-docente-investigador');
    };

    return (
      <div className='h-full flex flex-col justify-between items-center'>
        {/* Menu */}
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
          {/* Mostrar el botón de Admin solo si el usuario tiene el rol necesario */}
          {hasAdminRole() && (
            <div className='fill-secondary hover:fill-hover h-8 w-8 mb-12'>
              <Link to='/admin'>
                <img src='/src/assets/admin.svg' alt='Admin' />
              </Link>
            </div>
          )}
          {hasAdminRole() && (
            <div className='fill-secondary hover:fill-hover h-8 w-8 mb-12'>
              <Link to='/modify'>
                <img src='/src/assets/wrench.svg' alt='Modify' />
              </Link>
            </div>
          )}
        </div>
  
        {/* Exit button */}
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
