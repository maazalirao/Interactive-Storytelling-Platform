import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextToSpeech from './TextToSpeech';

const StoryReader = ({ story, onChoiceSelected, initialPathId = null }) => {
  const [currentSegment, setCurrentSegment] = useState(initialPathId || 0);
  const [choices, setChoices] = useState([]);
  const [isRevealing, setIsRevealing] = useState(true);
  const [ambientSound, setAmbientSound] = useState(null);
  const [themeColor, setThemeColor] = useState('#3b82f6'); // Default blue
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

  // Handle selecting a choice
  const handleChoiceClick = (choiceId) => {
    setIsRevealing(true);
    
    // Find the next segment based on the choice
    const nextSegment = story.paths.find(path => path.id === choiceId);
    
    if (nextSegment) {
      // Small delay for transition effect
      setTimeout(() => {
        setCurrentSegment(nextSegment.id);
        setChoices(story.paths.filter(path => path.parentId === nextSegment.id));
        setIsRevealing(false);
        
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
                className="prose dark:prose-invert max-w-none" 
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
                    className="w-full text-left p-4 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200 border-l-4"
                    style={{ borderColor: themeColor }}
                  >
                    <p className="font-medium text-gray-800 dark:text-gray-200">{choice.label}</p>
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