import React, { useState, useEffect } from 'react';
import './HomePage.css';

export default function HomePage() {
  const [userName, setUserName] = useState("Alex");
  const [balance, setBalance] = useState(3250.75);
  const [suggestions, setSuggestions] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {

    setSuggestions([
      "How to cook a chicken alfredo",
      "Music theory 101",
    ]);

    setRecent([
      { date: "2025-05-05", topic: "Basics of Cooking", link: "www.randompage.com" },
      { date: "2025-05-04", topic: "Piano for Beginner", link: "www.randompage.com" },
    ]);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome back, {userName} 👋</h1>
        <p>Your current balance is <strong>${balance.toFixed(2)}</strong></p>
      </header>

      <section className="topics">
        <h2>Topics you might like</h2>
        <ul>
          {suggestions.map((item, index) => (
            <li key={index}> {item}</li>
          ))}
        </ul>
      </section>

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
