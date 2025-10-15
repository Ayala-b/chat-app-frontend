// src/App.js
import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import ChatScreen from './components/ChatScreen';
import NewClientScreen from './components/NewClientScreen';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [showNewClientScreen, setShowNewClientScreen] = useState(false); 

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowNewClientScreen(false); 
  };

  const handleShowNewClient = () => {
    setShowNewClientScreen(true);
  };

  const handleShowChat = () => {
    setShowNewClientScreen(false);
  };

  return (
    <div className="app-container">
      {isAuthenticated ? (
        showNewClientScreen ? (
          <NewClientScreen onBackToChat={handleShowChat} />
        ) : (
          <ChatScreen onAddNewClient={handleShowNewClient} /> 
        )
      ) : (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;