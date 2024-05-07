import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { Space } from '../../core/space/domain';
import { chooseColor } from '../../utils/kindsSelector';

const SpacePage: React.FC = () => {
  // State para la fecha y hora de inicio y fin de la reserva
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('08:00');
  const [endTime, setEndTime] = useState<string>('08:30');

  // Manejadores de cambio para la fecha y hora de inicio y fin de la reserva
  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(e.target.value);
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
      time.setMinutes(time.getMinutes() + 30); // Increment time by 30 minutes
    }

    return options;
  };

  // Espacio seleccionado de la lista
  const selectedSpace: Space = {
    name: 'Propiedad 3',
    id: '3',
    address: 'Avenida academia nº12',
    kind: 'salacomun',
    price: 240000,
    lat: 41.6488,
    lng: -0.8891,
    income: 0,
  };

  return (
    <MainLayout>
      <div className="flex">
        {/* Información del espacio */}
        <div className="w-1/2 p-4">
          <h2 className="text-lg font-bold mb-2">Información del Espacio</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{selectedSpace.name}</h1>
          <p className="text-lg md:text-xl text-secondary mb-4">{selectedSpace.address}</p>
          <div className="flex items-center mb-4">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: chooseColor(selectedSpace.kind) }}
            ></div>
            <p className="text-lg md:text-xl font-bold text-primary">{selectedSpace.kind}</p>
          </div>
          {/* Mostrar toda la información disponible del espacio */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-primary">Información adicional:</h2>
            <ul className="list-disc pl-6">
              <li>Identificador: {selectedSpace.id}</li>
              <li>Precio: {selectedSpace.price}</li>
              <li>Latitud: {selectedSpace.lat}</li>
              <li>Longitud: {selectedSpace.lng}</li>
              <li>Ingresos: {selectedSpace.income}</li>
            </ul>
          </div>
        </div>
        {/* Selector de fecha y hora */}
        <div className="w-1/2 p-4">
          {/* Selector de fecha */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Fecha de reserva
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md"
              onChange={(e) => handleDateChange(new Date(e.target.value))}
            />
          </div>
          {/* Selectores de hora */}
          <div className="grid grid-cols-2 gap-4">
            {/* Selector de hora de inicio */}
            <div>
              <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">
                Hora de inicio
              </label>
              <select
                id="start-time"
                name="start-time"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                value={startTime}
                onChange={handleStartTimeChange}
              >
                {generateTimeOptions()}
              </select>
            </div>
            {/* Selector de hora de fin */}
            <div>
              <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">
                Hora de fin
              </label>
              <select
                id="end-time"
                name="end-time"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md"
                value={endTime}
                onChange={handleEndTimeChange}
              >
                {generateTimeOptions()}
              </select>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpacePage;
