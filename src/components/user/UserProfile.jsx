import { useState } from 'react'
import profileImage from '../../assets/images/maaz-profile.jpg'

const UserProfile = ({ user = {} }) => {
  // Default user data for demo purposes
  const defaultUser = {
    id: '1',
    username: 'maazalirao',
    name: 'Maaz Ali Rao',
    bio: 'Passionate storyteller exploring interactive narratives and branching storylines.',
    avatar: profileImage,
    email: 'maaz@storyverse.com',
    joined: '2023-05-15',
    storiesCreated: 12,
    followers: 248,
    following: 56,
    achievements: [
      { id: 1, name: 'Story Master', description: 'Created 10+ stories', icon: '📚' },
      { id: 2, name: 'Popular Creator', description: 'Reached 100+ followers', icon: '🌟' },
      { id: 3, name: 'Narrative Genius', description: 'Created a story with 20+ branches', icon: '🧠' },
    ],
    recentStories: [
      { id: 101, title: 'The Forgotten Castle', reads: 1245, likes: 89, date: '2023-09-12' },
      { id: 102, title: 'Journey to the Stars', reads: 972, likes: 76, date: '2023-08-24' },
      { id: 103, title: 'The Last Guardian', reads: 1587, likes: 112, date: '2023-07-15' },
    ]
  }
  
  // Combine provided user data with defaults
  const userData = { ...defaultUser, ...user }
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false)
  const [editableUser, setEditableUser] = useState(userData)
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditableUser(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically save the data to your backend
    console.log('Saving user data:', editableUser)
    setIsEditing(false)
    // In a real app, you would update the user data after successful API response
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-story overflow-hidden">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
        
        {/* Avatar and Basic Info */}
        <div className="px-6 pt-4 pb-6 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="absolute -top-16 left-6 h-24 w-24 md:relative md:top-auto md:left-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-75 rounded-full blur-[2px] group-hover:blur-[4px] transition-all duration-300"></div>
                <div className="absolute inset-0 border-2 border-cyan-300 rounded-full animate-pulse"></div>
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="relative h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 object-cover object-top"
                  style={{ objectPosition: "center 25%" }}
                />
                <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>
            <div className="mt-8 md:mt-0 md:ml-4 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">@{userData.username}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-auto">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    className="btn-primary text-sm"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="btn-secondary text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="px-6 pb-6">
        {isEditing ? (
          // Edit Form
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Name
              </label>
              <input 
                type="text"
                name="name"
                value={editableUser.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input 
                type="text"
                name="username"
                value={editableUser.username}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input 
                type="email"
                name="email"
                value={editableUser.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea 
                name="bio"
                value={editableUser.bio}
                onChange={handleChange}
                rows="4"
                className="form-input"
              ></textarea>
            </div>
          </form>
        ) : (
          // Profile View
          <div>
            {/* Bio */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bio</h2>
              <p className="text-gray-700 dark:text-gray-300">{userData.bio}</p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{userData.storiesCreated}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Stories</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{userData.followers}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{userData.following}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {userData.achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{achievement.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Stories */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recent Stories</h2>
              <div className="space-y-3">
                {userData.recentStories.map(story => (
                  <div 
                    key={story.id} 
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">{story.title}</h3>
                    <div className="flex justify-between mt-2 text-sm">
                      <div className="text-gray-500 dark:text-gray-400">
                        Published: {new Date(story.date).toLocaleDateString()}
                      </div>
                      <div className="space-x-4">
                        <span className="text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-primary-600 dark:text-primary-400">{story.reads}</span> reads
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-secondary-600 dark:text-secondary-400">{story.likes}</span> likes
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile 