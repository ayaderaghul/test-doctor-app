import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorList.css';  // Import a CSS file for styling (optional)

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestInfo, setRequestInfo] = useState(null);
  
const [errorDetails, setErrorDetails] = useState(null); // To store the full error object
  const [configDetails, setConfigDetails] = useState(null); // To store the Axios config

  
  
  useEffect(() => {
    // API call to fetch doctor data
    axios.get('https://test-doctor-service.onrender.com/doctors')
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(error => {
        // setError('Failed to fetch doctor data.');
        if (error.response) {
          setError(`Error ${error.response.status}: ${error.response.data.message || 'Something went wrong.'}`);
        } else if (error.request) {
          setError('No response received from the server. Please try again later.');
          setRequestInfo(error.request);
        } else {
          setError('Failed to fetch data. Please check your connection.');
        }

        setErrorDetails(error); // Save the full error object
        setConfigDetails(error.config); // Save the Axios request configuration
        
        setLoading(false);
      });
  }, []);

  return (
    <div className="doctor-list-container">
      <h1>Doctor List</h1>
      {loading && <p>Loading doctors...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && requestInfo && (
        <div className="request-info">
          <h2>Request Details</h2>
          <pre>{JSON.stringify(requestInfo, null, 2)}</pre>
        </div>
        )}

       {!loading && errorDetails && (
        <div className="error-details">
          <h2>Error Object</h2>
          <pre>{JSON.stringify(errorDetails, null, 2)}</pre>

          <h2>Axios Config</h2>
          <pre>{JSON.stringify(configDetails, null, 2)}</pre>
        </div>
      )}
       
      <ul className="doctor-list">
        {doctors.map((doctor, index) => (
          <li key={index} className="doctor-card">
            <h2>{doctor.name}</h2>
            <p><strong>Specialization:</strong> {doctor.specialty}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;
