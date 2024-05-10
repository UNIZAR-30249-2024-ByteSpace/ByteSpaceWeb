import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { NavLink } from 'react-router-dom';
import { Space } from '../../core/space/domain';

type Sizes = 'small' | 'regular';

interface Props {
    list: Space[]; // Cambia 'Space' por 'any' si no se necesita la definición de 'Space'
  }

// Personalizar el icono predeterminado de Leaflet
const blueIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  });

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedPlanta, setSelectedPlanta] = useState<string>('planta0'); // Estado para la planta seleccionada

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = L.map(mapContainer.current, {
      center: [41.6835, -0.889],
      zoom: 30
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const plantaIndex = selectedPlanta === 'planta0' ? 0 : selectedPlanta === 'planta1' ? 1 : selectedPlanta === 'planta2' ? 2 : selectedPlanta === 'planta3' ? 3 : 4;

    L.tileLayer.wms("http://localhost:8080/geoserver/ProyectoLabis/wms", {
      layers: `ProyectoLabis:ada_planta_${plantaIndex}`,
      format: 'image/png',
      transparent: true
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [selectedPlanta]);

  const handlePlantaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlanta(e.target.value);
  };

  return (
    <div className='w-full overflow-x-clip pr-2 h-full text-primary font-bold text-xl'>
      {/* Selector de plantas */}
      <select value={selectedPlanta} onChange={handlePlantaChange}>
        <option value="planta0">Planta 0</option>
        <option value="planta1">Planta 1</option>
        <option value="planta2">Planta 2</option>
        <option value="planta3">Planta 3</option>
        <option value="planta4">Planta 4</option>
      </select>

      {/* Mapa */}
      <div ref={mapContainer} style={{ width: '960px', height: '500px' }} />
    </div>
  );
};

export { MapComponent };
