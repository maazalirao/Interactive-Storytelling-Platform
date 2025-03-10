import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Layout components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Pages
import StoriesPage from './pages/StoriesPage'
import CreateStoryPage from './pages/CreateStoryPage'
import StoryReaderPage from './pages/StoryReaderPage'
import UserProfile from './components/user/UserProfile'

// Home page component
const Home = () => (
  <div className="min-h-screen">
    {/* Hero Section with Animation */}
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 to-secondary-900 text-white py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-60 h-60 bg-secondary-400 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0)_1px,_rgba(255,255,255,0.05)_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
              Create Interactive Stories
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Craft branching narratives where every choice matters. Immerse readers in worlds of your creation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <button className="btn-primary text-lg px-8 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Start Creating
              </button>
            </Link>
            <Link to="/stories">
              <button className="btn-secondary text-lg px-8 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Explore Stories
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
    
    {/* Features Section */}
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 relative">
          <span className="relative inline-block">
            Unleash Your Creativity
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></span>
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="story-card group hover:border-primary-500 border-2 border-transparent">
            <div className="mb-4 text-primary-600 dark:text-primary-400 flex justify-center">
              <svg className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Create Stories</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              Build interactive narratives with our rich text editor and branching paths creator.
            </p>
            <div className="text-center">
              <Link to="/create">
                <button className="btn-primary group-hover:bg-primary-700 transition-colors duration-300">Start Creating</button>
              </Link>
            </div>
          </div>
          
          <div className="story-card group hover:border-secondary-500 border-2 border-transparent">
            <div className="mb-4 text-secondary-600 dark:text-secondary-400 flex justify-center">
              <svg className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-300">Read Stories</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              Explore interactive stories with choice-based progression and personalized reading history.
            </p>
            <div className="text-center">
              <Link to="/stories">
                <button className="btn-secondary group-hover:bg-secondary-700 transition-colors duration-300">Discover Stories</button>
              </Link>
            </div>
          </div>
          
          <div className="story-card group hover:border-primary-500 border-2 border-transparent">
            <div className="mb-4 text-primary-600 dark:text-primary-400 flex justify-center">
              <svg className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Join Community</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              Connect with other creators, share feedback, and participate in writing challenges.
            </p>
            <div className="text-center">
              <Link to="/community">
                <button className="btn-primary group-hover:bg-primary-700 transition-colors duration-300">Join Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Featured Stories Section */}
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Stories</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover handpicked interactive stories from our talented community of creators
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Story 1 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-story group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-r from-primary-500 to-primary-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="bg-primary-600 text-xs inline-block px-2 py-1 rounded mb-2">Fantasy</div>
                <h3 className="text-xl font-bold">The Crystal Cavern</h3>
                <p className="text-sm opacity-90">By StoryMaster</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Explore a magical underground world where your choices determine the fate of an ancient civilization.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">
                    <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">4.8 (124 reviews)</span>
                </div>
                <Link to="/stories/1">
                  <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm">
                    Read Now →
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Featured Story 2 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-story group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-r from-secondary-500 to-secondary-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="bg-secondary-600 text-xs inline-block px-2 py-1 rounded mb-2">Mystery</div>
                <h3 className="text-xl font-bold">Whispers in the Dark</h3>
                <p className="text-sm opacity-90">By MysteryWriter</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Solve a murder mystery in a small town where everyone has secrets. Your detective skills will be put to the test.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">
                    <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">4.6 (98 reviews)</span>
                </div>
                <Link to="/stories/2">
                  <button className="text-secondary-600 hover:text-secondary-800 dark:text-secondary-400 dark:hover:text-secondary-300 font-medium text-sm">
                    Read Now →
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Featured Story 3 */}
          <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-story group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-48 bg-gradient-to-r from-primary-700 to-secondary-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="bg-gray-800 text-xs inline-block px-2 py-1 rounded mb-2">Sci-Fi</div>
                <h3 className="text-xl font-bold">Quantum Paradox</h3>
                <p className="text-sm opacity-90">By FutureTeller</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Navigate through multiple timelines in this mind-bending sci-fi adventure where your choices affect the fabric of reality.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">
                    <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">4.9 (156 reviews)</span>
                </div>
                <Link to="/stories/3">
                  <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm">
                    Read Now →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/stories">
            <button className="btn-primary px-6 py-3 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              View All Stories
            </button>
          </Link>
        </div>
      </div>
    </section>
    
    {/* Call to Action Section */}
    <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Own Story?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of storytellers who are creating interactive narratives and sharing them with readers around the world.
        </p>
        <Link to="/create">
          <button className="bg-white text-primary-700 hover:bg-gray-100 font-bold px-8 py-3 rounded-full text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Start Creating Now
          </button>
        </Link>
      </div>
    </section>
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
  <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen pb-8">
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        {/* Cyber elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-60 h-60 bg-cyan-400 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0)_1px,_rgba(0,128,255,0.05)_1px)] bg-[size:40px_40px]"></div>
        </div>
      
        <h1 className="text-3xl font-bold mb-6 text-white relative z-10 inline-block">
          Your Profile
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
        </h1>
        
        <div className="relative z-10">
          <UserProfile />
        </div>
      </div>
    </div>
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
            <Route path="/stories/:storyId" element={<StoryReaderPage />} />
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
