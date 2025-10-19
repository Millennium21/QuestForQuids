import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockUserData, mockTransactions, mockSuggestions } from '../utils/mockData';

const HomeScreen = ({ navigation }: any) => {
  const [userData] = useState(mockUserData);
  const [transactions] = useState(mockTransactions);
  const [suggestions] = useState(mockSuggestions);

  const extraSpending = userData.totalSpentThisMonth - userData.budgetLimit;
  const isOverBudget = extraSpending > 0;

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Groceries': 'cart',
      'Entertainment': 'netflix',
      'Shopping': 'shopping',
      'Food & Drink': 'coffee',
      'Transport': 'car',
    };
    return icons[category] || 'cash';
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cash Balance Card */}
      <View
        style={styles.balanceCard}
        accessibilityLabel={`Available balance is £${userData.cashBalance.toFixed(2)}. Monthly income is £${userData.monthlyIncome}. Budget left is £${(userData.budgetLimit - userData.totalSpentThisMonth).toFixed(2)}`}
        accessibilityRole="summary"
      >
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>£{userData.cashBalance.toFixed(2)}</Text>
        <View style={styles.balanceDetails}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceDetailLabel}>Monthly Income</Text>
            <Text style={styles.balanceDetailValue}>£{userData.monthlyIncome}</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceDetailLabel}>Budget Left</Text>
            <Text style={[
              styles.balanceDetailValue,
              isOverBudget && styles.warningText
            ]}>
              £{(userData.budgetLimit - userData.totalSpentThisMonth).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* AI QuidSaver Promo Card */}
      <TouchableOpacity
        style={styles.aiPromoCard}
        onPress={() => navigation.navigate('QuidSaver')}
        activeOpacity={0.8}
        accessibilityLabel="Open QuidSaver savings assistant"
        accessibilityRole="button"
      >
        <View style={styles.aiPromoContent}>
          <View style={styles.aiPromoIcon}>
            <Icon name="robot" size={40} color="#6C63FF" />
          </View>
          <View style={styles.aiPromoText}>
            <Text style={styles.aiPromoTitle}>🤖 Try AI QuidSaver</Text>
            <Text style={styles.aiPromoSubtitle}>
              Get AI-powered suggestions for cheaper alternatives on every purchase
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color="#6C63FF" />
        </View>
      </TouchableOpacity>

      {/* Extra Spending Warning */}
      {isOverBudget && (
        <View style={styles.warningCard}>
          <Icon name="alert-circle" size={24} color="#FF6B6B" />
          <View 
            style={styles.warningContent}
            accessibilityLabel={`You've spent £${extraSpending.toFixed(2)} more than your budget this month.`}
          >
            <Text style={styles.warningTitle}>Budget Alert!</Text>
            <Text style={styles.warningText}>
              You've spent £{extraSpending.toFixed(2)} more than your budget this month.
            </Text>
          </View>
        </View>
      )}

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="lightbulb-on" size={24} color="#FFD700" />
            <Text 
              style={styles.sectionTitle}
              accessibilityLabel="Smart Savings - We found cheaper alternatives for your regular spending"
              accessibilityRole="header"
            >
              Smart Savings
            </Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            We found cheaper alternatives for your regular spending
          </Text>
          
          {suggestions.map((suggestion) => (
            <View 
              key={suggestion.id} 
              style={styles.suggestionCard}
              accessibilityLabel={`One cheaper alternative is ${suggestion.merchant}, which will cost you ${suggestion.currentSpend.toFixed(2)} and this will save you ${suggestion.potentialSavings.toFixed(2)}.`}
              accessibilityRole="summary"
            >
              <View style={styles.suggestionHeader}>
                <Text style={styles.suggestionMerchant}>{suggestion.merchant}</Text>
                <Text style={styles.suggestionCurrent}>
                  £{suggestion.currentSpend.toFixed(2)}
                </Text>
              </View>
              
              <View style={styles.savingsRow}>
                <Icon name="arrow-down-circle" size={20} color="#4CAF50" />
                <Text style={styles.savingsText}>
                  Save £{suggestion.potentialSavings.toFixed(2)}/month
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.alternativeButton}
                accessibilityLabel={`Link to suggested alternative, which is ${suggestion.alternativeName}`}
                accessible={true}
                onPress={() => openLink(suggestion.alternativeLink)}
              >
                <Text style={styles.alternativeText}>
                  Try: {suggestion.alternativeName}
                </Text>
                <Icon name="open-in-new" size={16} color="#6C63FF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Spending Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="chart-timeline-variant" size={24} color="#6C63FF" />
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        
        <View 
          style={styles.spendingSummary}
          accessibilityLabel={`You have spent ${userData.totalSpentThisMonth.toFixed(2)}.`}
          accessibilityRole="summary"
        >
          <Text style={styles.spendingLabel}>This Month</Text>
          <Text style={styles.spendingAmount}>
            £{userData.totalSpentThisMonth.toFixed(2)}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { 
                  width: `${Math.min((userData.totalSpentThisMonth / userData.budgetLimit) * 100, 100)}%`,
                  backgroundColor: isOverBudget ? '#FF6B6B' : '#4CAF50'
                }
              ]} 
            />
          </View>
          <Text style={styles.budgetText}>
            Budget: £{userData.budgetLimit}
          </Text>
        </View>

        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            style={styles.transactionCard}
            accessibilityLabel={`The category of your transaction is ${transaction.category} from ${transaction.merchant} and you spent ${transaction.amount.toFixed(2)}.`}
            accessibilityRole="summary"
          >
            <View style={styles.transactionIcon}>
              <Icon 
                name={getCategoryIcon(transaction.category)} 
                size={24} 
                color="#6C63FF" 
              />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
              <View style={styles.transactionMeta}>
                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                {transaction.isRecurring && (
                  <View style={styles.recurringBadge}>
                    <Icon name="repeat" size={12} color="#FF9800" />
                    <Text style={styles.recurringText}>Recurring</Text>
                  </View>
                )}
              </View>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>
              -£{transaction.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  balanceCard: {
    backgroundColor: '#6C63FF',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  balanceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    flex: 1,
  },
  balanceDetailLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  balanceDetailValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  aiPromoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E0DFFF',
  },
  aiPromoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  aiPromoIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  aiPromoText: {
    flex: 1,
  },
  aiPromoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  aiPromoSubtitle: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
  },
  warningCard: {
    backgroundColor: '#FFE5E5',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningContent: {
    flex: 1,
    marginLeft: 12,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
  },
  suggestionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  suggestionMerchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  suggestionCurrent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#95A5A6',
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  savingsText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 8,
  },
  alternativeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0EFFF',
    padding: 12,
    borderRadius: 8,
  },
  alternativeText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
  },
  spendingSummary: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  spendingLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  spendingAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8EAED',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  budgetText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  transactionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#7F8C8D',
    marginRight: 8,
  },
  recurringBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recurringText: {
    fontSize: 10,
    color: '#FF9800',
    marginLeft: 4,
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 12,
    color: '#95A5A6',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
});

export default HomeScreen;