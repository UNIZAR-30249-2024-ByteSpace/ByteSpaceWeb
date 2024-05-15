import { NavLink } from 'react-router-dom';
import { ISpaceRepo, Space } from '../../core/space/domain';
import { MainLayout } from '../components/MainLayout';
import { useEffect, useState } from 'react';
import { SpaceList } from '../components/SpaceList';
import { MapComponent } from '../components/MapComponent';
import { HttpSpaceRepo } from '../../infraestructure/http/SpaceRepo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  
    const spaceRepo: ISpaceRepo = new HttpSpaceRepo();
    const [spacesList, setSpacesList] = useState<Space[]>([]);
  
    useEffect(() => {
       spaceRepo
         .getAllSpaces()
         .then((list) => {
           setSpacesList(list);
         })
         .catch((error) => {
           toast.error('Error al obtener los edificios', {
             position: 'top-right',
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: 'light',
           });
         });
     }, []);

     console.log('Lista de espacios:', spacesList); // Agregado: Verifica si spacesList tiene contenido


  return (
    <MainLayout>
      <ToastContainer />
      <div className='w-full h-full flex justify-center items-center md:pb-40 px-6'>
        <div className='h-full md:w-1/2 px-2 w-full '>
          <SpaceList list={spacesList} />
        </div>
        <div className=' h-full w-1/2 px-2  collapse md:visible'>
          <MapComponent/>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
