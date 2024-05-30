/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              SpaceCard.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import { FC, useEffect, useState } from 'react';
import { Kind, Space } from '../../core/space/domain';
import { chooseColor, SpaceIcon } from '../../utils/kindsSelector';

interface Props {
  space: Space;
}

const ModifyCard: FC<Props> = ({ space }) => {
  return (
    <div>
    <div className='flex justify-between border-opacity-30 border w-full rounded-3xl border-secondary py-2 px-4 mt-3 h-auto'>
        <div className='flex items-center justify-between'>
          {SpaceIcon(space.categoria)}
          <div className='flex flex-col'>
            <h1 className='text-xl font-bold ml-8 mb-2'>{space.id}</h1>
            <h2 className='text-l font-bold ml-8 mb-2'>{space.informacion}</h2>
            <h2 className='text-l font-bold ml-8'>Planta: {space.planta}</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-4 mb-4 ml-6'>
        <div className="flex items-center mb-4">
          <p className="font-bold text-xl text-primary">Reservable:</p>
          <span className="text-xl ml-2">{space.reservable ? "Sí" : "No"}</span>
        </div>
        <div className="flex items-center mb-4">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: chooseColor(space.categoria) }}
            ></div>
            <p className="text-lg md:text-xl font-bold text-primary ">{space.categoria}</p>
        </div>
        <div className="flex items-center mb-4">
          <p className="font-bold text-xl text-primary">Asginado a:</p>
          <span className="text-xl ml-2">{space.asignadoA}</span>
        </div>
        <div className="flex items-center mb-4">
          <p className="font-bold text-xl text-primary">Porcentaje de ocupación:</p>
          <span className="text-xl ml-2">{space.porcentajeOcupacion} %</span>
        </div>
        </div>
    </div>
  );
};
export { ModifyCard };

