import { FC, useEffect, useState } from 'react';
import { Reserve } from '../../core/reserve/domain';
import { ISpaceRepo, Space } from '../../core/space/domain';
import { HttpSpaceRepo } from '../../infraestructure/http/SpaceRepo';
import { SpaceIcon, chooseColor } from '../../utils/kindsSelector';

interface Props {
  reserve: Reserve;
  onCancel: (id: string) => void;
}

const ReserveCard: FC<Props> = ({ reserve, onCancel }) => {
  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    const fetchSpace = async () => {
      const spaceRepo: ISpaceRepo = new HttpSpaceRepo();
      try {
        const fetchedSpace = await spaceRepo.getSpaceById(reserve.idEspacio); 
        console.log('Espacio obtenido:', fetchedSpace); // Agrega este console.log
        setSpace(fetchedSpace);
      } catch (error) {
        console.error('Error al obtener el espacio:', error);
      }
    };

    fetchSpace();
  }, [reserve.idEspacio]);

  const formattedDate = new Date(reserve.fecha).toLocaleDateString();
  const startTime = reserve.horaInicio;
  const endTime = reserve.horaFin;

  return (
    <div className='flex justify-between items-center border-opacity-30 border w-full rounded-3xl border-secondary py-2 px-4 mt-3 h-36'>
      <div className='flex items-center justify-between'>
        {space && (
          <>
            {SpaceIcon(space.tipo)}
            <div className='flex flex-col'>
              <h1 className='text-xl font-bold ml-8 mb-2'>Reserva {reserve.id}</h1>
              <p className='ml-8'>Fecha: {formattedDate}</p>
              <p className='ml-8'>Hora: {startTime} - {endTime}</p>
              <p className='ml-8'>Reservado por: {reserve.idPersona}</p>
              <p className='ml-8' style={{ color: chooseColor(space.tipo) }}>Tipo de espacio: {space.tipo}</p>
            </div>
          </>
        )}
      </div>
      <div className='flex flex-col justify-center items-center'>
        <button className='font-bold text-6xl' onClick={() => onCancel(reserve.id)}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export { ReserveCard };
