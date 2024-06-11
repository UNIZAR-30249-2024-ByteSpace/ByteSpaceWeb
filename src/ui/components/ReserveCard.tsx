/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              ReserveCard.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import { FC, useEffect, useState } from 'react';
import { Reserve } from '../../core/reserve/domain';
import { ISpaceRepo, Space } from '../../core/space/domain';
import { HttpSpaceRepo } from '../../infraestructure/http/SpaceRepo';
import { SpaceIcon, chooseColor } from '../../utils/kindsSelector';
import { useAuth } from '../components/AuthContext'; // Importa el hook useAuth
import axios from 'axios'; // Importar axios

interface Props {
  reserve: Reserve;
  onCancel: (id: string) => void;
  onAccept: (id: string) => void; // Función para aceptar la reserva
}

const ReserveCard: FC<Props> = ({ reserve, onCancel, onAccept }) => {
  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    const fetchSpace = async () => {
      const spaceRepo: ISpaceRepo = new HttpSpaceRepo();
      try {
        console.log("ID DEL ESPACIO: " + reserve._idEspacio)
        const fetchedSpace = await spaceRepo.getSpaceById(reserve._idEspacio); 
        console.log('Espacio obtenido:', fetchedSpace); // Agrega este console.log
        setSpace(fetchedSpace);
      } catch (error) {
        console.error('Error al obtener el espacio:', error);
      }
    };

    fetchSpace();
  }, [reserve._idEspacio]);

  const formattedDate = new Date(reserve._fecha).toLocaleDateString();
  const startTime = reserve._horaInicio;
  const endTime = reserve._horaFin;

  const { user } = useAuth(); // Obtén el usuario del contexto de autenticación

  console.log("USER" + user?.id)
  console.log("RESERVA" + reserve._idPersona)

  return (
    <div className='flex justify-between items-center border-opacity-30 border w-full rounded-3xl border-secondary py-2 px-4 mt-3 h-36'>
      <div className='flex items-center justify-between'>
        {space && (
          <>
            {SpaceIcon(space._tipo)}
            <div className='flex flex-col'>
              <h1 className='text-xl font-bold ml-8 mb-2'>{space._informacion}</h1>
              <p className='ml-8'>Fecha: {formattedDate}</p>
              <p className='ml-8'>Hora: {startTime} - {endTime}</p>
              <p className='ml-8'>Reservado por: {reserve._idPersona}</p>
              <p className='ml-8' style={{ color: chooseColor(space._tipo) }}>Tipo de espacio: {space._tipo}</p>
            </div>
          </>
        )}
      </div>
      <div className='flex flex-col justify-center items-center'>
        {(user?.rol=="gerente" || user?.rol=="gerente-docente-investigador") && user?.id!=reserve._idPersona && reserve._potencialInvalida && ( // Condición para mostrar el botón
          <button className='font-bold text-xl mb-4' style={{ color: '#006400' }} onClick={() => onAccept(reserve._id)}>
            Aceptar
          </button>
        )}
        <button className='font-bold text-xl mb-4' style={{ color: '#FF0000' }} onClick={() => onCancel(reserve._id)}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export { ReserveCard };
