import { useEffect, useState } from 'react';
import { IReserveRepo, Reserve } from '../../core/reserve/domain';
import { HttpReserveRepo } from '../../infraestructure/http/ReserveRepo';
import { MainLayout } from '../components/MainLayout';
import { ReserveList } from '../components/ReserveList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const reserveRepo: IReserveRepo = new HttpReserveRepo();

const MyReservationPage: React.FC = () => {
  const [reservesList, setReserveList] = useState<Reserve[]>([]);

  useEffect(() => {
    reserveRepo
      .getAllReserves('818289')
      .then((list) => {
        console.log('Received reserves:', list); // Añadir información de depuración
        setReserveList(list);
      })
      .catch((error) => {
        console.log("Hola"); // Añadir información de depuración
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
  }, []);
  

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
      // Actualizar la lista de reservas después de la cancelación
      const updatedReserves = reservesList.filter((reserve) => reserve.id !== canceledReserveId);
      setReserveList(updatedReserves);
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

  const validReserves = reservesList.filter(reserve => !reserve.potencialInvalida);
  const invalidReserves = reservesList.filter(reserve => reserve.potencialInvalida);

  return (
    <MainLayout>
      <ToastContainer />
      <div className='w-full h-full flex justify-center items-center md:pb-40 px-6'>
        <div className='h-full md:w-1/2 px-2 w-full '>
          <h2 className="text-2xl font-bold mb-4 text-primary">Mis reservas</h2>
          <ReserveList list={validReserves} onCancel={handleCancelReserve} />
        </div>
        <div className='h-full md:w-1/2 px-2 w-full '>
          <h2 className="text-2xl font-bold mb-4 text-primary">Reservas potencialmente inválidas</h2>
          <ReserveList list={invalidReserves} onCancel={handleCancelReserve} />
        </div>
      </div>
    </MainLayout>
  );
};

export default MyReservationPage;
