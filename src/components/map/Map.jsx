import { MapContainer, TileLayer } from 'react-leaflet';
import './map.scss';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

function Map({ items }) {
  const updatedItems = items.map(item => ({
    ...item,
    latitude: item.latitute, // Correcting the field name
  }));

  // Filter out items with invalid coordinates
  const validItems = updatedItems.filter(item => 
    item.latitude !== undefined && item.longitude !== undefined
  );

  // Log invalid items for debugging
  const invalidItems = updatedItems.filter(item => 
    item.latitude === undefined || item.longitude === undefined
  );
  if (invalidItems.length > 0) {
    console.warn("Invalid items:", invalidItems);
  }

  const defaultCenter = [52.4797, -1.90269];
  const center = validItems.length === 1 
    ? [validItems[0].latitude, validItems[0].longitude] 
    : defaultCenter;

  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom={false} className='map'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validItems.map(item => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;