import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const StoryCard = ({ story }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  // Format numbers with K suffix for larger numbers
  const formatStat = (value) => {
    return value > 999 ? `${(value / 1000).toFixed(1)}K` : value;
  }

  return (
    <motion.div 
      className="story-card group relative flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Premium Badge */}
      {storyData.premium && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          PREMIUM
        </div>
      )}
      
      {/* Cover Image */}
      <div className="relative overflow-hidden rounded-t-lg aspect-[3/2]">
        <Link to={`/stories/${storyData.id}`} className="block">
          <motion.img 
            src={storyData.coverImage}
            alt={storyData.title}
            className="w-full h-full object-cover object-center transition-all"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
          
          {/* Quick Stats Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {storyData.stats.readTime} min
              </div>
              <div className="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {formatStat(storyData.stats.reads)}
              </div>
            </div>
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {formatStat(storyData.stats.likes)}
            </div>
          </div>
        </Link>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 bg-white dark:bg-gray-800 rounded-b-lg border-t-0 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow">
        <Link to={`/stories/${storyData.id}`} className="block">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {storyData.title}
          </h3>
          
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
            {storyData.excerpt}
          </p>
        </Link>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {storyData.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img 
              src={storyData.author.avatar} 
              alt={storyData.author.name}
              className="w-7 h-7 rounded-full mr-2 border border-gray-200 dark:border-gray-600" 
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {storyData.author.name}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formattedDate}
          </div>
        </div>
        
        {/* Read Button - Visible on hover */}
        <motion.div 
          className="absolute right-4 bottom-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Link 
            to={`/stories/${storyData.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded-full flex items-center shadow-md"
          >
            Read Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default StoryCard 