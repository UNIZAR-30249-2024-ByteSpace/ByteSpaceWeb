import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Despacho from '../../assets/despacho.svg';
import SalaComun from '/src/assets/salacomun.svg';
import Aula from '/src/assets/aula.svg';
import Laboratorio from '/src/assets/laboratorio.svg';
import Seminario from '/src/assets/seminario.svg';
import { Kind, Space } from '../../core/space/domain';


interface Props {
  space: Space;
}

// Actualizar los colores según diga Juan
const SmallSpaceCard: FC<Props> = ({ space }) => {
  const chooseColor = (kind: Kind): string => {
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

  return (
    <div className=' flex  justify-center items-center border-opacity-30 border w-full rounded-3xl border-secondary  py-2 px-4  mt-3 h-28'>
      {SpaceIcon(space.kind)}
      <div className='flex flex-col '>
        <h1 className='text-2xl font-bold  text-primary'>{space.name}</h1>
        <h2 className='text-lg font-bold text-primary'>{space.address}</h2>
      </div>
    </div>
  );
};
export { SmallSpaceCard };