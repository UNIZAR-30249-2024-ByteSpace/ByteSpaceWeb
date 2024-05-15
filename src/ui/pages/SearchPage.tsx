import React, { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { SpaceList } from '../components/SpaceList';
import { toast } from 'react-toastify';

const SearchPage: React.FC = () => {
  const [categoria, setCategoria] = useState('aula');
  const [tamanio, setTamanio] = useState(0);
  const [capacidad, setCapacidad] = useState(0);
  const [planta, setPlanta] = useState(0);
  const [espacios, setEspacios] = useState([]); // Estado para almacenar los espacios
  // Controlador de evento para el selector de categoría
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(event.target.value);
  };

  // Controlador de evento para el selector de tamaño
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTamanio(parseInt(event.target.value));
  };

  // Controlador de evento para el selector de capacidad
  const handleCapacityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCapacidad(parseInt(event.target.value));
  };

  // Controlador de evento para el selector de planta
  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlanta(parseInt(event.target.value));
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/spaces/search', {
        params: {
          categoria,
          tamanio,
          capacidad,
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

  return (
    <MainLayout>
      <div className="flex justify-center items-center mr-8">
        <div className="grid grid-cols-2 gap-6 w-full">
{/* Selector de Categoria */}
<div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Categoria:</p>
            <select id="category" name="category" className="p-2 border border-gray-300 rounded-md w-full" value={categoria} onChange={handleCategoryChange}>
              <option value="aula">Aula</option>
              <option value="salacomun">Sala común</option>
              <option value="laboratorio">Laboratorio</option>
              <option value="despacho">Despacho</option>
              <option value="seminario">Seminario</option>
            </select>
          </div>
          {/* Selector de Tamaño */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Tamaño:</p>
            <select id="size" name="size" className="p-2 border border-gray-300 rounded-md w-full" value={tamanio} onChange={handleSizeChange}>
              {[...Array(7)].map((_, i) => (
                <option key={i} value={i * 50}>Más de {i * 50} metros cuadrados</option>
              ))}
            </select>
          </div>
          {/* Selector de Capacidad */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Capacidad:</p>
            <select id="capacity" name="capacity" className="p-2 border border-gray-300 rounded-md w-full"  value={capacidad} onChange={handleCapacityChange}>
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i * 20}>Más de {i * 20} personas</option>
              ))}
            </select>
          </div>
          {/* Selector de Planta */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Planta:</p>
            <select id="floor" name="floor" className="p-2 border border-gray-300 rounded-md w-full" value={planta} onChange={handleFloorChange}>
              {[...Array(5)].map((_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="mt-8 col-span-2 flex justify-center">
            <div>
              <NavLink to="/home" 
                className="text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-8"
                style={{ backgroundColor: '#81A1C1', fontSize: '1.5rem', lineHeight: '2rem' }}>
                Volver
              </NavLink>
            </div>
            <div className="ml-4">
              <button className="text-white font-bold py-2 px-4 rounded inline-flex"
                style={{ backgroundColor: '#BEE3F8', fontSize: '1.5rem', lineHeight: '2rem' }}
                onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar los espacios */}
      <div>
        <SpaceList list={espacios} />
      </div>
    </MainLayout>
  );
};

export default SearchPage;
