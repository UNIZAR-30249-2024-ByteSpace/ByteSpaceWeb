/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              MyReservationPage.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import { useEffect, useState } from 'react';
import { IReserveRepo, Reserve } from '../../core/reserve/domain';
import { HttpReserveRepo } from '../../infraestructure/http/ReserveRepo';
import { MainLayout } from '../components/MainLayout';
import { ReserveList } from '../components/ReserveList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/AuthContext'; // Importa el hook useAuth
import { useNavigate } from 'react-router-dom';

const reserveRepo: IReserveRepo = new HttpReserveRepo();


const MyReservationPage: React.FC = () => {
  const [reservesList, setReserveList] = useState<Reserve[]>([]);
  const { user } = useAuth(); // Obtén el ID del usuario del contexto de autenticación
  const [validReserves, setValidReserves] = useState<Reserve[]>([]);
  const [invalidReserves, setInvalidReserves] = useState<Reserve[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) { // Verifica que haya un ID de usuario antes de hacer la solicitud
      reserveRepo
        .getAllReserves(user.id) // Utiliza el ID del usuario actual
        .then((list) => {
          console.log('Received reserves:', list); // Añadir información de depuración
          setReserveList(list);
        })
        .catch((error) => {
          console.log('Error fetching reserves:', error); // Añadir información de depuración
          toast.error('Error al obtener las reservas', {
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
    }
  }, [user]); // Asegúrate de ejecutar el efecto cuando cambie el ID

  useEffect(() => {
    // Actualizar listas de reservas válidas e inválidas cuando reservesList cambie
    const updatedValidReserves = reservesList.filter(reserve => !reserve._potencialInvalida);
    const updatedInvalidReserves = reservesList.filter(reserve => reserve._potencialInvalida);
    setValidReserves(updatedValidReserves);
    setInvalidReserves(updatedInvalidReserves);
  }, [reservesList]);
  


  function wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  const handleCancelReserve = async (id: string) => {
    try {
      const canceledReserveId = await reserveRepo.cancelReserveById(id);
      // Lógica adicional después de cancelar la reserva, si es necesario
      toast.success(`Reserva cancelada exitosamente: ${id}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      if (user) { // Verifica que haya un ID de usuario antes de hacer la solicitud
        reserveRepo
          .getAllReserves(user.id) // Utiliza el ID del usuario actual
          .then((list) => {
            console.log('Received reserves:', list); // Añadir información de depuración
            // Actualizar la lista de reservas después de la cancelación
            setReserveList(list);
          })
          .catch((error) => {
            console.log('Error fetching reserves:', error); // Añadir información de depuración
            toast.error('Error al obtener las reservas', {
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
      }
  
      // Actualizar listas de reservas válidas e inválidas cuando reservesList cambie
      const updatedValidReserves = reservesList.filter(reserve => !reserve._potencialInvalida);
      const updatedInvalidReserves = reservesList.filter(reserve => reserve._potencialInvalida);
      setValidReserves(updatedValidReserves);
      setInvalidReserves(updatedInvalidReserves);

    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      toast.error('Error al cancelar la reserva', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleAcceptReserve = async (id: string) => {
    try {
      const canceledReserveId = await reserveRepo.acceptReserveById(id);
      // Lógica adicional después de cancelar la reserva, si es necesario
      toast.success(`Reserva aceptada exitosamente: ${id}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      
      if (user) { // Verifica que haya un ID de usuario antes de hacer la solicitud
        reserveRepo
          .getAllReserves(user.id) // Utiliza el ID del usuario actual
          .then((list) => {
            console.log('Received reserves:', list); // Añadir información de depuración
            // Actualizar la lista de reservas después de la cancelación
            setReserveList(list);
          })
          .catch((error) => {
            console.log('Error fetching reserves:', error); // Añadir información de depuración
            toast.error('Error al obtener las reservas', {
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
      }
  
      // Actualizar listas de reservas válidas e inválidas cuando reservesList cambie
      const updatedValidReserves = reservesList.filter(reserve => !reserve._potencialInvalida);
      const updatedInvalidReserves = reservesList.filter(reserve => reserve._potencialInvalida);
      setValidReserves(updatedValidReserves);
      setInvalidReserves(updatedInvalidReserves);

    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      toast.error('Error al cancelar la reserva', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <MainLayout>
      <ToastContainer />
      <div className='w-full h-full flex justify-center items-center md:pb-40 px-6'>
        <div className='h-full md:w-1/2 px-2 w-full '>
          <h2 className="text-2xl font-bold mb-4 text-primary">Mis reservas</h2>
          <ReserveList list={validReserves} onCancel={handleCancelReserve} onAccept={handleAcceptReserve} />
        </div>
        <div className='h-full md:w-1/2 px-2 w-full '>
          <h2 className="text-2xl font-bold mb-4 text-primary">Reservas potencialmente inválidas</h2>
          <ReserveList list={invalidReserves} onCancel={handleCancelReserve} onAccept={handleAcceptReserve} />
        </div>
      </div>
    </MainLayout>
  );
};

export default MyReservationPage;
