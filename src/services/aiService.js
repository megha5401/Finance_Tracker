// AI-powered budgeting tips service
export const generateBudgetingTips = (transactions, totalBudget) => {
  const tips = [];
  
  if (!transactions || transactions.length === 0) {
    return [
      "Start tracking your expenses to get personalized budgeting tips!",
      "Set up a monthly budget to better manage your finances.",
      "Consider categorizing your expenses to identify spending patterns."
    ];
  }

  // Calculate spending by category
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const totalSpent = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
  const remainingBudget = totalBudget - totalSpent;

  // Budget utilization analysis
  const budgetUtilization = (totalSpent / totalBudget) * 100;
  
  if (budgetUtilization > 90) {
    tips.push("⚠️ You've used over 90% of your budget. Consider reviewing your spending habits.");
  } else if (budgetUtilization > 75) {
    tips.push("📊 You're at 75% of your budget. Plan your remaining expenses carefully.");
  } else if (budgetUtilization < 50) {
    tips.push("✅ Great job! You're well under budget. Consider increasing your savings.");
  }

  // Category-specific tips
  const categoryLimits = {
    'Groceries': { limit: 1000, tip: "Consider meal planning to reduce grocery costs." },
    'Fuel': { limit: 1500, tip: "Look into carpooling or public transport to save on fuel." },
    'Entertainment': { limit: 800, tip: "Find free or low-cost entertainment options." },
    'Dining': { limit: 600, tip: "Try cooking at home more often to save on dining out." },
    'Shopping': { limit: 1000, tip: "Wait 24 hours before making non-essential purchases." },
    'Subscriptions': { limit: 300, tip: "Review and cancel unused subscriptions." }
  };

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    const limit = categoryLimits[category]?.limit;
    if (limit && amount > limit) {
      tips.push(`💰 ${categoryLimits[category].tip}`);
    }
  });

  // Spending pattern analysis
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  const recentTotal = recentTransactions.reduce((sum, t) => sum + t.amount, 0);
  const averageDaily = recentTotal / 7;

  if (averageDaily > (totalBudget / 30)) {
    tips.push("📈 Your recent daily spending is above your monthly average. Consider cutting back.");
  }

  // Savings recommendations
  if (remainingBudget > 0) {
    const savingsPercentage = (remainingBudget / totalBudget) * 100;
    if (savingsPercentage > 20) {
      tips.push("🎯 Excellent! You have significant savings potential. Consider investing the surplus.");
    } else if (savingsPercentage > 10) {
      tips.push("💡 Good job! You're saving money. Consider building an emergency fund.");
    }
  }

  // Smart spending tips
  if (tips.length < 3) {
    tips.push("💡 Consider using the 50/30/20 rule: 50% needs, 30% wants, 20% savings.");
    tips.push("📱 Use cashback apps and credit card rewards to maximize your spending.");
    tips.push("📊 Review your spending weekly to stay on track with your financial goals.");
  }

  return tips.slice(0, 5); // Return top 5 tips
};

export const getSpendingInsights = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return {
      topCategory: null,
      averageTransaction: 0,
      totalTransactions: 0,
      spendingTrend: 'stable'
    };
  }

  // Calculate insights
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)[0]?.[0];

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction = totalAmount / transactions.length;

  // Determine spending trend
  const sortedTransactions = transactions
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const firstHalf = sortedTransactions.slice(0, Math.floor(transactions.length / 2));
  const secondHalf = sortedTransactions.slice(Math.floor(transactions.length / 2));
  
  const firstHalfTotal = firstHalf.reduce((sum, t) => sum + t.amount, 0);
  const secondHalfTotal = secondHalf.reduce((sum, t) => sum + t.amount, 0);
  
  let spendingTrend = 'stable';
  if (secondHalfTotal > firstHalfTotal * 1.2) {
    spendingTrend = 'increasing';
  } else if (secondHalfTotal < firstHalfTotal * 0.8) {
    spendingTrend = 'decreasing';
  }

  return {
    topCategory,
    averageTransaction: Math.round(averageTransaction),
    totalTransactions: transactions.length,
    spendingTrend
  };
}; 