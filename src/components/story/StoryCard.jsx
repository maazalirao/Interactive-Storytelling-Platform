import { Link } from 'react-router-dom'

const StoryCard = ({ story }) => {
  // Default story if none provided
  const defaultStory = {
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
  }
  
  // Use provided story or default
  const storyData = { ...defaultStory, ...story }
  
  // Format date
  const formattedDate = new Date(storyData.datePublished).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="story-card group relative flex flex-col h-full">
      {/* Premium Badge */}
      {storyData.premium && (
        <div className="absolute top-3 right-3 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
          PREMIUM
        </div>
      )}
      
      {/* Cover Image */}
      <div className="relative overflow-hidden rounded-t-lg aspect-[3/2]">
        <Link to={`/stories/${storyData.id}`} className="block">
          <img 
            src={storyData.coverImage}
            alt={storyData.title}
            className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </Link>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4">
        {/* Tags */}
        {storyData.tags && storyData.tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {storyData.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <Link to={`/stories/${storyData.id}`}>
            {storyData.title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {storyData.excerpt}
        </p>
        
        {/* Author and Stats */}
        <div className="mt-auto">
          {/* Author */}
          <div className="flex items-center mb-3">
            <Link to={`/profile/${storyData.author.id}`} className="flex items-center group">
              <img 
                src={storyData.author.avatar}
                alt={storyData.author.name}
                className="h-8 w-8 rounded-full mr-2 object-cover"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {storyData.author.name}
              </span>
            </Link>
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              {/* Read Time */}
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{storyData.stats.readTime} min read</span>
              </div>
              
              {/* View Count */}
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <span>{storyData.stats.reads}</span>
              </div>
            </div>
            
            {/* Date */}
            <div>
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex space-x-3">
          {/* Like Button */}
          <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span>{storyData.stats.likes}</span>
          </button>
          
          {/* Comment Button */}
          <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span>{storyData.stats.comments}</span>
          </button>
        </div>
        
        {/* Bookmark Button */}
        <button className="text-gray-500 dark:text-gray-400 hover:text-secondary-600 dark:hover:text-secondary-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default StoryCard 