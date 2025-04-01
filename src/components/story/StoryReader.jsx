import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextToSpeech from './TextToSpeech';

const StoryReader = ({ story, onChoiceSelected, initialPathId = null, fontSizeClass = 'text-base' }) => {
  const [currentSegment, setCurrentSegment] = useState(initialPathId || 0);
  const [choices, setChoices] = useState([]);
  const [isRevealing, setIsRevealing] = useState(true);
  const [ambientSound, setAmbientSound] = useState(null);
  const [themeColor, setThemeColor] = useState('#3b82f6'); // Default blue
  const [pathsExplored, setPathsExplored] = useState(() => {
    // Load from localStorage
    return JSON.parse(localStorage.getItem(`explored_paths_${story?.id}`) || '[]');
  });
  const [selectedChoice, setSelectedChoice] = useState(null);
  const audioRef = useRef(null);
  
  // Parse the story content and set the initial segment
  useEffect(() => {
    if (story?.content && story.paths) {
      // If initialPathId is provided, use it, otherwise use the first segment
      if (initialPathId) {
        setCurrentSegment(initialPathId);
        // Set choices based on the current path
        setChoices(story.paths.filter(path => path.parentId === initialPathId));
      } else {
        // Initialize with the first segment
        setChoices(story.paths.filter(path => path.parentId === null));
      }
    }
    
    // Set appropriate theme color based on story genre/tags
    if (story?.tags) {
      if (story.tags.includes('Horror')) {
        setThemeColor('#dc2626'); // Red for horror
        setAmbientSound('/sounds/horror-ambient.mp3');
      } else if (story.tags.includes('Fantasy')) {
        setThemeColor('#8b5cf6'); // Purple for fantasy
        setAmbientSound('/sounds/fantasy-ambient.mp3');
      } else if (story.tags.includes('Sci-Fi')) {
        setThemeColor('#2dd4bf'); // Teal for sci-fi
        setAmbientSound('/sounds/scifi-ambient.mp3');
      }
    }
    
    // Set revealing to false after initial load
    setTimeout(() => {
      setIsRevealing(false);
    }, 500);
  }, [story, initialPathId]);

  // Add keyboard navigation for choices
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Number keys 1-9 for selecting choices
      if (e.key >= '1' && e.key <= '9') {
        const choiceIndex = parseInt(e.key) - 1;
        if (choices[choiceIndex]) {
          handleChoiceClick(choices[choiceIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [choices]);

  // Play ambient sound
  useEffect(() => {
    if (ambientSound && audioRef.current) {
      audioRef.current.volume = 0.2; // Low volume
      audioRef.current.loop = true;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [ambientSound]);

  // Calculate story completion percentage
  const calculateCompletion = () => {
    if (!story?.paths) return 0;
    return Math.round((pathsExplored.length / story.paths.length) * 100);
  };

  // Handle selecting a choice
  const handleChoiceClick = (choiceId) => {
    setIsRevealing(true);
    setSelectedChoice(choiceId);
    
    // Find the next segment based on the choice
    const nextSegment = story.paths.find(path => path.id === choiceId);
    
    if (nextSegment) {
      // Small delay for transition effect
      setTimeout(() => {
        setCurrentSegment(nextSegment.id);
        setChoices(story.paths.filter(path => path.parentId === nextSegment.id));
        setIsRevealing(false);
        setSelectedChoice(null);
        
        // Track explored paths
        if (!pathsExplored.includes(nextSegment.id)) {
          const updatedPaths = [...pathsExplored, nextSegment.id];
          setPathsExplored(updatedPaths);
          localStorage.setItem(`explored_paths_${story?.id}`, JSON.stringify(updatedPaths));
        }
        
        // Notify parent component
        if (onChoiceSelected) {
          onChoiceSelected(nextSegment.id);
        }
      }, 600);
    }
  };

  // Toggle sound
  const toggleSound = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Get current content
  const getCurrentContent = () => {
    if (!story?.content) return '';
    
    const segment = story.paths.find(p => p.id === currentSegment);
    return segment ? segment.content : story.content;
  };

  return (
    <div className="story-reader relative" style={{ 
      background: `linear-gradient(to bottom, ${themeColor}10, ${themeColor}30)`,
      minHeight: '80vh' 
    }}>
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0)_1px,_rgba(255,255,255,0.05)_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-10 animate-pulse" 
             style={{ background: themeColor, filter: 'blur(40px)' }}></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full opacity-10 animate-pulse" 
             style={{ background: themeColor, filter: 'blur(60px)', animationDelay: '1s' }}></div>
      </div>
      
      {/* Audio element for ambient sound */}
      {ambientSound && (
        <>
          <audio ref={audioRef} src={ambientSound} />
          <button 
            onClick={toggleSound}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors z-10"
            aria-label="Toggle ambient sound"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
        </>
      )}
      
      {/* Story completion indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-full p-2 text-white flex items-center">
          <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.25278V19.2528M12 6.25278C10.8321 6.25278 9.75704 5.79246 8.96127 4.9967C8.16551 4.20094 7.70518 3.12584 7.70518 1.95797H16.2948C16.2948 3.12584 15.8345 4.20094 15.0387 4.9967C14.243 5.79246 13.1679 6.25278 12 6.25278ZM12 19.2528C13.1679 19.2528 14.243 19.7131 15.0387 20.5089C15.8345 21.3046 16.2948 22.3797 16.2948 23.5476H7.70518C7.70518 22.3797 8.16551 21.3046 8.96127 20.5089C9.75704 19.7131 10.8321 19.2528 12 19.2528Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.6 12C20.6 16.7496 16.7496 20.6 12 20.6C7.25035 20.6 3.39999 16.7496 3.39999 12C3.39999 7.25035 7.25035 3.39999 12 3.39999C16.7496 3.39999 20.6 7.25035 20.6 12Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M17.657 12C17.657 15.1675 15.1675 17.657 12 17.657C8.83249 17.657 6.34299 15.1675 6.34299 12C6.34299 8.83249 8.83249 6.34299 12 6.34299C15.1675 6.34299 17.657 8.83249 17.657 12Z" fill="currentColor" fillOpacity="0.3"/>
          </svg>
          <span className="text-xs font-medium">{calculateCompletion()}% explored</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Story content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSegment}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8"
            >
              <div 
                className={`prose dark:prose-invert max-w-none ${fontSizeClass}`}
                dangerouslySetInnerHTML={{ __html: getCurrentContent() }}
              ></div>
              
              {/* Text to Speech Controls */}
              <div className="mt-6">
                <TextToSpeech content={getCurrentContent()} />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Choices */}
          {choices.length > 0 && (
            <div className="choices-container space-y-4 max-w-3xl mx-auto">
              <h3 className="text-xl font-medium text-center mb-4 text-white dark:text-gray-200">What will you do?</h3>
              {choices.map((choice, index) => (
                <motion.div
                  key={choice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <button
                    onClick={() => handleChoiceClick(choice.id)}
                    className={`w-full text-left p-4 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200 border-l-4 ${selectedChoice === choice.id ? 'border-l-8 bg-white dark:bg-gray-700' : ''}`}
                    style={{ borderColor: themeColor }}
                    aria-keyshortcuts={index < 9 ? `${index + 1}` : undefined}
                    disabled={selectedChoice !== null}
                  >
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{choice.label}</p>
                      {pathsExplored.includes(choice.id) && (
                        <span className="ml-auto bg-gray-200 dark:bg-gray-700 text-xs rounded-full px-2 py-1">
                          Visited
                        </span>
                      )}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryReader; 