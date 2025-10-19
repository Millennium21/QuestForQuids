import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockUserData } from '../utils/mockData';

const SavingsScreen = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [monthlySaving, setMonthlySaving] = useState('');

  const savingsPercentage = (userData.savings / userData.savingsGoal) * 100;
  const monthsToGoal = Math.ceil((userData.savingsGoal - userData.savings) / 200);

  const updateGoal = () => {
    if (newGoal && parseFloat(newGoal) > 0) {
      setUserData(prev => ({
        ...prev,
        savingsGoal: parseFloat(newGoal),
      }));
      setShowGoalModal(false);
      setNewGoal('');
    }
  };

  const calculateCompound = () => {
    if (!monthlySaving || parseFloat(monthlySaving) <= 0) return null;
    
    const monthly = parseFloat(monthlySaving);
    const rate = 0.04 / 12; // 4% annual rate
    const months = 12;
    
    // Future value of series: FV = PMT × [((1 + r)^n - 1) / r]
    const futureValue = monthly * (Math.pow(1 + rate, months) - 1) / rate;
    const totalDeposited = monthly * months;
    const interestEarned = futureValue - totalDeposited;
    
    return {
      futureValue: futureValue.toFixed(2),
      totalDeposited: totalDeposited.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
    };
  };

  const compoundResults = calculateCompound();

  const savingsTips = [
    {
      icon: 'piggy-bank',
      title: 'Automate Your Savings',
      description: 'Set up automatic transfers on payday. You won\'t miss what you don\'t see!',
    },
    {
      icon: 'chart-line-variant',
      title: 'Start Small, Think Big',
      description: 'Even £5/week adds up to £260/year. Small habits create big results.',
    },
    {
      icon: 'trophy',
      title: 'Emergency Fund First',
      description: 'Aim for 3-6 months of expenses. This protects you from unexpected costs.',
    },
    {
      icon: 'cash-multiple',
      title: 'Use High-Interest Accounts',
      description: 'Look for accounts with 4-5% interest rates to grow your money faster.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Savings Goal Card */}
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text
            style={styles.goalLabel}
            accessibilityLabel={`Savings Goal. You have saved ${userData.savings.toFixed(2)} which is ${savingsPercentage}% of ${userData.savingsGoal.toFixed(2)}.`}
            accessibilityRole="header"
          >
            Savings Goal</Text>
          <TouchableOpacity onPress={() => setShowGoalModal(true)}>
            <Icon name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.currentAmount}>£{userData.savings.toFixed(2)}</Text>
        <Text style={styles.goalAmount}>of £{userData.savingsGoal.toFixed(2)}</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${Math.min(savingsPercentage, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {savingsPercentage.toFixed(1)}% Complete
          </Text>
        </View>

        <View 
          style={styles.goalStats}
          accessibilityLabel={`To meet your salary goal in ${monthsToGoal} months, you will need to save £${((userData.savingsGoal - userData.savings) / monthsToGoal).toFixed(2)} per month.`}
          accessibilityRole="summary"
        >
          <View style={styles.statItem}>
            <Icon name="calendar" size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statValue}>{monthsToGoal} months</Text>
            <Text style={styles.statLabel}>to reach goal</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="trending-up" size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.statValue}>£{((userData.savingsGoal - userData.savings) / monthsToGoal).toFixed(2)}</Text>
            <Text style={styles.statLabel}>per month needed</Text>
          </View>
        </View>
      </View>

      {/* Compound Interest Calculator */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="calculator" size={24} color="#6C63FF" />
          <Text style={styles.sectionTitle}>Compound Interest Calculator</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          See how your money grows over time
        </Text>

        <View style={styles.calculatorCard}>
          <Text style={styles.calculatorLabel}>Monthly Savings Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>£</Text>
            <TextInput
              style={styles.input}
              placeholder="100"
              keyboardType="numeric"
              value={monthlySaving}
              onChangeText={setMonthlySaving}
            />
          </View>

          {compoundResults && (
            <View style={styles.resultsContainer}>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>After 1 Year:</Text>
                <Text style={styles.resultValue}>£{compoundResults.futureValue}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>You Deposit:</Text>
                <Text style={styles.resultSubvalue}>£{compoundResults.totalDeposited}</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Interest Earned:</Text>
                <Text style={styles.resultHighlight}>+£{compoundResults.interestEarned}</Text>
              </View>
              <View style={styles.infoBox}>
                <Icon name="information" size={16} color="#2196F3" />
                <Text style={styles.infoBoxText}>
                  Based on 4% annual interest rate
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Savings Tips */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="lightbulb-on" size={24} color="#FFD700" />
          <Text 
            style={styles.sectionTitle}
            accessibilityLabel="Saving Tips"
            accessibilityRole="header"
          >Savings Tips</Text>
        </View>

        {savingsTips.map((tip, index) => (
          <View 
            key={index}
            style={styles.tipCard}
            accessibilityLabel={`${tip.title}`}
            accessibilityRole="header"
          >
            <View style={styles.tipIcon}>
              <Icon name={tip.icon} size={28} color="#6C63FF" />
            </View>
            <View 
              style={styles.tipContent}
              accessibilityLabel={`${tip.description}`}
              accessibilityRole="text"
            >
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Milestone Card */}
      <View style={styles.milestoneCard}>
        <Icon name="star" size={32} color="#FFD700" />
        <View 
          style={styles.milestoneContent}
          accessibilityLabel={`Great Progress. You've saved £${userData.savings.toFixed(2)} so far. Keep going!`}
          accessibilityRole="text"
        >
          <Text style={styles.milestoneTitle}>Great Progress!</Text>
          <Text style={styles.milestoneText}>
            You've saved £{userData.savings.toFixed(2)} so far. Keep going!
          </Text>
        </View>
      </View>

      {/* Edit Goal Modal */}
      <Modal
        visible={showGoalModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowGoalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Savings Goal</Text>
              <TouchableOpacity onPress={() => setShowGoalModal(false)}>
                <Icon name="close" size={24} color="#2C3E50" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>New Goal Amount</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>£</Text>
              <TextInput
                style={styles.input}
                placeholder={userData.savingsGoal.toString()}
                keyboardType="numeric"
                value={newGoal}
                onChangeText={setNewGoal}
                autoFocus
              />
            </View>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={updateGoal}
            >
              <Text style={styles.updateButtonText}>Update Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  goalCard: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
  },
  currentAmount: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
  },
  goalAmount: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
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
    marginBottom: 16,
  },
  calculatorCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  calculatorLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6C63FF',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
  },
  currencySymbol: {
    fontSize: 20,
    color: '#2C3E50',
    fontWeight: 'bold',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#2C3E50',
    paddingVertical: 12,
  },
  resultsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  resultSubvalue: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  resultHighlight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  infoBoxText: {
    fontSize: 12,
    color: '#2196F3',
    marginLeft: 8,
  },
  tipCard: {
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
  tipIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  milestoneCard: {
    backgroundColor: '#FFF9E6',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneContent: {
    flex: 1,
    marginLeft: 16,
  },
  milestoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12',
    marginBottom: 4,
  },
  milestoneText: {
    fontSize: 14,
    color: '#F39C12',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  modalLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SavingsScreen;