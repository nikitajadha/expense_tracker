import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    axios.get('https://expensebackend-seven.vercel.app/api/expenses')
      .then(response => setExpenses(response.data));

    axios.get('https://expensebackend-seven.vercel.app/api/summary')
      .then(response => setSummary(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { description, amount, category };

    axios.post('https://expensebackend-seven.vercel.app/api/expenses', newExpense)
      .then(() => {
        setDescription('');
        setAmount('');
        setCategory('');
        axios.get('https://expensebackend-seven.vercel.app/api/expenses')
          .then(response => setExpenses(response.data));
      });
  };

  return (
    <div className="container mt-5">
      <div className="row ">
        <div className="col-md-6 ">
          <div className="text-center mb-4">
            <h1 className="display-4 text-primary font-weight-bold">Expense Tracker</h1>
            <p className="mb-5">Track your daily expenses easily.</p>
          </div>

          <form onSubmit={handleSubmit} className="card p-4 shadow-lg border-0 bg-light rounded-3">
            <h3 className="mb-4 text-danger fs-2">Add New Expense</h3>
            <div className="form-group mb-3">
              <label className="font-weight-bold">Description</label>
              <input
                type="text"
                className="form-control rounded-3 shadow-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter expense description"
              />
            </div>
            <div className="form-group mb-3">
              <label className="font-weight-bold">Amount ($)</label>
              <input
                type="number"
                className="form-control rounded-3 shadow-sm"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-group mb-3">
              <label className="font-weight-bold">Category</label>
              <input
                type="text"
                className="form-control rounded-3 shadow-sm"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter expense category"
              />
            </div>
            <button type="submit" className="btn btn-success btn-block rounded-3 shadow-sm w-100">
              Add Expense
            </button>
          </form>
        </div>

       
        <div className="col-md-6 mt-3">
          <div className="text-center m-5">
            <button
              className="btn btn-info w-100 rounded-3 shadow-sm"
              onClick={() => setShowHistory(!showHistory)} 
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          </div>

          {showHistory && (
            <div className="history-section mt-5 p-4 mb-4 shadow-lg border-0 bg-light rounded-3">
              <h3 className="text-danger mb-3">Expense History</h3>
              <ul className="list-group">
                {expenses.map((expense, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3 rounded-3">
                    <div>
                      <strong>{expense.description}</strong> - ${expense.amount} ({expense.category})
                    </div>
                    <span className="badge bg-info text-dark rounded-pill">{new Date(expense.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="summary-section m-5 p-4 shadow-lg border-0 bg-light rounded-3">
            <h3 className="text-success mb-3">Summary by Category</h3>
            <ul className="list-group">
              {summary.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-3 rounded-3">
                  <strong>{item._id}</strong>: <span className="text-success">${item.total}</span>
                </li>
              ))}
            </ul>
          </div>
    </div>
  );
}

export default App;
