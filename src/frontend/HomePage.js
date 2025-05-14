import React, { useState, useEffect } from 'react';
import './HomePage.css';
import axios from 'axios';

export default function HomePage() {
  const [userName, setUserName] = useState("Alex");
  const [suggestions, setSuggestions] = useState([]);
  const [recent, setRecent] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend= async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await axios.post('http://localhost:5000/ollama', {
      input: input  
      });
      console.log(res);
      const botMessage = { sender: 'bot', text: res.data };
      setMessages(prev => [...prev, botMessage]);
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
    
    //to retrieve the history 

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

      <div className="chat-container">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
              <b>{msg.sender === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
            </div>
          ))}
        </div>

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
      </div>


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
