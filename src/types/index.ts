export interface Transaction {
    id: string;
    date: string;
    merchant: string;
    category: string;
    amount: number;
    isRecurring?: boolean;
}
  
export interface UserData {
    cashBalance: number;
    monthlyIncome: number;
    totalSpentThisMonth: number;
    budgetLimit: number;
    creditScore: number;
    savings: number;
    savingsGoal: number;
}
  
export interface SmartSuggestion {
    id: string;
    merchant: string;
    currentSpend: number;
    potentialSavings: number;
    alternativeName: string;
    alternativeLink: string;
    category: string;
}
  
export interface Quiz {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    points: number;
}
  
export interface FamilyMember {
    id: string;
    name: string;
    savings: number;
    level: number;
    streakDays: number;
    avatar: string;
}