import React from 'react';

export default function PropertyCard({ property, onView }) {
  return (
    <div className="card">
      <div className="card-image" style={{ backgroundImage: `url(${property.image})` }} />
      <div className="card-body">
        <h3>{property.name}</h3>
        <div className="meta">{property.type} • {property.location}</div>
        <p className="desc">{property.description.slice(0, 90)}{property.description.length > 90 ? '...' : ''}</p>
        <div className="card-footer">
          <strong>${Number(property.price).toLocaleString()}</strong>
          <button className="view-btn" onClick={onView}>View</button>
        </div>
      </div>
    </div>
  );
}
