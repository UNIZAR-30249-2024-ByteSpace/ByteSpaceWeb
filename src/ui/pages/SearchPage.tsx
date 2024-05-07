import React from 'react';
import ReactDOM from 'react-dom';
import { MapComponent } from '../components/MapComponent';

const SearchPage: React.FC = () => {
  return (
    <div>
      <MapComponent />
    </div>
  );
};

ReactDOM.render(<SearchPage />, document.getElementById('root'));

export default SearchPage;




