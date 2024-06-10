/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              SpaceList.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { SmallSpaceCard } from './SmallSpaceCard';
import { Space } from '../../core/space/domain';
import { SpaceCard } from './SpaceCard';

type Sizes = 'small' | 'regular';

interface Props {
  list: Space[];
  size?: Sizes;
}

const SpaceList: FC<Props> = ({ list, size }) => {
  return (
    <div className='w-full overflow-y-scroll overflow-x-clip pr-2 h-full '>
      {list.map((p, k) => (
        <NavLink className='w-full ' key={k} to={`/space/${p._id}`}>
          {size === 'small' ? (
            <SmallSpaceCard space={p} />
          ) : (
            <SpaceCard space={p} />
          )}
        </NavLink>
      ))}
    </div>
  );
};

export { SpaceList };