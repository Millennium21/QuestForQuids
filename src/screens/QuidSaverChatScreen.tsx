import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const API_KEY = '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';

const QuidSaverChatScreen = () => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const categories = [
    'Coffee & Drinks',
    'Food & Dining',
    'Groceries',
    'Shopping',
    'Transport',
    'Entertainment',
    'Utilities',
    'Other',
  ];

  const getAISuggestions = async (
    item: string,
    amount: number,
    category: string
  ): Promise<string> => {
    const prompt = `You are a UK money-saving expert. A user just spent £${amount} on ${item} in the ${category} category. 

Provide 2-3 specific, actionable alternative options that are:
1. Cheaper or better value
2. Similar quality
3. Available in the UK
4. Realistic and practical

Format your response as a brief, friendly suggestion (2-3 sentences max) with specific store/brand names and estimated savings. Be conversational and helpful.

Example format: "Consider trying [Alternative 1] instead - you could save around £X. Another great option is [Alternative 2], which offers similar quality for about £Y less."`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful UK money-saving assistant. Keep responses brief, specific, and actionable.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));
      
      return data?.choices?.[0]?.message?.content || 'Unable to generate suggestion at this time.';
    } catch (error) {
      console.error('AI Error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return `💡 Pro tip: For ${category.toLowerCase()} purchases like this, check comparison sites like MoneySavingExpert.com or use cashback apps like TopCashback to find better deals. Consider buying in bulk or looking for loyalty programs to save money over time.`;
    }
  };

  const handleGetSuggestions = async () => {
    if (!item || !amount || !category) {
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    setLoading(true);
    setSuggestion(null);

    const aiSuggestion = await getAISuggestions(item, parsedAmount, category);
    
    setSuggestion(aiSuggestion);
    setLoading(false);
  };

  const handleReset = () => {
    setItem('');
    setAmount('');
    setCategory('');
    setSuggestion(null);
  };

  const estimatedSavings = amount ? (parseFloat(amount) * 0.15).toFixed(2) : '0.00';

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View 
        style={styles.header}
        accessibilityLabel="AI QuidSaver"
        accessibilityRole="header"
      >
        <View style={styles.headerContent}>
          <Icon name="robot" size={40} color="#6C63FF" />
          <View 
            style={styles.headerText}
            accessibilityLabel="Find Cheaper alternatives with AI to save you money"
            accessibilityRole="text"
          >
            <Text style={styles.headerTitle}>AI QuidSaver</Text>
            <Text style={styles.headerSubtitle}>
              Find cheaper alternatives with AI to save you money
            </Text>
          </View>
        </View>
      </View>

      {/* Main Form Card */}
      <View
        style={styles.formCard}
        accessibilityLabel="Get Smart Suggestions"
        accessibilityRole="text"
      >
        <Text style={styles.formTitle}>Get Smart Suggestions</Text>

        <View
          style={styles.inputGroup}
          accessibilityLabel="Item/Product"
          accessibilityRole="text"
        >
          <Text style={styles.inputLabel}>Item/Product</Text>
          <TextInput
            accessible={true}
            accessibilityLabel="Type in the item you want to find a cheaper alternative"
            style={styles.input}
            placeholder="e.g., Coffee, Laptop, Groceries"
            value={item}
            onChangeText={setItem}
          />
        </View>

        <View 
          style={styles.inputGroup}
          accessibilityLabel="Amount"
          accessibilityRole="text"
        >
          <Text style={styles.inputLabel}>Amount (£)</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currencySymbol}>£</Text>
            <TextInput
              accessible={true}
              accessibilityLabel="What is the value of your item?"
              style={styles.amountTextInput}
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        <View 
          style={styles.inputGroup}
          accessibilityLabel="Category"
          accessibilityRole="header"
        >
          <Text style={styles.inputLabel}>Category</Text>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Open the available categories of the item"
            style={styles.categorySelector}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={[styles.categoryText, !category && styles.placeholder]}>
              {category || 'Select category'}
            </Text>
            <Icon name="chevron-down" size={24} color="#95A5A6" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          accessibilityLabel="Click to generate cheaper alternatives"
          style={[
            styles.addButton,
            (!item || !amount || !category || loading) && styles.addButtonDisabled,
          ]}
          onPress={handleGetSuggestions}
          disabled={!item || !amount || !category || loading}
        >
          {loading ? (
            <>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.addButtonText}>Analyzing...</Text>
            </>
          ) : (
            <>
              <Icon name="robot" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Get AI Suggestions</Text>
            </>
          )}
        </TouchableOpacity>

        {/* AI Suggestion Result */}
        {suggestion && (
          <View
            style={styles.suggestionContainer}
            accessibilityLabel={`The AI QuidSaver Suggestion is ${suggestion}`}
            accessibilityRole="summary"
          >
            <View style={styles.suggestionHeader}>
              <Icon name="lightbulb-on" size={24} color="#00ACC1" />
              <Text style={styles.suggestionTitle}>AI QuidSaver Suggestion</Text>
            </View>
            
            <View style={styles.purchaseInfo}>
              <Text style={styles.purchaseLabel}>Your Purchase:</Text>
              <Text style={styles.purchaseValue}>
                {item} - £{parseFloat(amount).toFixed(2)}
              </Text>
            </View>

            <Text style={styles.suggestionText}>{suggestion}</Text>

            <View
              style={styles.savingsBadge}
              accessibilityLabel={`Your potential savings are £${estimatedSavings}`}
              accessibilityRole="text"
            >
              <Icon name="cash-multiple" size={16} color="#4CAF50" />
              <Text style={styles.savingsBadgeText}>
                Potential Savings: ~£{estimatedSavings}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
              accessible={true}
              accessibilityLabel="Check Another Purchas"
              accessibilityRole="checkbox"
            >
              <Icon name="refresh" size={18} color="#6C63FF" />
              <Text style={styles.resetButtonText}>Check Another Purchase</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Info Card */}
      <View
        style={styles.infoCard}
        accessibilityLabel="How it works"
        accessibilityRole="header"
      >
        <Icon name="information" size={24} color="#2196F3" />
        <View
          style={styles.infoContent}
          accessibilityLabel="Our AI analyzes your purchase and suggests cheaper alternatives with similar quality available in the UK. Save money without compromising on what you love!"
          accessibilityRole="text"
        >
          <Text style={styles.infoTitle}>How It Works</Text>
          <Text style={styles.infoText}>
            Our AI analyzes your purchase and suggests cheaper alternatives with similar quality available in the UK. Save money without compromising on what you love!
          </Text>
        </View>
      </View>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={styles.modalHeader}
              accessibilityLabel="Select Category"
              accessibilityRole="text"
            >
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Icon name="close" size={24} color="#2C3E50" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {categories.map((categoryOption) => (
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Choose Category"
                  accessibilityRole="checkbox"
                  key={categoryOption}
                  style={[
                    styles.categoryOption,
                    category === categoryOption && styles.categoryOptionSelected,
                  ]}
                  onPress={() => {
                    setCategory(categoryOption);
                    setShowCategoryModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      category === categoryOption && styles.categoryOptionTextSelected,
                    ]}
                  >
                    {categoryOption}
                  </Text>
                  {category === categoryOption && (
                    <Icon name="check" size={20} color="#6C63FF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
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
  header: {
    backgroundColor: '#6C63FF',
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  formCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E8EAED',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#2C3E50',
    backgroundColor: '#F8F9FA',
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8EAED',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginRight: 8,
  },
  amountTextInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#2C3E50',
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#E8EAED',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#F8F9FA',
  },
  categoryText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  placeholder: {
    color: '#95A5A6',
  },
  addButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  suggestionContainer: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#E0F7FA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00ACC1',
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00838F',
    marginLeft: 8,
  },
  purchaseInfo: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  purchaseLabel: {
    fontSize: 12,
    color: '#00838F',
    marginBottom: 4,
  },
  purchaseValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  suggestionText: {
    fontSize: 15,
    color: '#2C3E50',
    lineHeight: 22,
    marginBottom: 16,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  savingsBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 6,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  resetButtonText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '70%',
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
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F8F9FA',
  },
  categoryOptionSelected: {
    backgroundColor: '#F0EFFF',
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#2C3E50',
  },
  categoryOptionTextSelected: {
    fontWeight: 'bold',
    color: '#6C63FF',
  },
});

export default QuidSaverChatScreen;