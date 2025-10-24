import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import AddPropertyForm from '../components/AddPropertyForm';
import PropertyModal from '../components/PropertyModal';
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function PropertyListPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // fetch properties
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      console.log('Fetching from:', API_BASE);

      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error('Fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // If user navigated directly to /property/:id, open modal after loading properties
  useEffect(() => {
    if (!location) return;
    const match = location.pathname.match(/\/property\/(\d+)/);
    if (match && properties.length > 0) {
      const id = Number(match[1]);
      const found = properties.find((p) => p.id === id);
      if (found) setSelectedProperty(found);
    }
  }, [location, properties]);

  const onView = (property) => {
    setSelectedProperty(property);
    navigate(`/property/${property.id}`);
  };

  const onCloseModal = () => {
    setSelectedProperty(null);
    navigate('/');
  };

  // filtering logic
  const types = ['All', ...Array.from(new Set(properties.map((p) => p.type)))];
  const filtered = properties.filter((p) => {
    const matchesType = filterType === 'All' || p.type === filterType;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div className="container">
      <header className="header">
        <h1>Mini Property Listing Dashboard</h1>
        <div className="header-actions">
          <button className="primary">Add Property</button>
        </div>
      </header>

      <section className="controls">
        <div>
          <label>Filter by Type</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Search</label>
          <input
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="grid">
        {loading ? <p>Loading properties…</p> : null}
        {filtered.length === 0 && !loading ? <p>No properties found.</p> : null}
        {filtered.map((prop) => (
          <PropertyCard key={prop.id} property={prop} onView={() => onView(prop)} />
        ))}
      </section>

      <section className="form-area">
        <AddPropertyForm onAdded={fetchProperties} />
      </section>

      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={onCloseModal} />
      )}
    </div>
  );
}
