import React, { FC, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Space } from '../../core/space/domain';
import L from 'leaflet';
import { NavLink } from 'react-router-dom';

type Sizes = 'small' | 'regular';

interface Props {
  list: Space[];
  size?: Sizes;
}

// Personalizar el icono predeterminado de Leaflet
const blueIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

// Define los diferentes mapas para cada planta
const maps: Record<string, string> = {
  planta1: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  planta2: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
  planta3: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  planta4: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

const Mapa: FC<Props> = ({ list }) => {
  const center = L.latLng([41.6488, -0.8891]);
  const [selectedPlanta, setSelectedPlanta] = useState<string>('planta1'); // Estado para la planta seleccionada

  const renderMarkers = () => {
    return list.map((space) => (
      <Marker icon={blueIcon} key={space.id} position={[space.lat, space.lng]}>
        <Popup>
          <div>
            <h2>{space.name}</h2>
            <p>{space.address}</p>
            <NavLink to={`/space/${space.id}`}>Ver más</NavLink>
          </div>
        </Popup>
      </Marker>
    ));
  };

  return (
    <div className='w-full overflow-x-clip pr-2 h-full text-primary font-bold text-lg'>
      {/* Selector de planta */}
      <select value={selectedPlanta} onChange={(e) => setSelectedPlanta(e.target.value)}>
        <option value="planta1">Planta 1</option>
        <option value="planta2">Planta 2</option>
        <option value="planta3">Planta 3</option>
        <option value="planta4">Planta 4</option>
      </select>

      {/* Mapa con el TileLayer según la planta seleccionada */}
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className='w-full overflow-x-clip pr-2 h-full '
      >
        <TileLayer url={maps[selectedPlanta]} />
        {renderMarkers()}
      </MapContainer>
    </div>
  );
};

export { Mapa };
