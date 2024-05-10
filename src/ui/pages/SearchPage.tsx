import React from 'react';
import { MainLayout } from '../components/MainLayout';
import { NavLink } from 'react-router-dom';

const SearchPage: React.FC = () => {

    // Función para manejar la búsqueda
    const handleSearch = () => {
      // Aquí implementa la lógica de búsqueda
      // Por ejemplo, puedes redirigir a la página con los resultados de la búsqueda
    };

  return (
    <MainLayout>
      <div className="flex justify-center items-center mr-8">
        <div className="grid grid-cols-2 gap-6 w-full">
          {/* Selector de Tipo */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Tipo:</p>
            <select id="type" name="type" className="p-2 border border-gray-300 rounded-md w-full">
              <option value="classroom">Aula</option>
              <option value="common-room">Sala común</option>
              <option value="laboratory">Laboratorio</option>
              <option value="office">Despacho</option>
              <option value="seminar-room">Seminario</option>
            </select>
          </div>
          {/* Selector de Tamaño */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Tamaño:</p>
            <select id="size" name="size" className="p-2 border border-gray-300 rounded-md w-full">
              {[...Array(7)].map((_, i) => (
                <option key={i} value={i * 50}>Más de {i * 50} metros cuadrados</option>
              ))}
            </select>
          </div>
          {/* Selector de Capacidad */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Capacidad:</p>
            <select id="capacity" name="capacity" className="p-2 border border-gray-300 rounded-md w-full">
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i * 20}>Más de {i * 20} personas</option>
              ))}
            </select>
          </div>
          {/* Selector de Categoria */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Categoria:</p>
            <select id="category" name="category" className="p-2 border border-gray-300 rounded-md w-full">
              <option value="classroom">Aula</option>
              <option value="common-room">Sala común</option>
              <option value="laboratory">Laboratorio</option>
              <option value="office">Despacho</option>
              <option value="seminar-room">Seminario</option>
            </select>
          </div>
          {/* Selector de Planta */}
          <div>
            <p className="text-lg md:text-xl font-bold text-primary mb-4">Planta:</p>
            <select id="floor" name="floor" className="p-2 border border-gray-300 rounded-md w-full">
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
                style={{ backgroundColor: '#81A1C1', fontSize: '1.5rem', lineHeight: '2rem' }}> {/* Estilo en línea para el botón Volver */}
                Volver
              </NavLink>
            </div>
            <div className="ml-4">
              <button className="text-white font-bold py-2 px-4 rounded inline-flex"
                style={{ backgroundColor: '#BEE3F8', fontSize: '1.5rem', lineHeight: '2rem' }} // Estilo en línea para el botón Buscar
                onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
