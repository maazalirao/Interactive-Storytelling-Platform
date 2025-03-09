import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Layout components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Pages
import StoriesPage from './pages/StoriesPage'
import CreateStoryPage from './pages/CreateStoryPage'
import UserProfile from './components/user/UserProfile'

// Home page component
const Home = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-center mb-8">Interactive Storytelling Platform</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="story-card">
        <h2 className="text-2xl font-semibold mb-3">Create Stories</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Build interactive narratives with our rich text editor and branching paths creator.
        </p>
        <button className="btn-primary">Start Creating</button>
      </div>
      <div className="story-card">
        <h2 className="text-2xl font-semibold mb-3">Read Stories</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Explore interactive stories with choice-based progression and personalized reading history.
        </p>
        <button className="btn-secondary">Discover Stories</button>
      </div>
      <div className="story-card">
        <h2 className="text-2xl font-semibold mb-3">Join Community</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Connect with other creators, share feedback, and participate in writing challenges.
        </p>
        <button className="btn-primary">Join Now</button>
      </div>
    </div>
  </div>
)

// Community page component (placeholder)
const Community = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Community</h1>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-story p-6">
      <h2 className="text-xl font-semibold mb-4">Join the StoryVerse Community</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Connect with other storytellers, share feedback, and participate in writing challenges.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Writing Challenges</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            Weekly prompts to inspire your creativity and challenge your storytelling skills.
          </p>
          <button className="btn-primary text-sm">View Challenges</button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Discussion Forums</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            Share ideas, ask questions, and discuss storytelling techniques with fellow creators.
          </p>
          <button className="btn-primary text-sm">Join Discussions</button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Feedback Exchange</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            Give and receive constructive feedback to improve your interactive stories.
          </p>
          <button className="btn-primary text-sm">Exchange Feedback</button>
        </div>
      </div>
    </div>
  </div>
)

// Profile page component
const Profile = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
    <UserProfile />
  </div>
)

function App() {
  // Effect to handle dark mode
  useEffect(() => {
    // Check for dark mode preference
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/create" element={<CreateStoryPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
