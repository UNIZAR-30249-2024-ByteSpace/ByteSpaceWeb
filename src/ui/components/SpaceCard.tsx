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
        {SpaceIcon(space.tipo)}
        <div className='flex flex-col '>
          <h1 className='text-xl font-bold ml-8 mb-2 '>{space.informacion}</h1>
          <h2 className='text-xl font-bold ml-8'>Planta: {space.planta}</h2>
        </div>
      </div>
      <div className='flex flex-col collapse xl:visible justify-center items-center '>
        <h1 style={{ color: chooseColor(space.tipo) }} className={' font-bold text-6xl'}>
          Reservar
        </h1>
      </div>
    </div>
  );
};
export { SpaceCard };