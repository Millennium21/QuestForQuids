import { Transaction, UserData, SmartSuggestion, Quiz, FamilyMember } from '../types';

// USER PROFILE DATA
export const mockUserData: UserData = {
  cashBalance: 1847.50,
  monthlyIncome: 2500,
  totalSpentThisMonth: 1240.80,
  budgetLimit: 2000,
  creditScore: 678,
  savings: 850.00,
  savingsGoal: 5000,
};

// FAMILY LEADERBOARD
export const mockFamilyLeaderboard: FamilyMember[] = [
  {
    id: 'member-2',
    name: 'Dad',
    savings: 3250.00,
    level: 4,
    streakDays: 45,
    avatar: 'account',
  },
  {
    id: 'member-3',
    name: 'Mum',
    savings: 2100.00,
    level: 3,
    streakDays: 32,
    avatar: 'account',
  },
  {
    id: 'current-user',
    name: 'You',
    savings: 850.00,
    level: 2,
    streakDays: 12,
    avatar: 'account',
  },
  {
    id: 'member-4',
    name: 'Sister',
    savings: 675.00,
    level: 2,
    streakDays: 8,
    avatar: 'account',
  },
  {
    id: 'member-5',
    name: 'Brother',
    savings: 420.00,
    level: 1,
    streakDays: 5,
    avatar: 'account',
  },
];

// RECENT TRANSACTIONS (sorted by date, newest first)
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-10-18',
    merchant: 'Sainsburys',
    category: 'Groceries',
    amount: 52.30,
  },
  {
    id: '2',
    date: '2025-10-17',
    merchant: 'Shell Petrol',
    category: 'Transport',
    amount: 65.00,
  },
  {
    id: '3',
    date: '2025-10-17',
    merchant: 'Tesco Express',
    category: 'Groceries',
    amount: 45.60,
    isRecurring: true,
  },
  {
    id: '4',
    date: '2025-10-16',
    merchant: 'Netflix',
    category: 'Entertainment',
    amount: 15.99,
    isRecurring: true,
  },
  {
    id: '5',
    date: '2025-10-16',
    merchant: 'Pret A Manger',
    category: 'Food & Drink',
    amount: 12.85,
  },
  {
    id: '6',
    date: '2025-10-15',
    merchant: 'Amazon',
    category: 'Shopping',
    amount: 89.99,
  },
  {
    id: '7',
    date: '2025-10-15',
    merchant: 'Gym Membership',
    category: 'Health',
    amount: 39.99,
    isRecurring: true,
  },
  {
    id: '8',
    date: '2025-10-14',
    merchant: 'Starbucks',
    category: 'Food & Drink',
    amount: 8.50,
  },
  {
    id: '9',
    date: '2025-10-14',
    merchant: 'Uber',
    category: 'Transport',
    amount: 12.40,
  },
  {
    id: '10',
    date: '2025-10-13',
    merchant: 'Spotify',
    category: 'Entertainment',
    amount: 10.99,
    isRecurring: true,
  },
  {
    id: '11',
    date: '2025-10-13',
    merchant: 'Primark',
    category: 'Shopping',
    amount: 45.00,
  },
  {
    id: '12',
    date: '2025-10-12',
    merchant: 'Sainsburys',
    category: 'Groceries',
    amount: 67.80,
  },
  {
    id: '13',
    date: '2025-10-12',
    merchant: 'Costa Coffee',
    category: 'Food & Drink',
    amount: 6.20,
  },
  {
    id: '14',
    date: '2025-10-11',
    merchant: 'Deliveroo',
    category: 'Food & Drink',
    amount: 28.50,
  },
  {
    id: '15',
    date: '2025-10-11',
    merchant: 'Boots',
    category: 'Shopping',
    amount: 23.45,
  },
  {
    id: '16',
    date: '2025-10-10',
    merchant: 'Vue Cinema',
    category: 'Entertainment',
    amount: 15.00,
  },
  {
    id: '17',
    date: '2025-10-10',
    merchant: 'Tesco',
    category: 'Groceries',
    amount: 98.20,
  },
  {
    id: '18',
    date: '2025-10-09',
    merchant: 'British Gas',
    category: 'Bills',
    amount: 125.00,
    isRecurring: true,
  },
  {
    id: '19',
    date: '2025-10-08',
    merchant: 'McDonald\'s',
    category: 'Food & Drink',
    amount: 9.85,
  },
  {
    id: '20',
    date: '2025-10-07',
    merchant: 'Waterstones',
    category: 'Shopping',
    amount: 18.99,
  },
];

// SMART SAVINGS SUGGESTIONS
export const mockSuggestions: SmartSuggestion[] = [
  {
    id: '1',
    merchant: 'Netflix',
    currentSpend: 15.99,
    potentialSavings: 4.00,
    alternativeName: 'Disney+ (£7.99/mo)',
    alternativeLink: 'https://www.disneyplus.com',
    category: 'Entertainment',
  },
  {
    id: '2',
    merchant: 'Starbucks',
    currentSpend: 8.50,
    potentialSavings: 5.50,
    alternativeName: 'Costa Coffee (£3.00 avg)',
    alternativeLink: 'https://www.costa.co.uk',
    category: 'Food & Drink',
  },
  {
    id: '3',
    merchant: 'Uber',
    currentSpend: 12.40,
    potentialSavings: 6.40,
    alternativeName: 'Local Bus (£6.00)',
    alternativeLink: 'https://www.nationalrail.co.uk',
    category: 'Transport',
  },
  {
    id: '4',
    merchant: 'Gym Membership',
    currentSpend: 39.99,
    potentialSavings: 20.00,
    alternativeName: 'PureGym (£19.99/mo)',
    alternativeLink: 'https://www.puregym.com',
    category: 'Health',
  },
  {
    id: '5',
    merchant: 'Deliveroo',
    currentSpend: 28.50,
    potentialSavings: 18.50,
    alternativeName: 'Home Cooking (£10 avg)',
    alternativeLink: 'https://www.bbcgoodfood.com/recipes',
    category: 'Food & Drink',
  },
];

// FINANCIAL LITERACY QUIZZES
export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    question: 'What percentage of your credit limit should you use to maintain a good credit score?',
    options: ['Below 30%', 'Below 50%', 'Below 70%', 'It doesn\'t matter'],
    correctAnswer: 0,
    explanation: 'Using less than 30% of your available credit (credit utilization) helps maintain a healthy credit score. Lenders see this as responsible credit management.',
    points: 10,
  },
  {
    id: '2',
    question: 'What happens if you only pay the minimum on your credit card?',
    options: [
      'You save money',
      'You pay more interest over time',
      'Your credit score improves',
      'Nothing changes',
    ],
    correctAnswer: 1,
    explanation: 'Paying only the minimum means you carry a balance longer and accumulate more interest charges. A £1000 balance at 18% APR could cost you £300+ in interest if you only pay minimums.',
    points: 10,
  },
  {
    id: '3',
    question: 'What is the "50/30/20" budgeting rule?',
    options: [
      '50% savings, 30% wants, 20% needs',
      '50% needs, 30% wants, 20% savings',
      '50% wants, 30% savings, 20% needs',
      '50% debt, 30% food, 20% fun',
    ],
    correctAnswer: 1,
    explanation: 'The 50/30/20 rule suggests: 50% of income for needs (rent, bills), 30% for wants (entertainment, dining), and 20% for savings and debt repayment.',
    points: 10,
  },
  {
    id: '4',
    question: 'How long do missed payments stay on your credit report in the UK?',
    options: ['6 months', '1 year', '3 years', '6 years'],
    correctAnswer: 3,
    explanation: 'Missed payments remain on your UK credit report for 6 years from the date of the missed payment, which can significantly impact your ability to get credit.',
    points: 15,
  },
  {
    id: '5',
    question: 'What is compound interest?',
    options: [
      'Interest paid once a year',
      'Interest calculated on initial amount only',
      'Interest calculated on principal and accumulated interest',
      'A type of savings account',
    ],
    correctAnswer: 2,
    explanation: 'Compound interest means you earn interest on both your initial deposit and the interest you\'ve already earned. This is why starting to save early is so powerful - your money grows exponentially over time.',
    points: 10,
  },
  {
    id: '6',
    question: 'What is an emergency fund?',
    options: [
      'Money for holidays',
      'Savings for unexpected expenses',
      'Investment account',
      'Credit card backup',
    ],
    correctAnswer: 1,
    explanation: 'An emergency fund is savings set aside for unexpected expenses like job loss, medical bills, or urgent repairs. Financial experts recommend 3-6 months of living expenses.',
    points: 10,
  },
  {
    id: '7',
    question: 'What does APR stand for?',
    options: [
      'Annual Percentage Rate',
      'Average Payment Return',
      'Automated Payment Ratio',
      'Annual Price Reduction',
    ],
    correctAnswer: 0,
    explanation: 'APR stands for Annual Percentage Rate. It represents the yearly cost of borrowing money, including interest and fees. Always compare APRs when choosing loans or credit cards.',
    points: 10,
  },
  {
    id: '8',
    question: 'What is the best way to improve your credit score quickly?',
    options: [
      'Close old credit cards',
      'Apply for multiple credit cards',
      'Pay bills on time and reduce credit utilization',
      'Check your credit report frequently',
    ],
    correctAnswer: 2,
    explanation: 'The fastest ways to improve your credit score are paying all bills on time and keeping credit utilization below 30%. Closing old cards or applying for many new ones can actually hurt your score.',
    points: 15,
  },
];

// SPENDING BY CATEGORY (for charts/analytics - optional)
export const spendingByCategory = [
  { category: 'Groceries', amount: 263.90, color: '#4CAF50', icon: 'cart' },
  { category: 'Food & Drink', amount: 66.90, color: '#FF9800', icon: 'coffee' },
  { category: 'Entertainment', amount: 41.98, color: '#E91E63', icon: 'netflix' },
  { category: 'Transport', amount: 77.40, color: '#2196F3', icon: 'car' },
  { category: 'Shopping', amount: 177.43, color: '#9C27B0', icon: 'shopping' },
  { category: 'Bills', amount: 125.00, color: '#F44336', icon: 'file-document' },
  { category: 'Health', amount: 39.99, color: '#00BCD4', icon: 'heart' },
];

// MONTHLY SPENDING TREND (for charts - optional)
export const monthlySpendingTrend = [
  { month: 'Apr', amount: 1850 },
  { month: 'May', amount: 1920 },
  { month: 'Jun', amount: 1780 },
  { month: 'Jul', amount: 2100 },
  { month: 'Aug', amount: 1950 },
  { month: 'Sep', amount: 1880 },
  { month: 'Oct', amount: 1240 },
];

// SAVINGS MILESTONES
export const savingsMilestones = [
  { amount: 100, label: 'First £100!', achieved: true, icon: 'trophy' },
  { amount: 500, label: 'Half way there', achieved: true, icon: 'star' },
  { amount: 1000, label: '£1K Milestone', achieved: false, icon: 'flag' },
  { amount: 2500, label: 'Halfway to goal', achieved: false, icon: 'rocket' },
  { amount: 5000, label: 'Goal Reached!', achieved: false, icon: 'crown' },
];