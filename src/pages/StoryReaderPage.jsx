import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StoryReader from '../components/story/StoryReader';
import CommentSection from '../components/story/CommentSection';
import { motion } from 'framer-motion';

const StoryReaderPage = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readHistory, setReadHistory] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentPathId, setCurrentPathId] = useState(null);
  
  // Fetch story data
  useEffect(() => {
    // This would be a real API call in a production app
    // For now, we'll use a timeout to simulate loading
    const timeout = setTimeout(() => {
      // Sample story data
      const sampleStory = {
        id: storyId,
        title: 'The Forgotten Gateway',
        author: {
          id: '101',
          name: 'Elena Rodriguez',
          avatar: 'https://i.pravatar.cc/150?img=29'
        },
        coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        tags: ['Fantasy', 'Mystery', 'Adventure'],
        datePublished: '2023-11-15',
        readsCount: 3452,
        likesCount: 187,
        content: '<p>The ancient stone archway stood before you, covered in moss and mysterious symbols that seemed to shift when you weren\'t looking directly at them. The forest around you had grown eerily quiet.</p><p>The letter from your grandfather mentioned this place - a gateway between worlds that had been sealed for centuries. His final wish was for you to find it.</p>',
        paths: [
          {
            id: 1,
            parentId: null,
            label: 'Step through the archway without hesitation',
            content: '<p>You take a deep breath and step through the stone archway. A strange tingling sensation washes over you, like static electricity dancing across your skin.</p><p>The world around you blurs and shifts. When your vision clears, you find yourself standing in what appears to be the same forest, but something is different. The colors are more vibrant, the air sweeter, and in the distance, you can see the spires of a crystal city that definitely wasn\'t there before.</p><p>A small creature resembling a fox with iridescent fur approaches you cautiously.</p>'
          },
          {
            id: 2,
            parentId: null,
            label: 'Examine the symbols more carefully first',
            content: '<p>You approach the archway carefully, studying the mysterious symbols. As you focus on them, they seem to become clearer, arranging themselves into a pattern that almost makes sense.</p><p>You trace one with your finger, and it glows with a soft blue light. Suddenly, all the symbols illuminate in sequence, and a ghostly image appears - a map showing multiple pathways spreading out from the archway to different worlds.</p><p>One destination on the map is marked with what looks like your grandfather\'s signature.</p>'
          },
          {
            id: 3,
            parentId: null,
            label: 'Call out your grandfather\'s name',
            content: '<p>Following a strange intuition, you call out your grandfather\'s name into the silent forest. Your voice echoes strangely, as if traveling much further than it should.</p><p>For a moment, nothing happens. Then, the symbols on the archway begin to rearrange themselves, forming words in a language you somehow understand despite never having seen it before.</p><p>"The path is opened for the bloodline," it reads. The archway begins to shimmer with a soft golden light.</p>'
          },
          {
            id: 4,
            parentId: 1,
            label: 'Try to communicate with the fox-like creature',
            content: '<p>"Hello there," you say gently, crouching down to appear less threatening. The creature tilts its head, its eyes sparkling with intelligence.</p><p>To your astonishment, it responds in your language, its voice melodic and clear despite coming from a fox-like mouth. "A traveler from the old world. We\'ve been expecting you, heir of the Gatekeeper."</p><p>You feel a chill run down your spine. How does this creature know about your connection to this place?</p>'
          },
          {
            id: 5,
            parentId: 1,
            label: 'Look toward the crystal city',
            content: '<p>You shield your eyes from the strange, golden sunlight and focus on the distant crystal city. Its spires seem to be made of some kind of transparent material that catches the light and breaks it into rainbows.</p><p>As you watch, a flying vessel detaches from one of the towers and begins moving in your direction at an alarming speed.</p><p>Within minutes, the ship hovers above you - a sleek, crystalline craft piloted by tall, elegant beings with features almost, but not quite, human.</p>'
          }
        ]
      };
      
      setStory(sampleStory);
      setIsLoading(false);
      
      // Check if the story is bookmarked
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(storyId));
      
      // Load reading history
      const history = JSON.parse(localStorage.getItem(`readHistory_${storyId}`) || '[]');
      setReadHistory(history);
      
      // Set current path (continue from last position if available)
      if (history.length > 0) {
        setCurrentPathId(history[history.length - 1]);
      }
      
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [storyId]);
  
  // Handle choice selection
  const handleChoiceSelected = (pathId) => {
    // Update reading history
    const updatedHistory = [...readHistory, pathId];
    setReadHistory(updatedHistory);
    setCurrentPathId(pathId);
    
    // Save to localStorage
    localStorage.setItem(`readHistory_${storyId}`, JSON.stringify(updatedHistory));
  };
  
  // Toggle bookmark
  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter(id => id !== storyId);
    } else {
      updatedBookmarks = [...bookmarks, storyId];
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(!isBookmarked);
  };
  
  // Share story
  const shareStory = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: `Check out this interactive story: ${story.title}`,
        url: window.location.href,
      })
      .catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback - copy link to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Error copying to clipboard:', err));
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-medium text-gray-600 dark:text-gray-300">Loading your adventure...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Story header */}
      <div className="story-header bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/stories" className="flex items-center text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Stories
            </Link>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleBookmark}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              
              <button 
                onClick={shareStory}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Share story"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{story.title}</h1>
            <div className="flex items-center justify-center mt-3">
              <img 
                src={story.author.avatar} 
                alt={story.author.name} 
                className="w-8 h-8 rounded-full mr-2" 
              />
              <span className="text-white/80">By {story.author.name}</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Story reader */}
      <StoryReader 
        story={story} 
        onChoiceSelected={handleChoiceSelected} 
        initialPathId={currentPathId} 
      />
      
      {/* Reading progress */}
      {readHistory.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">Your Reading Path</h3>
            <div className="flex items-center">
              {readHistory.map((pathId, index) => (
                <div key={pathId} className="flex items-center">
                  {index > 0 && (
                    <div className="h-[2px] w-12 bg-gray-300 dark:bg-gray-600"></div>
                  )}
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentPathId === pathId 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Comments Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8">
        <CommentSection storyId={storyId} />
      </div>
    </div>
  );
};

export default StoryReaderPage; 