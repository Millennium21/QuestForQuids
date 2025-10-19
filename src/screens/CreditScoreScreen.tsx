import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockUserData } from '../utils/mockData';

const CreditScoreScreen = () => {
  const [userData] = useState(mockUserData);
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const getCreditRating = (score: number) => {
    if (score >= 800) return { label: 'Excellent', color: '#4CAF50' };
    if (score >= 700) return { label: 'Good', color: '#8BC34A' };
    if (score >= 600) return { label: 'Fair', color: '#FFC107' };
    if (score >= 500) return { label: 'Poor', color: '#FF9800' };
    return { label: 'Very Poor', color: '#F44336' };
  };

  const rating = getCreditRating(userData.creditScore);
  const scorePercentage = (userData.creditScore / 850) * 100;

  const tips = [
    {
      id: '1',
      icon: 'credit-card-check',
      title: 'Pay bills on time',
      description: 'Payment history is 35% of your credit score. Set up automatic payments to never miss a due date.',
      impact: 'High Impact',
      impactColor: '#4CAF50',
    },
    {
      id: '2',
      icon: 'chart-line',
      title: 'Keep credit utilization low',
      description: 'Use less than 30% of your available credit. Currently using: £750 / £2000 (37.5%)',
      impact: 'High Impact',
      impactColor: '#4CAF50',
    },
    {
      id: '3',
      icon: 'clock-alert',
      title: 'Build credit history',
      description: 'The length of your credit history matters. Keep old accounts open even if you don\'t use them often.',
      impact: 'Medium Impact',
      impactColor: '#FF9800',
    },
    {
      id: '4',
      icon: 'file-document-multiple',
      title: 'Diversify credit types',
      description: 'Having a mix of credit cards, loans, and other credit types can improve your score.',
      impact: 'Low Impact',
      impactColor: '#2196F3',
    },
    {
      id: '5',
      icon: 'cancel',
      title: 'Avoid hard inquiries',
      description: 'Each credit application creates a hard inquiry. Too many in a short period can lower your score.',
      impact: 'Medium Impact',
      impactColor: '#FF9800',
    },
  ];

  const factors = [
    { label: 'Payment History', percentage: 35, value: 85, color: '#4CAF50' },
    { label: 'Credit Utilization', percentage: 30, value: 62, color: '#FFC107' },
    { label: 'Credit History Length', percentage: 15, value: 78, color: '#8BC34A' },
    { label: 'Credit Mix', percentage: 10, value: 70, color: '#2196F3' },
    { label: 'New Credit', percentage: 10, value: 90, color: '#4CAF50' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Credit Score Card */}
      <View 
        style={styles.scoreCard}
        accessibilityLabel={`Your Credit Score is ${userData.creditScore}.`}
        accessibilityRole="summary"
      >
        <Text style={styles.scoreLabel}>Your Credit Score</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>{userData.creditScore}</Text>
          <Text style={styles.scoreMax}>/ 850</Text>
        </View>
        <View style={[styles.ratingBadge, { backgroundColor: rating.color }]}>
          <Text style={styles.ratingText}>{rating.label}</Text>
        </View>

        <View style={styles.scoreBar}>
          <View style={styles.scoreBarTrack}>
            <View 
              style={[
                styles.scoreBarFill,
                { width: `${scorePercentage}%`, backgroundColor: rating.color }
              ]} 
            />
            <View 
              style={[
                styles.scoreIndicator,
                { left: `${scorePercentage}%`, backgroundColor: rating.color }
              ]} 
            />
          </View>
          <View style={styles.scoreRanges}>
            <Text style={styles.rangeText}>300</Text>
            <Text style={styles.rangeText}>500</Text>
            <Text style={styles.rangeText}>700</Text>
            <Text style={styles.rangeText}>850</Text>
          </View>
        </View>
      </View>

      {/* Credit Factors */}
      <View style={styles.section}>
        <View 
          style={styles.sectionHeader}
          accessibilityLabel="What Affects Your Score"
          accessibilityRole="header"
        >
          <Icon name="chart-pie" size={24} color="#6C63FF" />
          <Text style={styles.sectionTitle}>What Affects Your Score</Text>
        </View>

        {factors.map((factor, index) => (
          <View
            key={index}
            style={styles.factorCard}
            accessibilityLabel={`${factor.label} is worth ${factor.percentage} out of your Credit Score. You have achieved ${factor.value} of the maximum possible for this factor.`}
            accessibilityRole="text"
          >
            <View style={styles.factorHeader}>
              <Text style={styles.factorLabel}>{factor.label}</Text>
              <View style={styles.factorRight}>
                <Text style={styles.factorPercentage}>{factor.percentage}%</Text>
                <View style={[styles.factorScore, { backgroundColor: factor.color }]}>
                  <Text style={styles.factorScoreText}>{factor.value}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.factorBar}>
              <View 
                style={[
                  styles.factorBarFill,
                  { width: `${factor.value}%`, backgroundColor: factor.color }
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      {/* Improvement Tips */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="lightbulb-on" size={24} color="#FFD700" />
          <Text style={styles.sectionTitle}>How to Improve</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Follow these tips to boost your credit score
        </Text>

        {tips.map((tip) => (
          <TouchableOpacity
            key={tip.id}
            style={styles.tipCard}
            onPress={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
            accessible={true}
            accessibilityLabel="Select Credit Tip"
            accessibilityRole="text"
          >
            <View
              style={styles.tipHeader}
              accessibilityLabel={`${tip.title}`}
              accessibilityRole="text"
            >
              <View style={styles.tipIcon}>
                <Icon name={tip.icon} size={24} color="#6C63FF" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <View style={[styles.impactBadge, { backgroundColor: `${tip.impactColor}20` }]}>
                  <Text style={[styles.impactText, { color: tip.impactColor }]}>
                    {tip.impact}
                  </Text>
                </View>
              </View>
              <Icon 
                name={selectedTip === tip.id ? 'chevron-up' : 'chevron-down'} 
                size={24} 
                color="#95A5A6" 
              />
            </View>
            {selectedTip === tip.id && (
              <Text style={styles.tipDescription}>{tip.description}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Info Card */}
      <View 
        style={styles.infoCard}
        accessibilityLabel="Understanding Credit Scores"
        accessibilityRole="header"
      >
        <Icon name="information" size={24} color="#2196F3" />
        <View
          style={styles.infoContent}
          accessibilityLabel="Credit scores range from 300-850. Higher scores mean better loan terms and interest rates. Most lenders consider 700+ as good credit."
          accessibilityRole="text"
        >
          <Text style={styles.infoTitle}>Understanding Credit Scores</Text>
          <Text style={styles.infoText}>
            Credit scores range from 300-850. Higher scores mean better loan terms and interest rates. 
            Most lenders consider 700+ as good credit.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scoreCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  scoreCircle: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  scoreMax: {
    fontSize: 18,
    color: '#95A5A6',
    marginTop: -8,
  },
  ratingBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  ratingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreBar: {
    width: '100%',
  },
  scoreBarTrack: {
    height: 8,
    backgroundColor: '#E8EAED',
    borderRadius: 4,
    position: 'relative',
    marginBottom: 8,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreIndicator: {
    position: 'absolute',
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
  },
  scoreRanges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeText: {
    fontSize: 12,
    color: '#95A5A6',
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
  factorCard: {
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
  factorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  factorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  factorRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factorPercentage: {
    fontSize: 12,
    color: '#95A5A6',
    marginRight: 12,
  },
  factorScore: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  factorScoreText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  factorBar: {
    height: 6,
    backgroundColor: '#E8EAED',
    borderRadius: 3,
    overflow: 'hidden',
  },
  factorBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  tipCard: {
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
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
  },
  impactBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tipDescription: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
});

export default CreditScoreScreen;