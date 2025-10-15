// src/components/ChatScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { rtdb, auth, db } from '../firebase';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { doc, getDoc } from 'firebase/firestore';
import '../ui/ChatScreen.css'; 

import { FiSend, FiUserPlus, FiMessageSquare } from 'react-icons/fi';

const CHAT_ROOM_ID = 'general_chat'; // Defines the ID for the chat room

function ChatScreen({ onAddNewClient }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const messagesEndRef = useRef(null); // Ref for auto-scrolling to the latest message

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Subscribes to Firebase Authentication state changes
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        // Fetches user role (admin/user) from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setIsAdmin(userDocSnap.data().isAdmin === "admin"); // Checks if user is an admin
        } else {
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });

    // Subscribes to real-time messages from Firebase Realtime Database
    const messagesRef = ref(rtdb, `messages/${CHAT_ROOM_ID}`);
    const unsubscribeDB = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Transforms and sorts messages by timestamp
        const loadedMessages = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(loadedMessages);
      } else {
        setMessages([]);
      }
    });

    // Cleans up subscriptions on component unmount
    return () => {
      unsubscribeAuth();
      unsubscribeDB();
    };
  }, []); // Runs once on component mount

  useEffect(() => {
    scrollToBottom(); // Scrolls to bottom whenever messages array updates
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '' || !currentUser) return;

    const newMessage = {
      text: message,
      uid: currentUser.uid,
      displayName: currentUser.displayName || currentUser.email,
      timestamp: serverTimestamp(), // Uses Firebase server timestamp
    };

    try {
      // Pushes the new message to Realtime Database
      await push(ref(rtdb, `messages/${CHAT_ROOM_ID}`), newMessage);
      setMessage(''); // Clears the input field
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("Error sending message: " + error.message);
    }
  };

  const getSenderDisplay = (msg) => {
    return msg.displayName || 'Unknown User'; // Displays sender's name or 'Unknown User'
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="chat-header-left-section">
          <FiMessageSquare className="chat-title-icon" />
          <h1 className="chat-title">Chat Room</h1>
        </div>
        <div className="chat-header-right-section">
          {isAdmin && ( // Renders "Add Client" button only if user is admin
            <button onClick={onAddNewClient} className="add-new-client-button">
              <FiUserPlus style={{ marginRight: '8px', fontSize: '1.2em' }} />
              Add Client
            </button>
          )}
        </div>
      </header>

      <div className="messages-container">
        {messages.map((msg) => {
          const isOwnMessage = msg.uid === currentUser?.uid; // Checks if the message was sent by the current user
          
          return (
            <div
              key={msg.id}
              className={`message-bubble ${isOwnMessage ? 'own-message' : 'other-message'}`}
            >
              <strong className="message-sender">
                {isOwnMessage ? 'You' : getSenderDisplay(msg)}
              </strong>
              <p className="message-text">{msg.text}</p>
              <span className="message-timestamp">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '...'}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} /> {/* Element for scrolling to */}
      </div>

      <form onSubmit={handleSendMessage} className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={currentUser ? "Type a message..." : "Log in to send messages..."}
          className="message-input"
          disabled={!currentUser} // Disables input if no user is logged in
        />
        <button type="submit" className="send-button" disabled={!currentUser}>
          <FiSend className="send-icon" />
        </button>
      </form>
    </div>
  );
}

export default ChatScreen;