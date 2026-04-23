import { useState, useEffect } from 'react'
import * as api from '../services/api'

function Analysis() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await api.getExpenseSummary();
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const total = summary.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Expense Analysis</h2>
        <p className="text-gray-500">Understand your spending patterns by category.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Breakdown Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Category Breakdown</h3>
          
          {loading ? (
            <div className="py-10 text-center text-gray-400">Loading analysis...</div>
          ) : summary.length === 0 ? (
            <div className="py-10 text-center text-gray-400">No data available yet.</div>
          ) : (
            <div className="space-y-6">
              {summary.sort((a, b) => b.total - a.total).map((item, index) => {
                const percentage = total > 0 ? (item.total / total) * 100 : 0;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{item.category || 'Uncategorized'}</span>
                        <p className="text-lg font-black text-gray-900">₹{item.total.toLocaleString()}</p>
                      </div>
                      <span className="text-indigo-600 font-bold">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Insights Card */}
        <div className="space-y-6">
          <div className="bg-indigo-700 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Total Overview</h3>
              <p className="text-indigo-100 mb-4 opacity-80">Your total spending across all categories.</p>
              <p className="text-4xl font-black">₹{total.toLocaleString()}</p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Tip</h3>
            <p className="text-gray-600 leading-relaxed">
              Based on your data, your highest spending is in <span className="font-bold text-indigo-600">{summary.length > 0 ? summary.sort((a, b) => b.total - a.total)[0].category : '...'}</span>. 
              Try setting a budget for this category to save more next month!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
