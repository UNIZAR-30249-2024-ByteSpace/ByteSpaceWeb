/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              AboutPage.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import React from 'react';
import { MainLayout } from '../components/MainLayout';

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <div className="mt-4">
          <h3 className="text-lg font-bold text-primary mb-2">Reglas para realizar reservas:</h3>
          <table className="w-full border-collapse border border-gray-400">
          <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 text-primary">Roles \ Tipos</th>
            <th className="border border-gray-400 px-4 py-2 text-primary">Aula</th>
            <th className="border border-gray-400 px-4 py-2 text-primary">Seminario</th>
            <th className="border border-gray-400 px-4 py-2 text-primary">Laboratorio</th>
            <th className="border border-gray-400 px-4 py-2 text-primary">Despacho</th>
            <th className="border border-gray-400 px-4 py-2 text-primary">Sala Común</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Estudiante</td>
            <td className="border border-gray-400 px-4 py-2 "></td>
            <td className="border border-gray-400 px-4 py-2 text-primary"></td>
            <td className="border border-gray-400 px-4 py-2 text-primary"></td>
            <td className="border border-gray-400 px-4 py-2 text-primary"></td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Investigador contratado</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí *</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí *</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí *</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Docente-investigador</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí *</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí *</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí *</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Conserje</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 text-primary"></td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Técnico de laboratorio</td>
            <td className="border border-gray-400 px-4 py-2 text-primary"></td>
            <td className="border border-gray-400 px-4 py-2 text-primary"></td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí *</td>
            <td className="border border-gray-400 px-4 py-2 text-primary"></td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Gerente</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Gerente-docente-investigador</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
            <td className="border border-gray-400 px-4 py-2 font-bold text-primary">Sí</td>
          </tr>
        </tbody>
          </table>
          <p className="mt-2 text-sm italic">* Los técnicos de laboratorio, investigadores contratados y docentes-investigadores solo pueden reservar laboratorios y seminarios que estén adscritos a su mismo departamento o la EINA.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
