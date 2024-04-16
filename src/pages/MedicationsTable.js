import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicationsTable() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get('/api/medications');
        setMedications(response.data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };
    fetchMedications();
  }, []);

  return (
    <div>
      <h1>Medications Table</h1>
      <table>
        <thead>
          <tr>
            <th>Drug Name</th>
            <th>Strength</th>
            <th>Form</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication, index) => (
            <tr key={index}>
              <td>{medication.drugName}</td>
              <td>{medication.strength}</td>
              <td>{medication.form}</td>
              <td>{medication.imageUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicationsTable;