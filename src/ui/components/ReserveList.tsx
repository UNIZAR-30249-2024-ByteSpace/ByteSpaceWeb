/*  Laboratorio de Ingeniería del Software - Béjar Herández, Rubén
* Proyecto:             ByteSpace
* Fichero:              ReserveList.tsx
* Desarrolladores:             
*                       Ruiz Borao, Juan José - 756640            
*                       Clariana Pascual, Rael - 760617
*                       Pellicer Barco, Juan - 818138.
*/
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ReserveCard } from './ReserveCard';
import { SmallReserveCard } from './SmallReserveCard';
import { Reserve } from '../../core/reserve/domain';

type Sizes = 'small' | 'regular';

interface Props {
  list: Reserve[];
  size?: Sizes;
  onCancel: (id: string) => void; // Callback for cancel action
  onAccept: (id: string) => void;
}

const ReserveList: FC<Props> = ({ list, size, onCancel, onAccept }) => {
  return (
    <div className='w-full overflow-y-scroll overflow-x-clip pr-2 h-full'>
      {list.map((r, k) => (
        <div key={k} className='w-full mb-2'>
          {size === 'small' ? (
            <SmallReserveCard reserve={r} />
          ) : (
            <ReserveCard reserve={r} onCancel={onCancel} onAccept={onAccept} />
          )}
        </div>
      ))}
    </div>
  );
};

export { ReserveList };
