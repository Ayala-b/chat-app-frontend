// src/components/AuthScreen.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import '../ui/AuthScreen.css';

function AuthScreen({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Controls if the form is for registration or login
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        // Registers a new user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Stores user details in Firestore
        await setDoc(doc(db, "users", uid), {
          email: email,
          isAdmin: "admin" // Sets user role (e.g., "admin" or "user")
        });

        alert('Registration successful! You are now logged in.');
      } else {
        // Logs in an existing user with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
        // Retrieves the Firebase ID Token for the current user
        const token = await auth.currentUser.getIdToken();
        console.log("🔥 ID Token:", token);

        alert('Login successful!');
      }
      onAuthSuccess(); // Callback function to execute on successful authentication
    } catch (err) {
      setError(err.message);
      console.error("Authentication error:", err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <p>
        {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
        <button
          type="button"
          className="toggle-button"
          onClick={() => setIsRegistering(!isRegistering)} // Toggles between login and registration mode
        >
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
}

export default AuthScreen;