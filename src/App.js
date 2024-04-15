import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [searchTerms, setSearchTerms] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [strength, setStrength] = useState('');
  const [form, setForm] = useState('');
  const handleSearch = () => {
    // Add your search functionality here
    console.log('Search button clicked');
  };
  

  // Fetch autocomplete suggestions from the API
  useEffect(() => {
    const fetchAutocompleteSuggestions = async (query) => {
      try {
        const response = await axios.get('/api/autocomplete', {
          params: { query },
        });
        setSearchTerms(response.data);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    };

    fetchAutocompleteSuggestions(`${drugName} ${strength} ${form}`);
  }, [drugName, strength, form]);

  return (
    <div className="App">
      <h1>Search for Medications</h1>
      <div className="search-bars">
        <input
          type="text"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          placeholder="Drug Name"
          list="drug-name-suggestions"
        />
        <datalist id="drug-name-suggestions">
          {searchTerms.map((term, index) => (
            <option key={index} value={term.drugName} />
          ))}
        </datalist>

        <input
          type="text"
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
          placeholder="Strength"
          list="strength-suggestions"
        />
        <datalist id="strength-suggestions">
          {searchTerms.map((term, index) => (
            <option key={index} value={term.strength} />
          ))}
        </datalist>

        <input
          type="text"
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Form"
          list="form-suggestions"
        />
        <datalist id="form-suggestions">
          {searchTerms.map((term, index) => (
            <option key={index} value={term.form} />
          ))}
        </datalist>

        {/* Add a search button or functionality here */}
        <button onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );

  return (
  <div className="App">
    <h1>Search for Medications</h1>
    {/* ... existing search functionality */}

    <Link to="/medications-table">View Medications Table</Link>
  </div>
  );
}

export default App;
