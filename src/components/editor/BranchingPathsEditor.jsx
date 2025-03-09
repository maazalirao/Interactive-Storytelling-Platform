import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const BranchingPathsEditor = ({ initialPaths = [], onChange }) => {
  const [paths, setPaths] = useState(initialPaths.length > 0 ? initialPaths : [
    { 
      id: uuidv4(),
      title: 'Start',
      content: 'This is the beginning of your story...',
      choices: [
        { id: uuidv4(), text: 'Continue to path 1', targetId: null },
      ],
    }
  ])
  
  const [selectedPathId, setSelectedPathId] = useState(paths[0]?.id || null)
  
  // Get the currently selected path
  const selectedPath = paths.find(path => path.id === selectedPathId) || paths[0]
  
  // Add a new story path
  const addPath = () => {
    const newId = uuidv4()
    const newPath = {
      id: newId,
      title: `New Path ${paths.length + 1}`,
      content: 'Enter your story content here...',
      choices: [
        { id: uuidv4(), text: 'Continue', targetId: null },
      ],
    }
    
    const updatedPaths = [...paths, newPath]
    setPaths(updatedPaths)
    setSelectedPathId(newId)
    
    if (onChange) onChange(updatedPaths)
  }
  
  // Update a path
  const updatePath = (id, updates) => {
    const updatedPaths = paths.map(path => 
      path.id === id ? { ...path, ...updates } : path
    )
    setPaths(updatedPaths)
    if (onChange) onChange(updatedPaths)
  }
  
  // Delete a path
  const deletePath = (id) => {
    // Don't delete if it's the only path
    if (paths.length <= 1) return
    
    const updatedPaths = paths.filter(path => path.id !== id)
    setPaths(updatedPaths)
    
    // If we're deleting the selected path, select another one
    if (id === selectedPathId) {
      setSelectedPathId(updatedPaths[0]?.id || null)
    }
    
    if (onChange) onChange(updatedPaths)
  }
  
  // Add a choice to a path
  const addChoice = (pathId) => {
    const updatedPaths = paths.map(path => {
      if (path.id === pathId) {
        return {
          ...path,
          choices: [
            ...path.choices,
            { id: uuidv4(), text: 'New Choice', targetId: null },
          ],
        }
      }
      return path
    })
    
    setPaths(updatedPaths)
    if (onChange) onChange(updatedPaths)
  }
  
  // Update a choice
  const updateChoice = (pathId, choiceId, updates) => {
    const updatedPaths = paths.map(path => {
      if (path.id === pathId) {
        return {
          ...path,
          choices: path.choices.map(choice => 
            choice.id === choiceId ? { ...choice, ...updates } : choice
          ),
        }
      }
      return path
    })
    
    setPaths(updatedPaths)
    if (onChange) onChange(updatedPaths)
  }
  
  // Delete a choice
  const deleteChoice = (pathId, choiceId) => {
    // Don't delete if it's the only choice
    const path = paths.find(p => p.id === pathId)
    if (path?.choices.length <= 1) return
    
    const updatedPaths = paths.map(path => {
      if (path.id === pathId) {
        return {
          ...path,
          choices: path.choices.filter(choice => choice.id !== choiceId),
        }
      }
      return path
    })
    
    setPaths(updatedPaths)
    if (onChange) onChange(updatedPaths)
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
        <h2 className="font-semibold text-lg mb-2">Branching Paths Editor</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Create and manage the branching narrative paths for your interactive story.</p>
        
        {/* Path Management Controls */}
        <div className="flex justify-between items-center">
          <div>
            <button 
              onClick={addPath}
              className="btn-primary text-sm"
            >
              Add New Path
            </button>
          </div>
          
          <div className="text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              {paths.length} path{paths.length !== 1 ? 's' : ''} total
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Paths Sidebar */}
        <div className="w-full md:w-1/3 border-r border-gray-300 dark:border-gray-700">
          <div className="p-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
            <h3 className="font-medium text-sm">Story Paths</h3>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
            {paths.map(path => (
              <div 
                key={path.id}
                onClick={() => setSelectedPathId(path.id)}
                className={`p-3 cursor-pointer border-b border-gray-200 dark:border-gray-800 transition-colors duration-150 ${selectedPathId === path.id 
                  ? 'bg-primary-50 dark:bg-primary-900 border-l-4 border-l-primary-500' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium truncate">{path.title}</h4>
                  {paths.length > 1 && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePath(path.id)
                      }}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {path.choices.length} choice{path.choices.length !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Path Editor */}
        <div className="w-full md:w-2/3 p-4">
          {selectedPath ? (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Path Title
                </label>
                <input
                  type="text"
                  value={selectedPath.title}
                  onChange={(e) => updatePath(selectedPath.id, { title: e.target.value })}
                  className="form-input"
                  placeholder="Enter path title"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Path Content
                </label>
                <textarea
                  value={selectedPath.content}
                  onChange={(e) => updatePath(selectedPath.id, { content: e.target.value })}
                  className="form-input min-h-[120px]"
                  placeholder="Enter story content for this path..."
                ></textarea>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Choices
                  </label>
                  <button 
                    onClick={() => addChoice(selectedPath.id)}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    + Add Choice
                  </button>
                </div>
                
                {selectedPath.choices.map(choice => (
                  <div key={choice.id} className="mb-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="w-full mr-2">
                        <input
                          type="text"
                          value={choice.text}
                          onChange={(e) => updateChoice(selectedPath.id, choice.id, { text: e.target.value })}
                          className="form-input mb-2"
                          placeholder="Choice text"
                        />
                        
                        <select
                          value={choice.targetId || ''}
                          onChange={(e) => updateChoice(selectedPath.id, choice.id, { targetId: e.target.value || null })}
                          className="form-input"
                        >
                          <option value="">-- Select target path --</option>
                          {paths.map(path => (
                            <option key={path.id} value={path.id}>
                              {path.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {selectedPath.choices.length > 1 && (
                        <button 
                          onClick={() => deleteChoice(selectedPath.id, choice.id)}
                          className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 mt-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Select a path to edit or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BranchingPathsEditor 