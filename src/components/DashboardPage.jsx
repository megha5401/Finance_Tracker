import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserTransactions, getUserBudget, saveUserBudget, addTransaction, updateTransaction, deleteTransaction } from '../services/firebaseService';
import { generateBudgetingTips, getSpendingInsights } from '../services/aiService';
import SpendingChart from './SpendingChart';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import Budget from './Budget';

const DashboardPage = () => {
  const { currentUser, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [totalBudget, setTotalBudget] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [budgetingTips, setBudgetingTips] = useState([]);
  const [insights, setInsights] = useState({});
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    loadUserData();
  }, [currentUser]);

  useEffect(() => {
    if (transactions.length > 0) {
      const tips = generateBudgetingTips(transactions, totalBudget);
      const spendingInsights = getSpendingInsights(transactions);
      setBudgetingTips(tips);
      setInsights(spendingInsights);
    }
  }, [transactions, totalBudget]);

  const loadUserData = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      const userTransactions = await getUserTransactions(currentUser.uid);
      const userBudget = await getUserBudget(currentUser.uid);
      
      setTransactions(userTransactions);
      if (userBudget > 0) {
        setTotalBudget(userBudget);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transaction) => {
    setActionError('');
    if (currentUser.isGuest) {
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
      };
      setTransactions(prev => [newTransaction, ...prev]);
      return;
    }
    try {
      const newTransaction = await addTransaction(currentUser.uid, transaction);
      setTransactions(prev => [newTransaction, ...prev]);
    } catch (error) {
      setActionError(error.message || 'Failed to add transaction.');
      console.error('Error adding transaction:', error);
    }
  };

  const handleUpdateTransaction = async (id, updates) => {
    setActionError('');
    if (currentUser.isGuest) {
      setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
      return;
    }
    try {
      await updateTransaction(id, updates);
      setTransactions(prev => 
        prev.map(t => t.id === id ? { ...t, ...updates } : t)
      );
    } catch (error) {
      setActionError(error.message || 'Failed to update transaction.');
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    setActionError('');
    if (currentUser.isGuest) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      return;
    }
    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      setActionError(error.message || 'Failed to delete transaction.');
      console.error('Error deleting transaction:', error);
    }
  };

  const handleBudgetUpdate = async (newBudget) => {
    setActionError('');
    if (currentUser.isGuest) {
      setTotalBudget(newBudget);
      return;
    }
    try {
      await saveUserBudget(currentUser.uid, newBudget);
      setTotalBudget(newBudget);
    } catch (error) {
      setActionError(error.message || 'Failed to update budget.');
      console.error('Error updating budget:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const calculateTotalSpent = () => {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const remainingBudget = totalBudget - calculateTotalSpent();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="header-title">
              Personal Finance Tracker
            </h1>
            <p className="header-subtitle">
              Welcome back, {currentUser?.displayName || 'User'}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary logout-btn"
          >
            Logout
          </button>
        </div>
      </header>
      {actionError && (
        <div className="error-message" style={{ margin: '1rem auto', maxWidth: 500 }}>
          {actionError}
        </div>
      )}

      <div className="dashboard-main">
        <div className="dashboard-grid">
          {/* Main Content */}
          <div className="dashboard-left">
            {/* Budget Overview */}
            <Budget 
              totalBudget={totalBudget} 
              remainingBudget={remainingBudget}
              onBudgetUpdate={handleBudgetUpdate}
            />

            {/* Spending Chart */}
            <div className="card">
              <SpendingChart transactions={transactions} />
            </div>

            {/* Transaction Form */}
            <div className="card">
              <TransactionForm onAddTransaction={handleAddTransaction} />
            </div>

            {/* Transaction List */}
            <div className="card">
              <TransactionList 
                transactions={transactions}
                onDelete={handleDeleteTransaction}
                onEdit={handleUpdateTransaction}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="dashboard-sidebar">
            {/* AI Budgeting Tips */}
            <div className="card">
              <h3 className="card-title">
                💡 AI Budgeting Tips
              </h3>
              <div className="tips-list">
                {budgetingTips.map((tip, index) => (
                  <div key={index} className="tip-item">
                    <p className="tip-text">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending Insights */}
            <div className="card">
              <h3 className="card-title">
                📊 Spending Insights
              </h3>
              <div className="insights-list">
                <div className="insight-item">
                  <span className="insight-label">Total Transactions:</span>
                  <span className="insight-value">{insights.totalTransactions}</span>
                </div>
                <div className="insight-item">
                  <span className="insight-label">Average Transaction:</span>
                  <span className="insight-value">₹{insights.averageTransaction}</span>
                </div>
                {insights.topCategory && (
                  <div className="insight-item">
                    <span className="insight-label">Top Category:</span>
                    <span className="insight-value">{insights.topCategory}</span>
                  </div>
                )}
                <div className="insight-item">
                  <span className="insight-label">Spending Trend:</span>
                  <span className={`insight-value ${
                    insights.spendingTrend === 'increasing' ? 'text-danger-600' :
                    insights.spendingTrend === 'decreasing' ? 'text-success-600' :
                    'text-gray-600'
                  }`}>
                    {insights.spendingTrend
                      ? insights.spendingTrend.charAt(0).toUpperCase() + insights.spendingTrend.slice(1)
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h3 className="card-title">
                📈 Quick Stats
              </h3>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="stat-label">Budget Used:</span>
                  <span className="stat-value">
                    {((calculateTotalSpent() / totalBudget) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="budget-progress">
                  <div 
                    className="budget-progress-bar"
                    style={{ width: `${Math.min((calculateTotalSpent() / totalBudget) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Remaining:</span>
                  <span className={`stat-value ${
                    remainingBudget < 0 ? 'text-danger-600' : 'text-success-600'
                  }`}>
                    ₹{remainingBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 