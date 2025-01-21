import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorList.css';  // Import a CSS file for styling (optional)

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // API call to fetch doctor data
    axios.get('https://test-doctor-service.onrender.com/doctors')
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch doctor data.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="doctor-list-container">
      <h1>Doctor List</h1>
      {loading && <p>Loading doctors...</p>}
      {error && <p className="error-message">{error}</p>}
      
      <ul className="doctor-list">
        {doctors.map((doctor, index) => (
          <li key={index} className="doctor-card">
            <h2>{doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;
