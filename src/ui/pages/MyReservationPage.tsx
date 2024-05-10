import { NavLink } from 'react-router-dom';
import { ISpaceRepo, Space } from '../../core/space/domain';
import { MemorieSpaceRepo } from '../../infraestructure/memory/SpaceRepo';
import { MainLayout } from '../components/MainLayout';
import { useEffect, useState } from 'react';
import { SpaceList } from '../components/SpaceList';
import { HttpSpaceRepo } from '../../infraestructure/http/SpaceRepo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyReservationPage: React.FC = () => {
    // Definir la lista de espacios de prueba
    const list: Space[] = [
      {
        id: '1',
        tamanio: 100,
        kind: 'despacho',
        maxOcupantes: 3,
        informacion: 'Espacio para reuniones privadas',
        reservable: true,
        categoria: 'Privado',
        porcentajeOcupacion: 0.8,
        planta: 1,
        asignadoA: 'Pedro',
      },
      {
        id: '2',
        tamanio: 150,
        kind: 'laboratorio',
        maxOcupantes: 5,
        informacion: 'Laboratorio equipado para investigaciones científicas',
        reservable: true,
        categoria: 'Científico',
        porcentajeOcupacion: 0.6,
        planta: 2,
        asignadoA: 'Ana',
      },
      {
        id: '3',
        tamanio: 80,
        kind: 'salacomun',
        maxOcupantes: 10,
        informacion: 'Sala común para reuniones informales',
        reservable: true,
        categoria: 'Común',
        porcentajeOcupacion: 0.4,
        planta: 1,
        asignadoA: '',
      },
      {
        id: '4',
        tamanio: 200,
        kind: 'seminario',
        maxOcupantes: 50,
        informacion: 'Seminario amplio para conferencias y eventos',
        reservable: true,
        categoria: 'Conferencias',
        porcentajeOcupacion: 0.2,
        planta: 3,
        asignadoA: '',
      },
      {
        id: '5',
        tamanio: 120,
        kind: 'aula',
        maxOcupantes: 30,
        informacion: 'Aula equipada con proyector y pizarras',
        reservable: true,
        categoria: 'Educación',
        porcentajeOcupacion: 0.7,
        planta: 3,
        asignadoA: '',
      },
      {
        id: '6',
        tamanio: 90,
        kind: 'aula',
        maxOcupantes: 20,
        informacion: 'Aula para clases grupales',
        reservable: true,
        categoria: 'Educación',
        porcentajeOcupacion: 0.5,
        planta: 2,
        asignadoA: '',
      },
      {
        id: '7',
        tamanio: 70,
        kind: 'aula',
        maxOcupantes: 15,
        informacion: 'Aula pequeña para tutorías',
        reservable: true,
        categoria: 'Educación',
        porcentajeOcupacion: 0.3,
        planta: 1,
        asignadoA: '',
      },
      {
        id: '8',
        tamanio: 180,
        kind: 'aula',
        maxOcupantes: 40,
        informacion: 'Aula amplia para conferencias',
        reservable: true,
        categoria: 'Educación',
        porcentajeOcupacion: 0.9,
        planta: 1,
        asignadoA: 'Laura',
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
            <h2 className="text-2xl font-bold mb-4 text-primary">Mis reservas</h2>
            <SpaceList list={list} />
          </div>
          <div className='h-full md:w-1/2 px-2 w-full '>
            <h2 className="text-2xl font-bold mb-4 text-primary">Reservas potencialmente inválidas</h2>
            <SpaceList list={list} />
          </div>
        </div>
      </MainLayout>
    );
};

export default MyReservationPage; // Asegúrate de exportar el componente