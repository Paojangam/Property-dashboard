import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropertyModal from '../components/PropertyModal';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_BASE);
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const onClose = () => navigate('/');

  if (!property) return <div className="center">Loading...</div>;
  return <PropertyModal property={property} onClose={onClose} />;
}
