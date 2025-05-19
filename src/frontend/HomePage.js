import React, { useState, useEffect } from 'react';
import './HomePage.css';
import axios from 'axios';

export default function HomePage() {
  const [userName, setUserName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recent, setRecent] = useState([]);
  const [response, setResponse] = useState('');
  const [input, setInput] = useState('');

  const handleSend= async () => {
    if (!input.trim()) return;


    try {
      const res = await axios.post('http://localhost:5000/ollama', {
      input: input  
      });
      const botMessage = { sender: 'bot', text: res.data };
      setResponse(botMessage);
    } catch (err) {
      console.error('Chatbot error:', err);
    }

    setInput('');
  };

  useEffect(() => {
    
    setSuggestions([
      "How to cook a chicken alfredo",
      "Music theory 101",
    ]);
    
  

    axios.get('http://localhost:5000/pastDiscussions')
      .then(response => setRecent(response.data))
      .catch(error => console.error('Error fetching items:', error));
    
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome back, {userName} 👋</h1>
      </header>

      <section className="topics">
        <h2>Topics you might like</h2>
        <ul>
          {suggestions.map((item, index) => (
            <li key={index}> {item}</li>
          ))}
        </ul>
      </section>


      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="chat-button">Send</button>
      </div>
      
      {response && response.text && (
      <div>
        <h2>Step by step:</h2>
        <p>{response.text}</p>
      </div>
      )}

      <section className="recent">
        <h2>Recent Discussions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Topic</th>
              <th>Link to chat</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((tx, index) => (
              <tr key={index}>
                <td>{tx.date}</td>
                <td>{tx.topic}</td>
                <td>{tx.link}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
