import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE 

export default function AddPropertyForm({ onAdded }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !type || !price || !location) {
      setError('Name, Type, Price and Location are required.');
      return;
    }
    const body = {
      name,
      type,
      price: Number(price),
      location,
      description,
      image: image || `https://placehold.co/600x400?text=${encodeURIComponent(name)}`
    };
    setSaving(true);
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Failed to save');
      // reset form
      setName(''); setType(''); setPrice(''); setLocation(''); setDescription(''); setImage('');
      if (onAdded) onAdded();
    } catch (err) {
      setError('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="add-form" onSubmit={submit}>
      <h2>Add Property</h2>
      {error && <div className="error">{error}</div>}
      <label>Property Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <label>Type</label>
      <input value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g. Condo, Villa, Plot" />

      <label>Price</label>
      <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" />

      <label>Location</label>
      <input value={location} onChange={(e) => setLocation(e.target.value)} />

      <label>Description (optional)</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Image URL (optional)</label>
      <input value={image} onChange={(e) => setImage(e.target.value)} />

      <button type="submit" className="primary" disabled={saving}>{saving ? 'Saving…' : 'Submit'}</button>
    </form>
  );
}
