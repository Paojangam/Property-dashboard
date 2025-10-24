import React from 'react';

export default function PropertyModal({ property, onClose }) {
  // simple map link (no API key). If lat/lng present, provide Google Maps link
  const mapHref = property.lat && property.lng
    ? `https://www.google.com/maps/search/?api=1&query=${property.lat},${property.lng}`
    : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-content">
          <img src={property.image} alt={property.name} className="modal-image" />
          <div className="modal-info">
            <h2>{property.name}</h2>
            <div className="meta">{property.type} • {property.location}</div>
            <p className="price">${Number(property.price).toLocaleString()}</p>
            <p className="full-desc">{property.description}</p>
            {mapHref && <a href={mapHref} target="_blank" rel="noreferrer" className="map-link">Open in Google Maps</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
