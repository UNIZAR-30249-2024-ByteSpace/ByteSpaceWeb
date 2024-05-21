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

const SpaceCard: FC<Props> = ({ space }) => {
  return (
    <div className=' flex  justify-between items-center border-opacity-30 border w-full rounded-3xl border-secondary  py-2 px-4  mt-3 h-36'>
      <div className='flex items-center justify-between '>
        {SpaceIcon(space.categoria)}
        <div className='flex flex-col '>
          <h1 className='text-xl font-bold ml-8 mb-2 '>{space.id}</h1>
          <h2 className='text-l font-bold ml-8 mb-2 '>{space.informacion}</h2>
          <h2 className='text-l font-bold ml-8'>Planta: {space.planta}</h2>
        </div>
      </div>
      <div className='flex flex-col collapse xl:visible justify-center items-center '>
        <h1 style={{ color: chooseColor(space.categoria) }} className={' font-bold text-6xl'}>
          Reservar
        </h1>
      </div>
    </div>
  );
};
export { SpaceCard };