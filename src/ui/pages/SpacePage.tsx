import React, { useEffect, useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { ISpaceRepo, Space } from '../../core/space/domain';
import { chooseColor } from '../../utils/kindsSelector';
import { HttpSpaceRepo } from '../../infraestructure/http/SpaceRepo';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const spaceRepo: ISpaceRepo = new HttpSpaceRepo();
const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);

const SpacePage: React.FC = () => {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [space, setSpace] = useState<Space | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('08:00');
  const [endTime, setEndTime] = useState<string>('08:30');

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        if (spaceId) {
          const spaceData = await spaceRepo.getSpaceById(spaceId);
          setSpace(spaceData);
        } else {
          console.error('El ID del espacio es undefined');
        }
      } catch (error) {
        console.error('Error al obtener el espacio:', error);
        toast.error('Error al obtener el espacio', {
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
  
    fetchSpace();
  }, [spaceId]);

  useEffect(() => {
    // Resetear la hora de inicio y fin al valor predeterminado cuando la fecha cambia
    if (date) {
      setStartTime('08:00');
      setEndTime('09:00');
    }
  }, [date]);

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStartTime = e.target.value;
    setStartTime(selectedStartTime);
    const nextHour = parseInt(selectedStartTime.split(':')[0]) + 1;
    const formattedNextHour = nextHour.toString().padStart(2, '0');
    setEndTime(`${formattedNextHour}:00`);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEndTime = e.target.value;
    setEndTime(selectedEndTime);
  };

  const generateTimeOptions = () => {
    const options = [];
    let time = new Date();
    time.setHours(8, 0, 0);

    while (time.getHours() < 22) {
      const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      options.push(
        <option key={formattedTime} value={formattedTime}>
          {formattedTime}
        </option>
      );
      time.setHours(time.getHours() + 1);
    }

    return options;
  };

  // Función para manejar la reserva
  const handleReservation = async () => {
    try {
      if (!date || !startTime || !endTime) {
        console.error('Debe seleccionar una fecha y hora de inicio y fin');
        return;
      }
      
      // Verificar si spaceId tiene un valor antes de llamar a reserveById
      if (spaceId) {
        const response = await spaceRepo.reserveById(spaceId, 'usuario1', date, parseInt(startTime.split(':')[0]), parseInt(endTime.split(':')[0]));
        console.log('Reserva exitosa:', response);
        toast.success('Reserva exitosa', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        console.error('El ID del espacio es undefined');
      }
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      toast.error('Error al realizar la reserva', {
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

  if (!space) {
    return <div>Cargando...</div>;
  }

  return (
    <MainLayout>
      <div className="flex">
        <div className="w-1/2 p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{space.informacion}</h1>
          <p className="text-lg md:text-xl font-bold text-primary mb-4">Planta {space.planta}</p>
          <div className="flex items-center mb-8">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: chooseColor(space.kind) }}
            ></div>
            <p className="text-lg md:text-xl font-bold text-primary ">{space.kind}</p>
          </div>
          <div className="mb-10">
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center">
                <p className="font-bold text-primary mr-2">Superficie:</p>
                <p>{space.tamanio} m2</p>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-primary mr-2">Ocupación:</p>
                <p>{space.maxOcupantes} personas</p>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-primary mr-2">Reservable:</p>
                <p>{space.reservable ? "Sí" : "No"}</p>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-primary mr-2">Pertenece a:</p>
                <p>{space.asignadoA}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 p-4">
          <div className="mb-16">
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Fecha de reserva</p>
            <input
              type="date"
              id="date"
              name="date"
              className="custom-date-selector"
              style={{ fontSize: '1.3rem', color: 'text-primary', lineHeight: '2rem' }}
              min={minDate.toISOString().split('T')[0]}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lg md:text-xl font-bold text-primary mb-4">Hora de inicio</p>
              <select
                id="start-time"
                name="start-time"
                className="mt-1 p-2 block w-full border-gray-300 text-lg rounded-md"
                style={{ fontSize: '1.3rem', color: 'text-primary', lineHeight: '2rem' }}
                value={startTime}
                onChange={handleStartTimeChange}
              >
                {generateTimeOptions()}
              </select>
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-primary mb-4">Hora de fin</p>
              <select
                id="end-time"
                name="end-time"
                className="mt-1 p-2 block w-full border-gray-300 text-lg rounded-md"
                style={{ fontSize: '1.3rem', color: 'text-primary', lineHeight: '2rem' }}
                value={endTime}
                onChange={handleEndTimeChange}
                disabled={!startTime}
              >
                {generateTimeOptions()}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mt-16 ml-8 flex justify-between">
              <div>
                <NavLink to="/home" 
                  className="text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-8"
                  style={{ backgroundColor: '#81A1C1', fontSize: '1.5rem', lineHeight: '2rem' }}>
                  Volver
                </NavLink>
              </div>
              <div className="">
                <button className="text-white font-bold py-2 px-4 rounded inline-flex ml-32 "
                  style={{ backgroundColor: '#BEE3F8', fontSize: '1.5rem', lineHeight: '2rem' }}
                  onClick={handleReservation}>
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpacePage;

