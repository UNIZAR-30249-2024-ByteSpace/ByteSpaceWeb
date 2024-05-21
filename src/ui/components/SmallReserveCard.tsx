/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              SmallReserveCard.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import { FC, useEffect, useState } from 'react';
import { Reserve } from '../../core/reserve/domain';
import { ISpaceRepo, Space, Kind } from '../../core/space/domain';
import { toast } from 'react-toastify'; // Importar el componente de notificaciones
import { HttpSpaceRepo } from '../../infraestructure/http/SpaceRepo';
import Despacho from '../../assets/despacho.svg';
import SalaComun from '/src/assets/salacomun.svg';
import Aula from '/src/assets/aula.svg';
import Laboratorio from '/src/assets/laboratorio.svg';
import Seminario from '/src/assets/seminario.svg';

interface Props {
  reserve: Reserve;
}

const SmallReserveCard: FC<Props> = ({ reserve }) => {
  const [spacesList, setSpacesList] = useState<Space[]>([]);
  const spaceRepo: ISpaceRepo = new HttpSpaceRepo();

  useEffect(() => {
    spaceRepo
      .getAllSpaces()
      .then((list) => {
        setSpacesList(list);
      })
      .catch((error) => {
        toast.error('Error al obtener los espacios', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  }, []);

  const chooseColor = (kind: string): string => {
    switch (kind) {
      case 'aula':
        return '#5E81AC';

      case 'salacomun':
        return '#a3be8c';

      case 'seminario':
        return '#bf616a';

      case 'laboratorio':
        return '#b48ead';

      case 'despacho':
        return '#b48ead';

      default:
        return '';
    }
  };

  const SpaceIcon = (kind: Kind) => {
    switch (kind) {
        case 'aula':
            return (
                <img
                    src={Aula}
                    alt="Aula"
                    style={{ fill: chooseColor(kind) }} // Establece el color del SVG
                    className={'h-full w-14 px-2'} // Aplica clases adicionales si es necesario
                />
            );
  
        case 'salacomun':
            return (
                <img
                  src={SalaComun}
                  alt="Sala Comun"
                  style={{ fill: chooseColor(kind) }} // Establece el color del SVG
                  className={'h-full w-14 px-2'} // Aplica clases adicionales si es necesario
                />
              );
  
        case 'seminario':
            return (
                <img
                  src={Seminario}
                  alt="Seminario"
                  style={{ fill: chooseColor(kind) }} // Establece el color del SVG
                  className={'h-full w-14 px-2'} // Aplica clases adicionales si es necesario
                />
              );
  
        case 'laboratorio':
            return (
                <img
                  src={Laboratorio}
                  alt="Laboratorio"
                  style={{ fill: chooseColor(kind) }} // Establece el color del SVG
                  className={'h-full w-14 px-2'} // Aplica clases adicionales si es necesario
                />
              );
      
        case 'despacho':
            return (
                <img
                  src={Despacho}
                  alt="Despacho"
                  style={{ fill: chooseColor(kind) }} // Establece el color del SVG
                  className={'h-full w-14 px-2'} // Aplica clases adicionales si es necesario
                />
              );
  
        default:
          return '';
      }
    };

  // Encontrar el espacio correspondiente al idEspacio de la reserva
  const space = spacesList.find(space => space.id === reserve.idEspacio);

    return (
    <div className=' flex  justify-center items-center border-opacity-30 border w-full rounded-3xl border-secondary  py-2 px-4  mt-3 h-28'>
        {space && SpaceIcon(space.tipo)}
        <div className='flex flex-col '>
        <h1 className='text-2xl font-bold  text-primary'>{space ? space.informacion : 'Espacio Desconocido'}</h1>
        <h2 className='text-lg font-bold text-primary'>{space ? `Planta ${space.planta}` : ''}</h2>
        </div>
    </div>
    );
};

export { SmallReserveCard };
