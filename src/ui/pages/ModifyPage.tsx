/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              SearchPage.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ModifyList } from '../components/ModifyList';
import { toast } from 'react-toastify';

const ModifyPage: React.FC = () => {
  const [categoria, setCategoria] = useState('aula');
  const [porcentajeOcupacion, setCapacidad] = useState(0);
  const [planta, setPlanta] = useState(0);
  const [espacios, setEspacios] = useState([]); // Estado para almacenar los espacios
  const [id, setId] = useState<string>('');
  const [asignadoA, setAssignedTo] = useState('EINA');
  const [otroCategoria, setOtroCategoria] = useState<string>('');

  const handleOtroCategoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtroCategoria(event.target.value);
  };

  const [reservable, setReservable] = useState<string>('true');

  const handleReservableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReservable(event.target.value);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  // Controlador de evento para el selector de categoría
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(event.target.value);
  };

  const handleAssignedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAssignedTo(event.target.value);
  };

  // Controlador de evento para el selector de capacidad
  const handleCapacityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCapacidad(parseInt(event.target.value));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/spaces/search', {
        params: {
          id,
          categoria,
          porcentajeOcupacion,
          planta
        }
      });

      // Actualiza el estado con los espacios devueltos por la API
      setEspacios(response.data);

      // Aquí puedes manejar la respuesta de la API
      console.log(response.data);
    } catch (error) {
      console.error('Error al buscar espacios:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/spaces/actualizarEspacio', {
          id,
          reservable,
          categoria,
          asignadoA,
          porcentajeOcupacion
      });

      const response2 = await axios.get('http://localhost:3000/api/spaces/search', {
        params: {
          id,
          categoria,
          porcentajeOcupacion,
          planta
        }
      });

      // Actualiza el estado con los espacios devueltos por la API
      setEspacios(response2.data);

      // Aquí puedes manejar la respuesta de la API
      console.log(response.data);
    } catch (error) {
      console.error('Error al buscar espacios:', error);
    }
  };

  return (
    <MainLayout>
      <div className='w-full h-full flex justify-center items-center md:pb-40 px-6'>
        {/* Formulario de búsqueda */}
        <div className='h-full md:w-1/2 px-2 w-full '>
          {/* Selectores y botones */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Identificador:</p>
            <div className="flex items-center mb-4">
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="p-2 border border-gray-300 rounded-md w-1/2"
                value={id}
                onChange={handleIdChange}
                placeholder="Introduce el identificador de un espacio"
              />
              <button
                className="text-white font-bold py-2 px-4 rounded border border-gray-300 ml-4 w-1/2"
                style={{ backgroundColor: '#BEE3F8', fontSize: '1.5rem', lineHeight: '1.5rem' }}
                onClick={handleSearch}
              >
                Buscar
              </button>
            </div>
          </div>
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Reservable:</p>
            <select
              id="reservable"
              name="reservable"
              className="p-2 border border-gray-300 rounded-md w-full mb-4"
              value={reservable}
              onChange={handleReservableChange}
            >
              <option value="true">Verdadero</option>
              <option value="false">Falso</option>
            </select>
          </div>
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Categoria:</p>
            <select id="category" name="category" className="p-2 border border-gray-300 rounded-md w-full mb-4" value={categoria} onChange={handleCategoryChange}>
              <option value="aula">Aula</option>
              <option value="salacomun">Sala común</option>
              <option value="laboratorio">Laboratorio</option>
              <option value="despacho">Despacho</option>
              <option value="seminario">Seminario</option>
            </select>
          </div>
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Asignado a:</p>
            <select id="asignadoA" name="asignadoA" className="p-2 border border-gray-300 rounded-md w-full mb-4" value={asignadoA} onChange={handleAssignedChange}>
              <option value="EINA">EINA</option>
              <option value="INGENIERIA DE SISTEMAS">Ingenieria de Sistemas</option>
              <option value="INFORMATICA">Informatica</option>
              </select>
          </div>
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Porcentaje de ocupación:</p>
            <select
              id="capacity"
              name="capacity"
              className="p-2 border border-gray-300 rounded-md w-full mb-4"
              value={porcentajeOcupacion}
              onChange={handleCapacityChange}
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i * 10}>{i * 10} %</option>
              ))}
            </select>
          </div>
          <div className="mt-8 col-span-2 flex justify-center">
            <div>
              <NavLink to="/home" 
                className="text-gray-800 font-bold py-2 px-4 rounded inline-flex border border-gray-300 items-center ml-8"
                style={{ backgroundColor: '#81A1C1', fontSize: '1.5rem', lineHeight: '2rem' }}>
                Volver
              </NavLink>
            </div>
            <div className="ml-4">
              <button className="text-white font-bold py-2 px-4 rounded border border-gray-300 inline-flex"
                style={{ backgroundColor: '#BEE3F8', fontSize: '1.5rem', lineHeight: '2rem' }}
                onClick={handleEdit}>
                Editar
              </button>
            </div>
          </div>
        </div>
        {/* Resultados */}
        <div className='h-full md:w-1/2 px-2 w-full '>
        {espacios.length === 0 ? (
          <div className='flex justify-center items-center h-full'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-64 w-64 text-gray-500"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
          </div>
        ) : (
          <ModifyList list={espacios} />
        )}
      </div>
        </div>
    </MainLayout>
  );
};

export default ModifyPage;


