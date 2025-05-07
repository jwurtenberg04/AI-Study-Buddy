import React, { useState, useEffect } from 'react';
import './HomePage.css';

export default function HomePage() {
  const [userName, setUserName] = useState("Alex");
  const [balance, setBalance] = useState(3250.75);
  const [insights, setInsights] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    setInsights([
      "Your grocery spending increased by 18% this month.",
      "You can save $200/month by cutting unused subscriptions.",
    ]);

    setTransactions([
      { date: "2025-05-05", description: "Starbucks", amount: -5.45 },
      { date: "2025-05-04", description: "Netflix", amount: -15.99 },
      { date: "2025-05-03", description: "Paycheck", amount: 1500.00 },
    ]);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome back, {userName} 👋</h1>
        <p>Your current balance is <strong>${balance.toFixed(2)}</strong></p>
      </header>

      <section className="insights">
        <h2>AI Insights</h2>
        <ul>
          {insights.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </section>

      <section className="transactions">
        <h2>💸 Recent Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.date}</td>
                <td>{tx.description}</td>
                <td className={tx.amount < 0 ? 'negative' : 'positive'}>
                  ${tx.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
