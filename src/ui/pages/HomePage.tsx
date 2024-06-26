/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              HomePage.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import { useEffect, useState } from 'react';
import { ISpaceRepo, Space } from '../../core/space/domain';
import { MainLayout } from '../components/MainLayout';
import { SpaceList } from '../components/SpaceList';
import { MapComponent } from '../components/MapComponent';
import { HttpSpaceRepo } from '../../infraestructure/http/SpaceRepo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/AuthContext'; // Importa el hook useAuth


const HomePage = () => {
    const { user } = useAuth(); // Obtén el usuario del contexto de autenticación
    const spaceRepo: ISpaceRepo = new HttpSpaceRepo();
    const [spacesList, setSpacesList] = useState<Space[]>([]);
    const [selectedFloor, setSelectedFloor] = useState<number>(0); // Añadir estado para la planta seleccionada

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

    const filteredSpacesList = spacesList.filter(space => space._planta === selectedFloor); // Filtrar los espacios por planta seleccionada

    // Obtener el nombre y el correo electrónico del usuario
    const userName = user ? user.username : '';
    const userEmail = user ? user.rol : '';

    return (
        <MainLayout>
            <ToastContainer />
            <div className='w-full h-full flex justify-center items-center md:pb-40 px-6'>
                <div className='h-full md:w-1/2 px-2 w-full '>
                    <SpaceList list={filteredSpacesList} /> {/* Usar la lista filtrada */}
                </div>
                <div className='h-full w-1/2 px-2 collapse md:visible'>
                    <MapComponent selectedFloor={selectedFloor} setSelectedFloor={setSelectedFloor} /> {/* Pasar el estado y el actualizador */}
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
