import { useState } from 'react'
import RichTextEditor from '../components/editor/RichTextEditor'
import BranchingPathsEditor from '../components/editor/BranchingPathsEditor'

const CreateStoryPage = () => {
  const [activeTab, setActiveTab] = useState('basic')
  const [story, setStory] = useState({
    title: '',
    coverImage: '',
    excerpt: '',
    tags: [],
    premium: false,
    content: null,
    paths: []
  })
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setStory(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  // Handle tag input
  const [tagInput, setTagInput] = useState('')
  
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!story.tags.includes(tagInput.trim())) {
        setStory(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }))
      }
      setTagInput('')
    }
  }
  
  const removeTag = (tagToRemove) => {
    setStory(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically save the story to your backend
    console.log('Saving story:', story)
    alert('Story saved successfully! (Demo only)')
    // In a real app, you would redirect or show a success message
  }
  
  // Handle rich text editor changes
  const handleContentChange = (content) => {
    setStory(prev => ({ ...prev, content }))
  }
  
  // Handle branching paths changes
  const handlePathsChange = (paths) => {
    setStory(prev => ({ ...prev, paths }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Create Your Interactive Story</h1>
      
      {/* Tabs Navigation */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('basic')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'basic'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Basic Information
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'content'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Story Content
          </button>
          <button
            onClick={() => setActiveTab('branching')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'branching'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Branching Paths
          </button>
          <button
            onClick={() => setActiveTab('publish')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'publish'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Publish
          </button>
        </nav>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-story p-6">
        {/* Basic Information Tab */}
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Story Details</h2>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Story Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={story.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter a captivating title"
                />
              </div>
              
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  name="coverImage"
                  value={story.coverImage}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/your-image.jpg"
                />
                {story.coverImage && (
                  <div className="mt-2 relative w-48 h-32 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                    <img
                      src={story.coverImage}
                      alt="Story cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL'
                      }}
                    />
                  </div>
                )}
              </div>
              
              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Story Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={story.excerpt}
                  onChange={handleChange}
                  rows="3"
                  className="form-input"
                  placeholder="Write a short, enticing description of your story"
                ></textarea>
              </div>
              
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {story.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)} 
                        className="ml-1.5 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                      >
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="form-input py-1 px-2 text-sm"
                    placeholder="Add a tag and press Enter"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Press Enter to add a tag. Tags help readers discover your story.
                </p>
              </div>
              
              {/* Premium Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="premium"
                  name="premium"
                  checked={story.premium}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="premium" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Make this a premium story (subscription required)
                </label>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className="btn-primary"
              >
                Continue to Story Content
              </button>
            </div>
          </div>
        )}
        
        {/* Content Tab */}
        {activeTab === 'content' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Story Content</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Write the main content of your story. You can format text, add images, and create a rich narrative.
            </p>
            
            <RichTextEditor 
              initialValue={story.content}
              onChange={handleContentChange}
            />
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Back to Basic Information
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('branching')}
                className="btn-primary"
              >
                Continue to Branching Paths
              </button>
            </div>
          </div>
        )}
        
        {/* Branching Paths Tab */}
        {activeTab === 'branching' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Branching Narrative Paths</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create the interactive structure of your story with multiple paths and choices.
            </p>
            
            <BranchingPathsEditor 
              initialPaths={story.paths}
              onChange={handlePathsChange}
            />
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Back to Story Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('publish')}
                className="btn-primary"
              >
                Continue to Publish
              </button>
            </div>
          </div>
        )}
        
        {/* Publish Tab */}
        {activeTab === 'publish' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Publish Your Story</h2>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-6">
              <h3 className="font-medium text-lg mb-2 text-gray-900 dark:text-white">{story.title || 'Untitled Story'}</h3>
              
              {story.coverImage && (
                <img 
                  src={story.coverImage} 
                  alt="Story cover" 
                  className="h-32 rounded-md object-cover mb-3"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL'
                  }}
                />
              )}
              
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                {story.excerpt || 'No excerpt provided.'}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {story.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
                {story.tags.length === 0 && (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">No tags added.</span>
                )}
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {story.premium ? (
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium">Premium Story</span>
                ) : (
                  <span>Free Story</span>
                )}
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Basic information {story.title && story.excerpt ? 'completed' : 'incomplete'}
                </span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Story content {story.content ? 'completed' : 'incomplete'}
                </span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  Branching paths {story.paths.length > 0 ? 'completed' : 'incomplete'}
                </span>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('branching')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Back to Branching Paths
              </button>
              
              <div className="space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn-primary"
                >
                  Publish Story
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateStoryPage 