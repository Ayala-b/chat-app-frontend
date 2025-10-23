// src/components/NewClientScreen.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import '../ui/NewClientScreen.css';

function NewClientScreen({ onBackToChat }) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("No authenticated user found. Please log in.");

      const userUid = currentUser.uid;
      // Determines if Firebase Emulators are in use
      const useEmulators = import.meta.env.VITE_APP_USE_EMULATORS === 'true';
      // Gets ID Token for authentication with backend, or a mock token for emulators
      const idToken = useEmulators
        ? `mock-token-${userUid}`
        : await currentUser.getIdToken(true);

      // Selects API URL based on emulator usage
      // Selects API URL based on emulator usage
     // src/components/NewClientScreen.jsx
// src/components/NewClientScreen.jsx
const apiUrl = useEmulators
  ? 'http://localhost:5001/ayala-testings/us-central1/api/clients' 
  : 'https://us-central1-ayala-testings.cloudfunctions.net/api/clients'; 

      // Sends client data to the backend API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`, // Sends authentication token
        },
        body: JSON.stringify({ name: clientName, phone: clientPhone, email: clientEmail }),
      });

      const data = await response.json(); 
      
      if (!response.ok) {
        // Throws an error if the API response is not successful
        throw new Error(data.error || 'Failed to add client.');
      }

      setSuccess(true); // Sets success state and clears form fields
      setClientName('');
      setClientPhone('');
      setClientEmail('');
      alert('Client added successfully!');
    } catch (err) {
      setError(err.message); // Catches and displays any errors during the process
    } finally {
      setLoading(false); // Resets loading state
    }
  };

  return (
    <div className="new-client-screen">
      <h2>Add New Client</h2>
      <form className="client-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Client'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Client added successfully!</p>}
      </form>
      <button onClick={onBackToChat} className="back-button">
         Back to Chat→
      </button>
    </div>
  );
}

export default NewClientScreen;