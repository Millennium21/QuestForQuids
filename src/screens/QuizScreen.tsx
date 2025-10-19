import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockQuizzes } from '../utils/mockData';
import { Quiz } from '../types';

const QuizScreen = () => {
  const [quizzes] = useState(mockQuizzes);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuiz) return;

    const isCorrect = selectedAnswer === currentQuiz.correctAnswer;
    setShowResult(true);

    if (isCorrect && !completedQuizzes.includes(currentQuiz.id)) {
      setTotalPoints(prev => prev + currentQuiz.points);
      setCompletedQuizzes(prev => [...prev, currentQuiz.id]);
    }
  };

  const closeQuiz = () => {
    setCurrentQuiz(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getLevel = () => {
    if (totalPoints >= 50) return 'Expert';
    if (totalPoints >= 30) return 'Advanced';
    if (totalPoints >= 10) return 'Beginner';
    return 'Novice';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Progress Card */}
      <View 
        style={styles.progressCard}
        accessibilityLabel={`Your level is ${getLevel()} with ${totalPoints} points`}
        accessibilityRole="summary"
      >
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.levelLabel}>Your Level</Text>
            <Text style={styles.levelValue}>{getLevel()}</Text>
          </View>
          <View style={styles.pointsBadge}>
            <Icon name="star" size={24} color="#FFD700" />
            <Text style={styles.pointsValue}>{totalPoints}</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${Math.min((totalPoints / 55) * 100, 100)}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {completedQuizzes.length} of {quizzes.length} quizzes completed
        </Text>
      </View>

      {/* Quiz List */}
      <View
        style={styles.section}
        accessibilityLabel="Financial Literacy Quizzes - Learn about money management and earn points"
        accessibilityRole="header"
      >
        <Text style={styles.sectionTitle}>Financial Literacy Quizzes</Text>
        <Text style={styles.sectionSubtitle}>
          Learn about money management and earn points!
        </Text>

        {quizzes.map((quiz) => {
          const isCompleted = completedQuizzes.includes(quiz.id);
          return (
            <TouchableOpacity
              key={quiz.id}
              style={[styles.quizCard, isCompleted && styles.completedCard]}
              onPress={() => startQuiz(quiz)}
              disabled={isCompleted}
            >
              <View style={styles.quizHeader}>
                <View style={styles.quizIcon}>
                  <Icon 
                    name={isCompleted ? 'check-circle' : 'help-circle'} 
                    size={32} 
                    color={isCompleted ? '#4CAF50' : '#6C63FF'} 
                  />
                </View>
                <View style={styles.quizContent}>
                  <Text style={styles.quizQuestion} numberOfLines={2}>
                    {quiz.question}
                  </Text>
                  <View style={styles.quizFooter}>
                    <View style={styles.pointsTag}>
                      <Icon name="star" size={14} color="#FFD700" />
                      <Text style={styles.pointsText}>{quiz.points} points</Text>
                    </View>
                    {isCompleted && (
                      <Text style={styles.completedText}>✓ Completed</Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Quiz Modal */}
      <Modal
        visible={currentQuiz !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeQuiz}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeQuiz}>
              <Icon name="close" size={24} color="#2C3E50" />
            </TouchableOpacity>

            {currentQuiz && (
              <>
                <View
                  style={styles.modalHeader}
                  accessibilityLabel={`${currentQuiz.question}`}
                  accessibilityRole="text"
                >
                  <Icon name="head-question" size={48} color="#6C63FF" />
                  <Text style={styles.modalPoints}>+{currentQuiz.points} points</Text>
                </View>

                <Text style={styles.modalQuestion}>{currentQuiz.question}</Text>

                <View style={styles.optionsContainer}>
                  {currentQuiz.options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedAnswer === index && styles.selectedOption,
                        showResult && index === currentQuiz.correctAnswer && styles.correctOption,
                        showResult && selectedAnswer === index && index !== currentQuiz.correctAnswer && styles.wrongOption,
                      ]}
                      onPress={() => !showResult && setSelectedAnswer(index)}
                      disabled={showResult}
                    >
                      <View style={styles.optionContent}>
                        <View style={[
                          styles.optionRadio,
                          selectedAnswer === index && styles.selectedRadio,
                        ]}>
                          {selectedAnswer === index && (
                            <View style={styles.radioInner} />
                          )}
                        </View>
                        <Text style={[
                          styles.optionText,
                          selectedAnswer === index && styles.selectedOptionText,
                        ]}>
                          {option}
                        </Text>
                      </View>
                      {showResult && index === currentQuiz.correctAnswer && (
                        <Icon name="check-circle" size={24} color="#4CAF50" />
                      )}
                      {showResult && selectedAnswer === index && index !== currentQuiz.correctAnswer && (
                        <Icon name="close-circle" size={24} color="#E74C3C" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                {showResult && (
                  <View style={[
                    styles.resultCard,
                    selectedAnswer === currentQuiz.correctAnswer ? styles.correctResult : styles.wrongResult
                  ]}>
                    <View style={styles.resultHeader}>
                      <Icon 
                        name={selectedAnswer === currentQuiz.correctAnswer ? 'check-circle' : 'close-circle'} 
                        size={32} 
                        color={selectedAnswer === currentQuiz.correctAnswer ? '#4CAF50' : '#E74C3C'} 
                      />
                      <Text style={styles.resultTitle}>
                        {selectedAnswer === currentQuiz.correctAnswer ? 'Correct!' : 'Not quite!'}
                      </Text>
                    </View>
                    <Text style={styles.explanation}>{currentQuiz.explanation}</Text>
                  </View>
                )}

                {!showResult ? (
                  <TouchableOpacity
                    style={[styles.submitButton, selectedAnswer === null && styles.disabledButton]}
                    onPress={submitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    <Text style={styles.submitButtonText}>Submit Answer</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={closeQuiz}
                  >
                    <Text style={styles.continueButtonText}>Continue Learning</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
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
  progressCard: {
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
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  levelValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pointsValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  progressText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  quizCard: {
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
  completedCard: {
    backgroundColor: '#F0F9F0',
    opacity: 0.7,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizIcon: {
    marginRight: 16,
  },
  quizContent: {
    flex: 1,
  },
  quizQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  quizFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pointsTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pointsText: {
    fontSize: 12,
    color: '#F39C12',
    fontWeight: '600',
    marginLeft: 4,
  },
  completedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
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
    maxHeight: '90%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalPoints: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: 'bold',
    marginTop: 8,
  },
  modalQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 24,
    lineHeight: 28,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8EAED',
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: '#6C63FF',
    backgroundColor: '#F0EFFF',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#F0F9F0',
  },
  wrongOption: {
    borderColor: '#E74C3C',
    backgroundColor: '#FFE5E5',
  },
  optionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#BDC3C7',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    borderColor: '#6C63FF',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6C63FF',
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  resultCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  correctResult: {
    backgroundColor: '#F0F9F0',
  },
  wrongResult: {
    backgroundColor: '#FFE5E5',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  explanation: {
    fontSize: 15,
    color: '#2C3E50',
    lineHeight: 22,
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizScreen;