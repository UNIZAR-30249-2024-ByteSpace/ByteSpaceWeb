import { FC, useEffect, useState } from 'react';
import Despacho from '/src/assets/despacho.svg';
import SalaComun from '/src/assets/salacomun.svg';
import Aula from '/src/assets/aula.svg';
import Laboratorio from '/src/assets/laboratorio.svg';
import Seminario from '/src/assets/seminario.svg';
import { Kind, Space } from '../../core/space/domain';
import { chooseColor, SpaceIcon } from '../../utils/kindsSelector';

interface Props {
  space: Space;
}

const SpaceCard: FC<Props> = ({ space }) => {
  return (
    <div className=' flex  justify-between items-center border-opacity-30 border w-full rounded-3xl border-secondary  py-2 px-4  mt-3 h-36'>
      <div className='flex items-center justify-between '>
        {SpaceIcon(space.kind)}
        <div className='flex flex-col '>
          <h1 className='text-4xl font-bold  text-primary'>{space.name}</h1>
          <h2 className='text-xl font-bold text-primary'>{space.address}</h2>
        </div>
      </div>
      <div className='flex flex-col collapse xl:visible justify-center items-center '>
        <h1 style={{ color: chooseColor(space.kind) }} className={' font-bold text-6xl'}>
          {space.price}€
        </h1>
        <h2 className='text-secondary font-bold text-2xl'>
          {space.owner === undefined ? 'Disponible' : 'Vendido'}
        </h2>
      </div>
    </div>
  );
};
export { SpaceCard };