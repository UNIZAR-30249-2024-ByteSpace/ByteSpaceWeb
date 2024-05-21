/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              AdminPage.tsx
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
import { MdOutlineSwitchLeft, MdOutlineSwitchRight } from "react-icons/md";

const reserveRepo: IReserveRepo = new HttpReserveRepo();

const AdminPage: React.FC = () => {
  const [reservesList, setReserveList] = useState<Reserve[]>([]);
  const { user } = useAuth(); // Obtén el ID del usuario del contexto de autenticación
  const [validReserves, setValidReserves] = useState<Reserve[]>([]);
  const [invalidReserves, setInvalidReserves] = useState<Reserve[]>([]);
  const [activeReserves, setActiveReserves] = useState<Reserve[]>([]);

  const navigate = useNavigate();
  const [switchPosition, setSwitchPosition] = useState<boolean>(true); // Estado para la posición del switch

  useEffect(() => {
    if (user) { // Verifica que haya un ID de usuario antes de hacer la solicitud
      reserveRepo
        .getAllReservesAdmin() // Utiliza el ID del usuario actual
        .then((list) => {
          setReserveList(list);
        })
        .catch((error) => {
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

    const fechaHoraActual = new Date();
    const horaActual = fechaHoraActual.getHours(); // Obtenemos la hora actual en formato de 24 horas
    fechaHoraActual.setUTCHours(0, 0, 0, 0);
    const fechaActualISOString = fechaHoraActual.toISOString();

    const updatedValidReserves = reservesList.filter(reserve => !reserve.potencialInvalida);
    const updatedInvalidReserves = reservesList.filter(reserve => reserve.potencialInvalida);

    // Reservas activas
    const updatedActiveReserves = reservesList.filter(reserve => {
      const reserveFecha = new Date(reserve.fecha).toISOString().split('T')[0];
      const fechaActual = fechaActualISOString.split('T')[0];
      return (
        reserveFecha === fechaActual &&
        reserve.horaInicio <= horaActual &&
        horaActual <= reserve.horaFin
      );
    });
    
    setValidReserves(updatedValidReserves);
    setInvalidReserves(updatedInvalidReserves);
    setActiveReserves(updatedActiveReserves);

  }, [reservesList]);
  
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
          .getAllReservesAdmin() // Utiliza el ID del usuario actual
          .then((list) => {
            // Actualizar la lista de reservas después de la cancelación
            setReserveList(list);
          })
          .catch((error) => {
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
  
      const fechaHoraActual = new Date();
    const horaActual = fechaHoraActual.getHours(); // Obtenemos la hora actual en formato de 24 horas
    fechaHoraActual.setUTCHours(0, 0, 0, 0);
    const fechaActualISOString = fechaHoraActual.toISOString();

    const updatedValidReserves = reservesList.filter(reserve => !reserve.potencialInvalida);
    const updatedInvalidReserves = reservesList.filter(reserve => reserve.potencialInvalida);

    // Reservas activas
    const updatedActiveReserves = reservesList.filter(reserve => {
      const reserveFecha = new Date(reserve.fecha).toISOString().split('T')[0];
      const fechaActual = fechaActualISOString.split('T')[0];
      return (
        reserveFecha === fechaActual &&
        reserve.horaInicio <= horaActual &&
        horaActual <= reserve.horaFin
      );
    });
    
    setValidReserves(updatedValidReserves);
    setInvalidReserves(updatedInvalidReserves);
    setActiveReserves(updatedActiveReserves);
  
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
          .getAllReservesAdmin() // Utiliza el ID del usuario actual
          .then((list) => {
            // Actualizar la lista de reservas después de la cancelación
            setReserveList(list);
          })
          .catch((error) => {
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
  
      const fechaHoraActual = new Date();
    const horaActual = fechaHoraActual.getHours(); // Obtenemos la hora actual en formato de 24 horas
    fechaHoraActual.setUTCHours(0, 0, 0, 0);
    const fechaActualISOString = fechaHoraActual.toISOString();

    const updatedValidReserves = reservesList.filter(reserve => !reserve.potencialInvalida);
    const updatedInvalidReserves = reservesList.filter(reserve => reserve.potencialInvalida);

    // Reservas activas
    const updatedActiveReserves = reservesList.filter(reserve => {
      const reserveFecha = new Date(reserve.fecha).toISOString().split('T')[0];
      const fechaActual = fechaActualISOString.split('T')[0];
      return (
        reserveFecha === fechaActual &&
        reserve.horaInicio <= horaActual &&
        horaActual <= reserve.horaFin
      );
    });
    
    setValidReserves(updatedValidReserves);
    setInvalidReserves(updatedInvalidReserves);
    setActiveReserves(updatedActiveReserves);
      
    } catch (error) {
      console.error('Error al aceptar la reserva:', error);
      toast.error('Error al aceptar la reserva', {
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

  const handleSwitchToggle = () => {
    setSwitchPosition(!switchPosition); // Cambiar la posición del switch
  };

  return (
    <MainLayout>
      <ToastContainer />
      <div className='w-full h-full flex justify-center items-center md:pb-40 px-6'>
        {switchPosition ? ( // Mostrar DIV 1 si switchPosition es true
        <div className='h-full md:w-1/2 px-2 w-full '>
          <span className="text-2xl font-bold mb-4 text-primary">Reservas</span>
            <span className='text-2xl font-bold mb-4 ml-40 text-primary'><button onClick={handleSwitchToggle}><MdOutlineSwitchRight /> {switchPosition}</button></span>
              <ReserveList list={validReserves} onCancel={handleCancelReserve} onAccept={handleAcceptReserve} />
          </div>
          ) : ( // Mostrar DIV 2 si switchPosition es false
          <div className='h-full md:w-1/2 px-2 w-full'>
          <span className="text-2xl font-bold mb-4 text-primary">Reservas activas</span>
              <span className='text-2xl font-bold mb-4 ml-20 text-primary'><button onClick={handleSwitchToggle}><MdOutlineSwitchLeft /> {switchPosition}</button></span>
              <ReserveList list={activeReserves} onCancel={handleCancelReserve} onAccept={handleAcceptReserve} />
            </div>
          )}
        <div className='h-full md:w-1/2 px-2 w-full'>
          <h2 className="text-2xl font-bold mb-4 text-primary">Reservas potencialmente inválidas</h2>
          <ReserveList list={invalidReserves} onCancel={handleCancelReserve} onAccept={handleAcceptReserve} />
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
