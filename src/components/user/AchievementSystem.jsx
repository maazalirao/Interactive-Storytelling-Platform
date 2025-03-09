import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AchievementSystem = () => {
  const [achievements, setAchievements] = useState([]);
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);
  const [stats, setStats] = useState({
    storiesRead: 0,
    choicesMade: 0,
    storiesCreated: 0,
    commentsPosted: 0,
    daysActive: 0,
    streakDays: 0,
  });
  
  // Load user achievements and stats from localStorage
  useEffect(() => {
    const savedAchievements = localStorage.getItem('user_achievements');
    const savedStats = localStorage.getItem('user_stats');
    
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    } else {
      // Sample achievements structure
      const initialAchievements = [
        {
          id: 'first-story',
          title: 'First Adventure',
          description: 'Read your first interactive story',
          icon: '📚',
          unlocked: true,
          unlockedAt: new Date(Date.now() - 86400000 * 14).toISOString(), // 14 days ago
          progress: 100,
          reward: '100 XP'
        },
        {
          id: 'choice-maker',
          title: 'Decision Maker',
          description: 'Make 50 choices in interactive stories',
          icon: '🔀',
          unlocked: true,
          unlockedAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
          progress: 100,
          reward: '200 XP'
        },
        {
          id: 'story-creator',
          title: 'Storyteller',
          description: 'Create your first interactive story',
          icon: '✍️',
          unlocked: false,
          progress: 0,
          reward: '300 XP'
        },
        {
          id: 'commenter',
          title: 'Engaged Reader',
          description: 'Post 10 comments on stories',
          icon: '💬',
          unlocked: false,
          progress: 70,
          reward: '150 XP'
        },
        {
          id: 'daily-reader',
          title: 'Daily Reader',
          description: 'Read stories on 7 consecutive days',
          icon: '📅',
          unlocked: false,
          progress: 43,
          reward: '250 XP'
        },
        {
          id: 'genre-explorer',
          title: 'Genre Explorer',
          description: 'Read stories from 5 different genres',
          icon: '🌍',
          unlocked: false,
          progress: 60,
          reward: '200 XP'
        },
        {
          id: 'social-butterfly',
          title: 'Social Butterfly',
          description: 'Share 5 stories with friends',
          icon: '🦋',
          unlocked: false,
          progress: 40,
          reward: '150 XP'
        },
        {
          id: 'mystery-master',
          title: 'Mystery Master',
          description: 'Read 5 mystery stories to completion',
          icon: '🔍',
          unlocked: false,
          progress: 20,
          reward: '200 XP'
        }
      ];
      
      setAchievements(initialAchievements);
      localStorage.setItem('user_achievements', JSON.stringify(initialAchievements));
    }
    
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      // Sample stats
      const initialStats = {
        storiesRead: 7,
        choicesMade: 52,
        storiesCreated: 0,
        commentsPosted: 7,
        daysActive: 14,
        streakDays: 3,
      };
      
      setStats(initialStats);
      localStorage.setItem('user_stats', JSON.stringify(initialStats));
    }
    
    // Simulate unlocking a new achievement after delay
    const timeout = setTimeout(() => {
      const achievementToUnlock = {
        id: 'story-creator',
        title: 'Storyteller',
        description: 'Create your first interactive story',
        icon: '✍️',
        unlocked: true,
        unlockedAt: new Date().toISOString(),
        progress: 100,
        reward: '300 XP'
      };
      
      setNewAchievement(achievementToUnlock);
      setShowAchievementPopup(true);
      
      // Update achievements list
      const updatedAchievements = achievements.map(a => 
        a.id === 'story-creator' ? achievementToUnlock : a
      );
      
      setAchievements(updatedAchievements);
      localStorage.setItem('user_achievements', JSON.stringify(updatedAchievements));
      
      // Update stats
      const updatedStats = {
        ...stats,
        storiesCreated: stats.storiesCreated + 1
      };
      
      setStats(updatedStats);
      localStorage.setItem('user_stats', JSON.stringify(updatedStats));
      
      // Auto-hide popup after 5 seconds
      setTimeout(() => {
        setShowAchievementPopup(false);
      }, 5000);
    }, 10000); // Simulate after 10 seconds
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Calculate user level based on XP (from unlocked achievements)
  const calculateLevel = () => {
    const totalXP = achievements
      .filter(a => a.unlocked)
      .reduce((total, achievement) => {
        const xpMatch = achievement.reward.match(/(\d+) XP/);
        return total + (xpMatch ? parseInt(xpMatch[1]) : 0);
      }, 0);
    
    // Simple level formula: 100 XP per level
    return {
      level: Math.floor(totalXP / 100) + 1,
      currentXP: totalXP % 100,
      totalXP,
      nextLevelXP: 100
    };
  };
  
  const levelInfo = calculateLevel();
  
  return (
    <div className="achievement-system">
      {/* User level progress */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Progress</h2>
        
        <div className="flex items-center mb-4">
          <div className="level-badge w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {levelInfo.level}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Level {levelInfo.level}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {levelInfo.currentXP} / {levelInfo.nextLevelXP} XP to next level
            </p>
          </div>
        </div>
        
        {/* XP Progress bar */}
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: `${(levelInfo.currentXP / levelInfo.nextLevelXP) * 100}%` }}
          ></div>
        </div>
        
        {/* User stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="stat-card p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div className="text-3xl mb-1 text-blue-500">📚</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.storiesRead}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Stories Read</div>
          </div>
          
          <div className="stat-card p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div className="text-3xl mb-1 text-blue-500">🔀</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.choicesMade}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Choices Made</div>
          </div>
          
          <div className="stat-card p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div className="text-3xl mb-1 text-blue-500">✍️</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.storiesCreated}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Stories Created</div>
          </div>
          
          <div className="stat-card p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div className="text-3xl mb-1 text-blue-500">💬</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.commentsPosted}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Comments Posted</div>
          </div>
          
          <div className="stat-card p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div className="text-3xl mb-1 text-blue-500">📅</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.daysActive}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Days Active</div>
          </div>
          
          <div className="stat-card p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div className="text-3xl mb-1 text-blue-500">🔥</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.streakDays}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Day Streak</div>
          </div>
        </div>
      </div>
      
      {/* Achievements list */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map(achievement => (
            <motion.div
              key={achievement.id}
              whileHover={{ y: -5 }}
              className={`achievement-card p-4 rounded-lg border ${
                achievement.unlocked 
                  ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-700' 
                  : 'border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600'
              }`}
            >
              <div className="flex items-start">
                <div className={`achievement-icon text-3xl mr-3 ${achievement.unlocked ? '' : 'opacity-40'}`}>
                  {achievement.icon}
                </div>
                <div>
                  <h3 className={`font-medium mb-1 ${
                    achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {achievement.description}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        achievement.unlocked 
                          ? 'bg-green-500 dark:bg-green-400' 
                          : 'bg-blue-400 dark:bg-blue-500'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className={`${
                      achievement.unlocked 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {achievement.unlocked ? 'Completed' : `${achievement.progress}% complete`}
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-medium">
                      {achievement.reward}
                    </span>
                  </div>
                  
                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* New Achievement Popup */}
      <AnimatePresence>
        {showAchievementPopup && newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border-2 border-yellow-400 z-50 max-w-md"
          >
            <div className="flex items-center">
              <div className="achievement-unlock-icon text-5xl mr-4 animate-bounce">
                {newAchievement.icon}
              </div>
              <div>
                <div className="text-xs uppercase text-yellow-600 dark:text-yellow-400 font-bold mb-1">Achievement Unlocked!</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{newAchievement.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{newAchievement.description}</p>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-2">
                  Reward: {newAchievement.reward}
                </p>
              </div>
            </div>
            <button 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => setShowAchievementPopup(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementSystem; 