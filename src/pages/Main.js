// Main.js

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

const SearchTextArea = styled.textarea`
  width: 80%;
  height: 1rem;
  font-size: 1rem;
  padding: 1rem;
`;

const Main = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchFields, setSearchFields] = useState([]);

  const handleSearchInput = (event) => {
    if (event.key === 'Enter') {
      setSearchInput(searchInput + '\n');
    } else {
      setSearchInput(event.target.value);
    }
  };

  const handleSearch = () => {
    // Split the search input into individual search fields
    const fields = searchInput.split('\n').map((field) => field.trim()).filter(Boolean);
    setSearchFields([...searchFields, ...fields]);
    setSearchInput('');
  };

  const handleAutocomplete = async (index, value) => {
    try {
      // Make a request to the other webpage to get autocomplete suggestions
      const response = await axios.get(`/api/autocomplete?q=${value}`);
      // Update the corresponding search field with the autocomplete value
      const updatedFields = [...searchFields];
      updatedFields[index] = response.data.suggestion;
      setSearchFields(updatedFields);
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...searchFields];
    updatedFields.splice(index, 1);
    setSearchFields(updatedFields);
  };

  return (
    <Container>
      <h1>Medication Search</h1>
      <SearchContainer>
        <SearchTextArea
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="Enter search terms (press Enter to add a new line)"
        />
        <button onClick={handleSearch}>Search</button>

        {searchFields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              value={field}
              onChange={(event) => handleAutocomplete(index, event.target.value)}
            />
            <button onClick={() => handleRemoveField(index)}>Remove</button>
          </div>
        ))}
      </SearchContainer>
    </Container>
  );
};

export default Main;