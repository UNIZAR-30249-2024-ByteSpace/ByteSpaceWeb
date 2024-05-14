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
}

const ReserveList: FC<Props> = ({ list, size, onCancel }) => {
  return (
    <div className='w-full overflow-y-scroll overflow-x-clip pr-2 h-full'>
      {list.map((r, k) => (
        <div key={k} className='w-full mb-2'>
          {size === 'small' ? (
            <SmallReserveCard reserve={r} />
          ) : (
            <ReserveCard reserve={r} onCancel={onCancel} />
          )}
        </div>
      ))}
    </div>
  );
};

export { ReserveList };
