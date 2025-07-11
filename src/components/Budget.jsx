import React, { useState } from 'react';

const Budget = ({ totalBudget, remainingBudget, onBudgetUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(totalBudget);

  const handleSaveBudget = () => {
    if (newBudget > 0) {
      onBudgetUpdate(parseInt(newBudget));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewBudget(totalBudget);
    setIsEditing(false);
  };

  const budgetUtilization = (totalBudget - remainingBudget) / totalBudget * 100;
  const isOverBudget = remainingBudget < 0;

  return (
    <div className="card">
      <div className="budget-header">
        <h2 className="section-title">Budget Overview</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="edit-budget-btn"
          >
            Edit Budget
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="budget-edit">
          <div className="form-group">
            <label htmlFor="newBudget" className="input-label">
              Monthly Budget
            </label>
            <input
              id="newBudget"
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="input-field"
              placeholder="Enter new budget amount"
            />
          </div>
          <div className="edit-actions">
            <button
              onClick={handleSaveBudget}
              className="btn-primary"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="budget-content">
          {/* Budget Progress */}
          <div className="budget-progress-section">
            <div className="budget-progress-header">
              <span>Budget Used</span>
              <span>{budgetUtilization.toFixed(1)}%</span>
            </div>
            <div className="budget-progress-bar-container">
              <div 
                className={`budget-progress-fill ${
                  isOverBudget 
                    ? 'budget-over' 
                    : budgetUtilization > 80 
                    ? 'budget-warning' 
                    : 'budget-good'
                }`}
                style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Budget Details */}
          <div className="budget-stats">
            <div className="budget-stat-item budget-total">
              <div className="budget-stat-value">₹{totalBudget.toLocaleString()}</div>
              <div className="budget-stat-label">Total Budget</div>
            </div>
            
            <div className="budget-stat-item budget-spent">
              <div className="budget-stat-value">
                ₹{(totalBudget - remainingBudget).toLocaleString()}
              </div>
              <div className="budget-stat-label">Total Spent</div>
            </div>
            
            <div className={`budget-stat-item ${isOverBudget ? 'budget-over-item' : 'budget-remaining'}`}>
              <div className="budget-stat-value">
                ₹{Math.abs(remainingBudget).toLocaleString()}
              </div>
              <div className="budget-stat-label">
                {isOverBudget ? 'Over Budget' : 'Remaining'}
              </div>
            </div>
          </div>

          {/* Budget Status */}
          {isOverBudget && (
            <div className="budget-alert budget-alert-danger">
              ⚠️ You have exceeded your monthly budget by ₹{Math.abs(remainingBudget).toLocaleString()}
            </div>
          )}
          
          {budgetUtilization > 80 && !isOverBudget && (
            <div className="budget-alert budget-alert-warning">
              ⚠️ You've used {budgetUtilization.toFixed(1)}% of your budget. Plan your remaining expenses carefully.
            </div>
          )}
          
          {budgetUtilization < 50 && (
            <div className="budget-alert budget-alert-success">
              ✅ Great job! You're well under budget. Consider increasing your savings.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Budget; 