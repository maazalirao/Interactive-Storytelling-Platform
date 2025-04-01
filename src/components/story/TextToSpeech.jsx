import { useState, useEffect, useRef } from 'react';

const TextToSpeech = ({ content, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentRate, setCurrentRate] = useState(() => {
    return parseFloat(localStorage.getItem('tts_rate') || '1.0');
  });
  const [currentVoice, setCurrentVoice] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeWord, setActiveWord] = useState(-1);
  const utteranceRef = useRef(null);
  
  // Clean HTML content to get just text
  const getCleanText = (htmlContent) => {
    // Create a temporary element to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;
    return temp.textContent || temp.innerText || '';
  };
  
  // Initialize speech synthesis and get available voices
  useEffect(() => {
    const synth = window.speechSynthesis;
    
    // Function to get and set available voices
    const loadVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        
        // Try to load saved voice preference
        const savedVoiceName = localStorage.getItem('tts_voice');
        let selectedVoice;
        
        if (savedVoiceName) {
          selectedVoice = voices.find(voice => voice.name === savedVoiceName);
        }
        
        // If no saved voice or saved voice not found, use default English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => 
            voice.lang.includes('en') && voice.name.includes('Female')
          ) || voices[0];
        }
        
        setCurrentVoice(selectedVoice);
      }
    };
    
    // Load voices - Chrome may load voices asynchronously
    loadVoices();
    
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    
    // Clean up on unmount
    return () => {
      stopSpeech();
    };
  }, []);
  
  // Auto play when requested
  useEffect(() => {
    if (autoPlay && content && currentVoice && !isPlaying) {
      playSpeech();
    }
  }, [autoPlay, content, currentVoice, isPlaying]);
  
  // Create and play speech
  const playSpeech = () => {
    if (!content || !currentVoice) return;
    
    const synth = window.speechSynthesis;
    setIsLoading(true);
    
    // Cancel any ongoing speech
    stopSpeech();
    
    // Create a new utterance
    const text = getCleanText(content);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = currentVoice;
    utterance.rate = currentRate;
    utterance.pitch = 1.0;
    
    // Word boundary detection
    const words = text.split(/\s+/);
    let wordIndex = 0;
    
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setActiveWord(wordIndex);
        wordIndex++;
      }
    };
    
    // Set event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setIsLoading(false);
      setActiveWord(0);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWord(-1);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
      setIsLoading(false);
      setActiveWord(-1);
    };
    
    // Store reference to current utterance
    utteranceRef.current = utterance;
    
    // Start speaking
    synth.speak(utterance);
  };
  
  // Pause speech
  const pauseSpeech = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };
  
  // Resume speech
  const resumeSpeech = () => {
    const synth = window.speechSynthesis;
    synth.resume();
    setIsPaused(false);
  };
  
  // Stop speech
  const stopSpeech = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setIsLoading(false);
    setActiveWord(-1);
  };
  
  // Change voice
  const handleVoiceChange = (e) => {
    const voiceName = e.target.value;
    const selectedVoice = availableVoices.find(voice => voice.name === voiceName);
    if (selectedVoice) {
      setCurrentVoice(selectedVoice);
      
      // Save preference to localStorage
      localStorage.setItem('tts_voice', selectedVoice.name);
      
      // If already playing, restart with new voice
      if (isPlaying) {
        stopSpeech();
        setTimeout(() => playSpeech(), 100); // Small delay to ensure stop completes
      }
    }
  };
  
  // Change speech rate
  const handleRateChange = (newRate) => {
    setCurrentRate(parseFloat(newRate));
    
    // Save preference to localStorage
    localStorage.setItem('tts_rate', newRate.toString());
    
    // If already playing, restart with new rate
    if (isPlaying) {
      stopSpeech();
      setTimeout(() => playSpeech(), 100);
    }
  };
  
  return (
    <div className="text-to-speech-controls bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          Audio Narration
          {isPlaying && !isPaused && (
            <span className="ml-2 flex items-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </span>
          )}
        </h3>
        
        {/* Voice selection dropdown */}
        <select 
          value={currentVoice?.name || ''}
          onChange={handleVoiceChange}
          className="text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
          disabled={isPlaying}
        >
          {availableVoices.map(voice => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
          {availableVoices.length === 0 && (
            <option value="">Loading voices...</option>
          )}
        </select>
      </div>
      
      {/* Play/Pause/Stop controls */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {!isPlaying || isPaused ? (
            <button
              onClick={isPaused ? resumeSpeech : playSpeech}
              disabled={isLoading || !content || availableVoices.length === 0}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isPaused ? "Resume speech" : "Play speech"}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ) : (
            <button
              onClick={pauseSpeech}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              aria-label="Pause speech"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          {(isPlaying || isPaused) && (
            <button
              onClick={stopSpeech}
              className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full"
              aria-label="Stop speech"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Rate controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleRateChange(Math.max(0.5, currentRate - 0.25))}
            disabled={currentRate <= 0.5}
            className="text-xs p-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
          >
            -
          </button>
          <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
            {currentRate}x
          </span>
          <button
            onClick={() => handleRateChange(Math.min(2.0, currentRate + 0.25))}
            disabled={currentRate >= 2.0}
            className="text-xs p-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech; 