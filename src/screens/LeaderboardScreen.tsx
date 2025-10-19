import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockUserData, mockFamilyLeaderboard } from '../utils/mockData';

const LeaderboardScreen = () => {
    const [leaderboard] = useState(mockFamilyLeaderboard);
    const [userData] = useState(mockUserData);

    const getLevelInfo = (savings: number) => {
        if (savings >= 5000) return { level: 5, name: 'Money Master', color: '#FFD700', icon: 'crown', next: 10000 };
        if (savings >= 2500) return { level: 4, name: 'Savings Pro', color: '#9C27B0', icon: 'trophy', next: 5000 };
        if (savings >= 1000) return { level: 3, name: 'Smart Saver', color: '#2196F3', icon: 'star', next: 2500 };
        if (savings >= 500) return { level: 2, name: 'Penny Pincher', color: '#4CAF50', icon: 'leaf', next: 1000 };
        return { level: 1, name: 'Beginner', color: '#FF9800', icon: 'sprout', next: 500 };
    };

    const currentLevel = getLevelInfo(userData.savings);
    const progressToNext = ((userData.savings - (currentLevel.level === 1 ? 0 : 
    currentLevel.level === 2 ? 500 : 
    currentLevel.level === 3 ? 1000 : 
    currentLevel.level === 4 ? 2500 : 5000)) / 
    (currentLevel.next - (currentLevel.level === 1 ? 0 : 
    currentLevel.level === 2 ? 500 : 
    currentLevel.level === 3 ? 1000 : 
    currentLevel.level === 4 ? 2500 : 5000))) * 100;

    const getRankColor = (rank: number) => {
        if (rank === 1) return '#FFD700';
        if (rank === 2) return '#C0C0C0';
        if (rank === 3) return '#CD7F32';
        return '#95A5A6';
    };

    return (
        <ScrollView style={styles.container}>
            {/* User Progress Card */}
            <View style={styles.progressCard}>
                <View style={styles.progressHeader}>
                    <View style={[styles.levelIcon, { backgroundColor: `${currentLevel.color}20` }]}>
                        <Icon name={currentLevel.icon} size={40} color={currentLevel.color} />
                    </View>
                    <View style={styles.levelInfo}>
                        <Text style={styles.levelName}>{currentLevel.name}</Text>
                        <Text style={styles.levelNumber}>Level {currentLevel.level}</Text>
                            <Text style={styles.savingsAmount}>£{userData.savings.toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarTrack}>
                            <View 
                              style={[styles.progressBarFill,
                              { width: `${Math.min(progressToNext, 100)}%`, backgroundColor: currentLevel.color }
                            ]} 
                            />
                        </View>
                    <View style={styles.progressLabels}>
                        <Text style={styles.progressText}>
                            {progressToNext.toFixed(0)}% to Level {currentLevel.level + 1}
                        </Text>
                        <Text style={styles.progressNext}>
                            £{currentLevel.next.toFixed(0)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Leaderboard */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Icon name="trophy" size={24} color="#FFD700" />
                    <Text style={styles.sectionTitle}>Family Rankings</Text>
                </View>

                {leaderboard.map((member, index) => {
                    const rank = index + 1;
                    const rankColor = getRankColor(rank);
                    const levelInfo = getLevelInfo(member.savings);
                    const isCurrentUser = member.id === 'current-user';

                    return (
                        <View 
                          key={member.id} 
                          style={[
                          styles.leaderboardCard,
                          isCurrentUser && styles.currentUserCard
                          ]}
                        >
                            <View style={[styles.rankCircle, { backgroundColor: `${rankColor}20` }]}>
                                <Text style={[styles.rankNumber, { color: rankColor }]}>#{rank}</Text>
                            </View>

                            <View style={styles.memberInfo}>
                                <Text style={[styles.memberName, isCurrentUser && styles.currentUserText]}>
                                    {member.name}
                                </Text>
                                <View style={styles.memberStats}>
                                    <Icon name="cash" size={14} color="#4CAF50" />
                                    <Text style={styles.statText}>£{member.savings.toFixed(2)}</Text>
                                    <Text style={styles.statDivider}>•</Text>
                                    <Icon name={levelInfo.icon} size={14} color={levelInfo.color} />
                                    <Text style={styles.statText}>Level {levelInfo.level}</Text>
                                </View>
                            </View>

                            {rank <= 3 && (
                              <Icon name="medal" size={28} color={rankColor} />
                            )}
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    progressCard: {
        backgroundColor: '#fff',
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
        alignItems: 'center',
        marginBottom: 20,
    },
    levelIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    levelInfo: {
        flex: 1,
    },
    levelName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 2,
    },
    levelNumber: {
        fontSize: 14,
        color: '#7F8C8D',
        marginBottom: 4,
    },
    savingsAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    progressBarContainer: {
        marginTop: 8,
    },
    progressBarTrack: {
        height: 12,
        backgroundColor: '#E8EAED',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 6,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressText: {
        fontSize: 14,
        color: '#7F8C8D',
        fontWeight: '600',
    },
    progressNext: {
        fontSize: 14,
        color: '#2C3E50',
        fontWeight: 'bold',
    },
    section: {
        marginHorizontal: 16,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginLeft: 12,
    },
    leaderboardCard: {
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
    currentUserCard: {
        backgroundColor: '#F0EFFF',
        borderWidth: 2,
        borderColor: '#6C63FF',
    },
    rankCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    rankNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 6,
    },
    currentUserText: {
        color: '#6C63FF',
    },
    memberStats: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 13,
        color: '#7F8C8D',
        fontWeight: '600',
    },
    statDivider: {
        fontSize: 13,
        color: '#E8EAED',
        marginHorizontal: 2,
    },
});

export default LeaderboardScreen;