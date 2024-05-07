import { NavLink } from 'react-router-dom';
import { ISpaceRepo, Space } from '../../core/space/domain';
import { MemorieSpaceRepo } from '../../infraestructure/memory/SpaceRepo';
import { MainLayout } from '../components/MainLayout';
import { useEffect, useState } from 'react';
import { SpaceList } from '../components/SpaceList';
import { MapComponent } from '../components/MapComponent';
import { HttpSpaceRepo } from '../../infraestructure/http/SpaceRepo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {

    // Definir la lista de espacios de prueba
    const list: Space[] = [
      {
        name: 'Despacho 1',
        id: '1',
        address: 'Planta 1',
        kind: 'despacho',
        price: 240000,
        lat: 41.6488,
        lng: -0.8891,
        income: 0,
      },
      {
        name: 'Laboratorio 2',
        id: '2',
        address: 'Planta 2',
        kind: 'laboratorio',
        price: 240000,
        owner: 'Juan',
        lat: 41.6488,
        lng: -0.8891,
        income: 0,
      },
      {
        name: 'Sala común 1',
        id: '3',
        address: 'Planta 1',
        kind: 'salacomun',
        price: 240000,
        lat: 41.6488,
        lng: -0.8891,
        income: 0,
      },
      {
        name: 'Seminario 4',
        id: '4',
        address: 'Planta 3',
        kind: 'seminario',
        price: 240000,
        lat: 41.6488,
        lng: -0.8891,
        income: 0,
      },
      {
        name: 'Aula 1',
        id: '1',
        address: 'Planta 3',
        kind: 'aula',
        price: 240000,
        lat: 41.6488,
        lng: -0.8891,
        income: 0,
      },
      {
        name: 'Aula 2',
        id: '2',
        address: 'Planta 3',
        kind: 'aula',
        price: 240000,
        owner: 'Juan',
        lat: 41.6488,
        lng: -0.8891,
        income: 0,
      },
      {
        name: 'Aula 3',
        id: '3',
        address: 'Planta 3',
        kind: 'aula',
        price: 240000,
        lat: 41.6488,
        lng: -0.8891,
        income: 0,
      },
      {
        name: 'Aula 4',
        id: '4',
        address: 'Planta 1',
        kind: 'aula',
        price: 240000,
        lat: 40.6488,
        lng: -0.8891,
        income: 0,
      },
    ];
  
    // Comentar la línea de espacioRepo y useEffect para usar la lista de prueba
    // const spaceRepo: ISpaceRepo = new HttpSpaceRepo();
    // const [spacesList, setSpacesList] = useState<Space[]>([]);
  
    // useEffect(() => {
    //   spaceRepo
    //     .getAllSpaces()
    //     .then((list) => {
    //       setSpacesList(list);
    //     })
    //     .catch((error) => {
    //       toast.error('Error al obtener los edificios', {
    //         position: 'top-right',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: 'light',
    //       });
    //     });
    // }, []);

  return (
    <MainLayout>
      <ToastContainer />
      <div className='w-full h-full flex justify-center items-center md:pb-40 px-6'>
        <div className='h-full md:w-1/2 px-2 w-full '>
          <SpaceList list={list} />
        </div>
        <div className=' h-full w-1/2 px-2  collapse md:visible'>
          <MapComponent/>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
