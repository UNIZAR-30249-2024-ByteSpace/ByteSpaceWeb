import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { Space } from '../../core/space/domain';
import { chooseColor } from '../../utils/kindsSelector';
import { NavLink } from 'react-router-dom';

const SpacePage: React.FC = () => {
  // Obtener la fecha actual y sumar un día para establecer el mínimo
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  // State para la fecha y hora de inicio y fin de la reserva
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('08:00');
  const [endTime, setEndTime] = useState<string>('08:30');

  // Manejadores de cambio para la fecha y hora de inicio y fin de la reserva
  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate && selectedDate >= minDate) {
      setDate(selectedDate);
      // Resetear la hora de inicio y fin al valor predeterminado
      setStartTime('08:00');
      setEndTime('09:00'); // Establecer la hora de fin como una hora más que la hora de inicio
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStartTime = e.target.value;
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    if (
      date && 
      (
        (date > currentDate) || // Verifica si la fecha es posterior a la fecha actual
        (date.getDate() === currentDate.getDate() && parseInt(selectedStartTime.split(':')[0]) > currentHour) || // Verifica si la hora seleccionada es posterior a la hora actual si es el mismo día
        (date.getDate() === currentDate.getDate() && parseInt(selectedStartTime.split(':')[0]) === currentHour && parseInt(selectedStartTime.split(':')[1]) > currentMinute) // Verifica si los minutos seleccionados son posteriores a los minutos actuales si es el mismo día y la misma hora
      )
    ) {
      setStartTime(selectedStartTime);
      // Actualizar la hora de fin como una hora más que la hora de inicio
      const nextHour = parseInt(selectedStartTime.split(':')[0]) + 1;
      const formattedNextHour = nextHour.toString().padStart(2, '0');
      setEndTime(`${formattedNextHour}:00`);
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedEndTime = e.target.value;
    if (date && new Date(date.toDateString() + ' ' + selectedEndTime) > new Date(date.toDateString() + ' ' + startTime)) { // Verifica si la hora de fin es posterior a la hora de inicio
      setEndTime(selectedEndTime);
    }
  };

  // Generador de opciones de tiempo
  const generateTimeOptions = () => {
    const options = [];
    let time = new Date();
    time.setHours(8, 0, 0); // Set time to 8:00 AM

    while (time.getHours() < 22) {
      const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      options.push(
        <option key={formattedTime} value={formattedTime}>
          {formattedTime}
        </option>
      );
      time.setHours(time.getHours() + 1); // Increment time by 1 hour
    }

    return options;
  };

  // Espacio seleccionado de la lista
  const selectedSpace: Space = {
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
  }

  // Función para manejar la reserva (aquí se implementará la lógica de reserva)
  const handleReservation = () => {
    // Aquí implementa la lógica de reserva
    // Por ejemplo, puedes redirigir a la página de confirmación de reserva
  };

  return (
    <MainLayout>
      <div className="flex">
        {/* Información del espacio */}
        <div className="w-1/2 p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{selectedSpace.informacion}</h1>
          <p className="text-lg md:text-xl font-bold text-primary mb-4">Planta {selectedSpace.planta}</p>
          <div className="flex items-center mb-8">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: chooseColor(selectedSpace.kind) }}
            ></div>
            <p className="text-lg md:text-xl font-bold text-primary ">{selectedSpace.kind}</p>
          </div>
          {/* Mostrar toda la información disponible del espacio */}
          <div className="mb-10">
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center">
                <p className="font-bold text-primary mr-2">Superficie:</p>
                <p>{selectedSpace.tamanio} m2</p>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-primary mr-2">Ocupación:</p>
                <p>{selectedSpace.maxOcupantes} personas</p>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-primary mr-2">Reservable:</p>
                <p>{selectedSpace.reservable ? "Sí" : "No"}</p>
              </div>
              <div className="flex items-center">
                <p className="font-bold text-primary mr-2">Pertenece a:</p>
                <p>{selectedSpace.asignadoA}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Selector de fecha y hora */}
        <div className="w-2/5 p-4">
          {/* Selector de fecha */}
          <div className="mb-16">
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Fecha de reserva</p>
            <input
              type="date"
              id="date"
              name="date"
              className="custom-date-selector"
              style={{ fontSize: '1.3rem', color: 'text-primary', lineHeight: '2rem' }} // Estilos en línea
              min={minDate.toISOString().split('T')[0]} // Establece el mínimo como la fecha actual
              onChange={(e) => handleDateChange(new Date(e.target.value))}
            />
          </div>
          {/* Selectores de hora */}
          <div className="grid grid-cols-2 gap-4">
            {/* Selector de hora de inicio */}
            <div>
              <p className="text-lg md:text-xl font-bold text-primary mb-4">Hora de inicio</p>
              <select
                id="start-time"
                name="start-time"
                className="mt-1 p-2 block w-full border-gray-300 text-lg rounded-md"
                style={{ fontSize: '1.3rem', color: 'text-primary', lineHeight: '2rem' }} // Estilos en línea
                value={startTime}
                onChange={handleStartTimeChange}
              >
                {generateTimeOptions()}
              </select>
            </div>
            {/* Selector de hora de fin */}
            <div>
              <p className="text-lg md:text-xl font-bold text-primary mb-4">Hora de fin</p>
              <select
                id="end-time"
                name="end-time"
                className="mt-1 p-2 block w-full border-gray-300 text-lg rounded-md"
                style={{ fontSize: '1.3rem', color: 'text-primary', lineHeight: '2rem' }} // Estilos en línea
                value={endTime}
                onChange={handleEndTimeChange}
                disabled={!startTime} // Desactiva el selector si no se ha seleccionado una hora de inicio
              >
                {generateTimeOptions()}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Botones */}
            <div className="mt-16 ml-8 flex justify-between">
              <div>
                <NavLink to="/home" 
                  className="text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-8"
                  style={{ backgroundColor: '#81A1C1', fontSize: '1.5rem', lineHeight: '2rem' }}> {/* Estilo en línea para el botón Volver */}
                  Volver
                </NavLink>
              </div>
              <div className="">
                <button className="text-white font-bold py-2 px-4 rounded inline-flex ml-32 "
                  style={{ backgroundColor: '#BEE3F8', fontSize: '1.5rem', lineHeight: '2rem' }} // Estilo en línea para el botón Reservar
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
