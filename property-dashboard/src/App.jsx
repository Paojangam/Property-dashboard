import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';

export default function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<PropertyListPage />} />
        {/* route for detail — opens as a page, but PropertyListPage also shows modal when navigated from card */}
        <Route path="/property/:id" element={<PropertyDetailPage />} />
      </Routes>
    </div>
  );
}
