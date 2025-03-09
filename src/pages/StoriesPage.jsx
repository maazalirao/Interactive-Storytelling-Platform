import { useState, useEffect } from 'react'
import StoryCard from '../components/story/StoryCard'

const StoriesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('popular')
  
  // Sample stories data
  const [stories, setStories] = useState([
    {
      id: '1',
      title: 'The Lost City',
      excerpt: 'Embark on a journey to discover an ancient civilization hidden deep in the Amazon rainforest...',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      author: {
        id: '101',
        name: 'Elena Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=29'
      },
      stats: {
        readTime: 15,
        reads: 1245,
        likes: 89,
        comments: 23
      },
      tags: ['Adventure', 'Mystery', 'History'],
      datePublished: '2023-10-15',
      premium: false
    },
    {
      id: '2',
      title: 'Beyond the Stars',
      excerpt: 'When a mysterious signal is detected from a distant galaxy, astronaut Dr. Samantha Wei volunteers for a one-way mission to investigate...',
      coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      author: {
        id: '102',
        name: 'Marcus Chen',
        avatar: 'https://i.pravatar.cc/150?img=60'
      },
      stats: {
        readTime: 22,
        reads: 3587,
        likes: 278,
        comments: 65
      },
      tags: ['Sci-Fi', 'Space', 'Drama'],
      datePublished: '2023-11-02',
      premium: true
    },
    {
      id: '3',
      title: 'The Alchemist\'s Apprentice',
      excerpt: 'In a world where magic is real but heavily regulated, young Thomas becomes apprenticed to a mysterious alchemist with forbidden knowledge...',
      coverImage: 'https://images.unsplash.com/photo-1555431189-0fabf2667795?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      author: {
        id: '103',
        name: 'Sophia Williams',
        avatar: 'https://i.pravatar.cc/150?img=32'
      },
      stats: {
        readTime: 18,
        reads: 924,
        likes: 57,
        comments: 12
      },
      tags: ['Fantasy', 'Magic', 'YA'],
      datePublished: '2023-09-28',
      premium: false
    },
    {
      id: '4',
      title: 'Echoes of the Past',
      excerpt: 'Detective Sarah Morgan is haunted by unsolved cases from her past. When a new murder bears the same signature as her father\'s killer...',
      coverImage: 'https://images.unsplash.com/photo-1587653263995-404251d6f373?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      author: {
        id: '104',
        name: 'James Peterson',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      stats: {
        readTime: 25,
        reads: 1789,
        likes: 145,
        comments: 39
      },
      tags: ['Thriller', 'Mystery', 'Crime'],
      datePublished: '2023-10-20',
      premium: true
    },
    {
      id: '5',
      title: 'Garden of Whispers',
      excerpt: 'In the small town of Millfield, there\'s a garden where locals say you can hear whispers of the future if you visit at midnight...',
      coverImage: 'https://images.unsplash.com/photo-1501163109389-c4f9f5472601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      author: {
        id: '105',
        name: 'Olivia Kim',
        avatar: 'https://i.pravatar.cc/150?img=45'
      },
      stats: {
        readTime: 12,
        reads: 576,
        likes: 49,
        comments: 8
      },
      tags: ['Paranormal', 'Small Town', 'Mystery'],
      datePublished: '2023-11-05',
      premium: false
    },
    {
      id: '6',
      title: 'The Last Lighthouse',
      excerpt: 'On a remote island, a lighthouse keeper discovers a strange notebook washed ashore that seems to predict disasters before they happen...',
      coverImage: 'https://images.unsplash.com/photo-1588970698009-f8ea62f1857e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
      author: {
        id: '106',
        name: 'Daniel Scott',
        avatar: 'https://i.pravatar.cc/150?img=53'
      },
      stats: {
        readTime: 20,
        reads: 823,
        likes: 72,
        comments: 17
      },
      tags: ['Suspense', 'Supernatural', 'Drama'],
      datePublished: '2023-10-12',
      premium: true
    }
  ])
  
  // Filter stories based on active filter
  const filteredStories = stories.filter(story => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'premium') return story.premium
    if (activeFilter === 'free') return !story.premium
    
    // Filter by genre tag
    return story.tags.some(tag => tag.toLowerCase() === activeFilter.toLowerCase())
  })
  
  // Sort stories based on active sort
  const sortedStories = [...filteredStories].sort((a, b) => {
    if (activeSort === 'popular') return b.stats.reads - a.stats.reads
    if (activeSort === 'recent') return new Date(b.datePublished) - new Date(a.datePublished)
    if (activeSort === 'likes') return b.stats.likes - a.stats.likes
    return 0
  })
  
  // Filter categories
  const filters = [
    { id: 'all', name: 'All Stories' },
    { id: 'premium', name: 'Premium' },
    { id: 'free', name: 'Free' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'thriller', name: 'Thriller' }
  ]
  
  // Sort options
  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Recently Added' },
    { id: 'likes', name: 'Most Liked' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Interactive Stories
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover interactive adventures created by our community.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="relative inline-block">
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="form-input py-2 pl-3 pr-10"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2 min-w-max">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      
      {/* No Results */}
      {sortedStories.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-1">No stories found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            No stories match your current filters. Try changing your search criteria.
          </p>
        </div>
      )}
      
      {/* Load More Button */}
      {sortedStories.length > 0 && (
        <div className="mt-10 text-center">
          <button className="btn-secondary px-6">
            Load More Stories
          </button>
        </div>
      )}
    </div>
  )
}

export default StoriesPage 