import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Reglas para realizar reservas:</h3>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Roles \ Tipos</th>
              <th className="border border-gray-400 px-4 py-2">Aula</th>
              <th className="border border-gray-400 px-4 py-2">Seminario</th>
              <th className="border border-gray-400 px-4 py-2">Laboratorio</th>
              <th className="border border-gray-400 px-4 py-2">Despacho</th>
              <th className="border border-gray-400 px-4 py-2">Sala Común</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Estudiante</td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Investigador contratado</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí *</td>
              <td className="border border-gray-400 px-4 py-2">Sí *</td>
              <td className="border border-gray-400 px-4 py-2">Sí *</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Docente-investigador</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí *</td>
              <td className="border border-gray-400 px-4 py-2">Sí *</td>
              <td className="border border-gray-400 px-4 py-2">Sí *</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Conserje</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Técnico de laboratorio</td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2">Sí *</td>
              <td className="border border-gray-400 px-4 py-2"></td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Gerente</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
            </tr>
            <tr>
              <td className="border border-gray-400 px-4 py-2">Gerente-docente-investigador</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
              <td className="border border-gray-400 px-4 py-2">Sí</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-sm italic">* Los técnicos de laboratorio, investigadores contratados y docentes-investigadores solo pueden reservar laboratorios y seminarios que estén adscritos a su mismo departamento o la EINA.</p>
      </div>
    </div>
  );
};

export default AboutPage;
