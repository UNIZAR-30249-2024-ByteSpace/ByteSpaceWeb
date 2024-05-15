import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Space } from '../../core/space/domain';

// Personalizar el icono predeterminado de Leaflet
const blueIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
});

interface MapComponentProps {
    selectedFloor: number;
    setSelectedFloor: (floor: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ selectedFloor, setSelectedFloor }) => {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = L.map(mapContainer.current, {
            center: [41.6835, -0.889],
            zoom: 30
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const plantaIndex = selectedFloor;

        L.tileLayer.wms("http://localhost:8080/geoserver/ProyectoLabis/wms", {
            layers: `ProyectoLabis:ada_planta_${plantaIndex}`,
            format: 'image/png',
            transparent: true
        }).addTo(map);

        return () => {
            map.remove();
        };
    }, [selectedFloor]);

    const handlePlantaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFloor(parseInt(e.target.value));
    };

    return (
        <div className='w-full overflow-x-clip pr-2 h-full text-primary font-bold text-xl'>
            {/* Selector de plantas */}
            <select value={selectedFloor} onChange={handlePlantaChange}>
                <option value={0}>Planta 0</option>
                <option value={1}>Planta 1</option>
                <option value={2}>Planta 2</option>
                <option value={3}>Planta 3</option>
                <option value={4}>Planta 4</option>
            </select>

            {/* Mapa */}
            <div ref={mapContainer} style={{ width: '960px', height: '500px' }} />
        </div>
    );
};

export { MapComponent };
