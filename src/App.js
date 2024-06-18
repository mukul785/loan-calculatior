import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [rate, setRate] = useState('');
  const [entries, setEntries] = useState([{ date: '', amount: '' }]);
  const [results, setResults] = useState({ sum: '', interest: '', total: '' });

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { date: '', amount: '' }]);
  };

  const deleteEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const calculateMonthsDifference = (date) => {
    const currentDate = new Date();
    const entryDate = new Date(date);
    const yearsDifference = currentDate.getFullYear() - entryDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - entryDate.getMonth();
    return (yearsDifference * 12) + monthsDifference;
  };

  const calculateLoan = () => {
    let totalInterest = 0;
    let totalSum = 0;
    let totalAmount = 0;

    entries.forEach(entry => {
      const amount = parseFloat(entry.amount);
      const months = calculateMonthsDifference(entry.date);
      const interest = (amount * parseFloat(rate) * months / 100);

      totalSum += amount;
      totalInterest += interest;
    });
    totalAmount = totalSum + totalInterest;
    setResults({
      sum: totalSum.toFixed(2),
      interest: totalInterest.toFixed(2),
      total: totalAmount.toFixed(2)
    });
  };

  return (
    <div className="container">
      <h1>Interest Calculator</h1>
      <label>Enter Rate (rupees per saekda)
        <input
          name='rateInput'
          type="number"
          placeholder="Enter Rate (Rupees per Saekda)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="input"
        />
      </label>
      {entries.map((entry, index) => (
        <div key={index} className="entry">
          <div className="entry-top">
            <p>Entry {index+1}</p>
            <button onClick={() => deleteEntry(index)} className="delete-button">Delete</button>
          </div>
          <p className='date-heading'>Enter date</p>
          <input
            type="date"
            value={entry.date}
            placeholder="date"
            onChange={(e) => handleInputChange(index, 'date', e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Enter Amount"
            name='amountInput'
            value={entry.amount}
            onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
            className="input"
          />
        </div>
      ))}
      <button onClick={addEntry} className="button">Add Another Entry</button>
      <button onClick={calculateLoan} className="button">Calculate Loan</button>
      {results.sum && (
        <div className="results">
          <p>Sum: {results.sum}</p>
          <p>Total Interest: {results.interest}</p>
          <p>Total Amount: {results.total}</p>
        </div>
      )}
    </div>
  );
};

export default App;
