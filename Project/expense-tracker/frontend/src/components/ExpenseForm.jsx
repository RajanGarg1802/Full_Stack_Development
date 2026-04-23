import { useState } from 'react';
import * as api from '../services/api';

export default function ExpenseForm({ onSuccess, onCancel }) {
  const [expense, setExpense] = useState({
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createExpense(expense);
      onSuccess();
    } catch (error) {
      console.error("Error saving expense:", error);
      alert("Failed to save expense. Make sure the backend is running!");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="bg-indigo-600 p-6 text-white">
          <h2 className="text-xl font-bold">Add New Expense</h2>
          <p className="text-indigo-100 text-sm">Track your spending by filling out the details below.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input
              type="number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={expense.amount}
              onChange={(e) => setExpense({ ...expense, amount: parseFloat(e.target.value) })}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={expense.category}
              onChange={(e) => setExpense({ ...expense, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Education">Education</option>
              <option value="Rent">Rent</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
              rows={3}
              value={expense.description}
              onChange={(e) => setExpense({ ...expense, description: e.target.value })}
              placeholder="What was this for?"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition"
            >
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
