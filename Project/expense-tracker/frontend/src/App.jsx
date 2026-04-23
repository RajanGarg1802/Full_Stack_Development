import { useState, useEffect } from 'react'
import * as api from './services/api'
import ExpenseForm from './components/ExpenseForm'
import Analysis from './components/Analysis'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'analysis'

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.getExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuccess = () => {
    setShowForm(false);
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await api.deleteExpense(id);
        fetchExpenses();
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-indigo-700 text-white shadow-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="bg-white p-1.5 rounded-lg text-indigo-700 font-bold">
              ₹
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">FinTrack</h1>
          </div>
          <div className="hidden md:flex space-x-8 font-medium">
            <button 
              onClick={() => setView('dashboard')}
              className={`pb-1 transition-all ${view === 'dashboard' ? 'border-b-2 border-white' : 'text-indigo-100 hover:text-white'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setView('analysis')}
              className={`pb-1 transition-all ${view === 'analysis' ? 'border-b-2 border-white' : 'text-indigo-100 hover:text-white'}`}
            >
              Analysis
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        {view === 'dashboard' ? (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-500">Track your personal expenses easily.</p>
              </div>
              <button 
                onClick={() => setShowForm(true)}
                className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                Add Expense
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Spent</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Transactions</h3>
                <p className="text-3xl font-bold text-gray-900 mt-1">{expenses.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-wider">
                      <th className="px-8 py-4">Description</th>
                      <th className="px-8 py-4">Category</th>
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4 text-right">Amount</th>
                      <th className="px-8 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">Loading...</td>
                      </tr>
                    ) : expenses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-gray-400">No transactions found. Add some!</td>
                      </tr>
                    ) : (
                      expenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-indigo-50/30 transition">
                          <td className="px-8 py-5">
                            <p className="font-bold text-gray-800">{expense.description || 'No description'}</p>
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-sm text-gray-500">
                            {expense.date}
                          </td>
                          <td className="px-8 py-5 text-right font-black text-gray-900">
                            ₹{expense.amount.toLocaleString()}
                          </td>
                          <td className="px-8 py-5 text-center">
                            <button 
                              onClick={() => handleDelete(expense.id)}
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <Analysis />
        )}
      </main>

      {showForm && (
        <ExpenseForm 
          onSuccess={handleAddSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default App
