import { useState, useCallback, useMemo } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { FaBold, FaItalic, FaUnderline, FaHeading, FaQuoteRight, FaListUl, FaListOl, FaImage } from 'react-icons/fa'

const RichTextEditor = ({ initialValue, onChange }) => {
  // Initialize the editor
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  
  // Define the initial value for the editor
  const [value, setValue] = useState(initialValue || [
    {
      type: 'paragraph',
      children: [{ text: 'Start writing your interactive story here...' }],
    },
  ])

  // Define custom rendering for elements (paragraphs, lists, etc.)
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'heading-one':
        return <h1 {...props.attributes} className="text-4xl font-bold my-4">{props.children}</h1>
      case 'heading-two':
        return <h2 {...props.attributes} className="text-3xl font-bold my-3">{props.children}</h2>
      case 'heading-three':
        return <h3 {...props.attributes} className="text-2xl font-bold my-2">{props.children}</h3>
      case 'block-quote':
        return <blockquote {...props.attributes} className="border-l-4 border-gray-300 pl-4 italic my-4">{props.children}</blockquote>
      case 'bulleted-list':
        return <ul {...props.attributes} className="list-disc ml-6 my-4">{props.children}</ul>
      case 'numbered-list':
        return <ol {...props.attributes} className="list-decimal ml-6 my-4">{props.children}</ol>
      case 'list-item':
        return <li {...props.attributes}>{props.children}</li>
      case 'image':
        return (
          <div {...props.attributes} className="my-4">
            <div contentEditable={false} className="relative">
              <img 
                src={props.element.url} 
                alt={props.element.alt || ''} 
                className="max-w-full rounded-md"
              />
            </div>
            {props.children}
          </div>
        )
      default:
        return <p {...props.attributes} className="my-2">{props.children}</p>
    }
  }, [])

  // Define custom rendering for text (bold, italic, etc.)
  const renderLeaf = useCallback(props => {
    let { children, attributes } = props

    if (props.leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (props.leaf.italic) {
      children = <em>{children}</em>
    }

    if (props.leaf.underline) {
      children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
  }, [])

  // Handle toolbar button clicks
  const toggleMark = (format) => {
    const isActive = isMarkActive(editor, format)
    
    if (isActive) {
      editor.removeMark(format)
    } else {
      editor.addMark(format, true)
    }
  }

  // Check if a mark is active
  const isMarkActive = (editor, format) => {
    const marks = editor.getMarks()
    return marks ? marks[format] === true : false
  }

  // Apply a block format
  const toggleBlock = (format) => {
    // Implementation details would go here
    // This is a simplified version
    const isActive = false // You'd need to implement isBlockActive
    const isList = ['numbered-list', 'bulleted-list'].includes(format)
    
    // Toggle logic would go here
    // This is a placeholder for the actual implementation
    console.log(`Toggling ${format} block: ${isActive ? 'off' : 'on'}, isList: ${isList}`)
  }

  // Insert an image
  const insertImage = () => {
    const url = window.prompt('Enter the URL of the image:')
    if (!url) return
    
    // Insert an image node at the current selection
    editor.insertNode({
      type: 'image',
      url,
      alt: '',
      children: [{ text: '' }],
    })
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-300 dark:border-gray-700">
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mr-1"
          title="Bold"
          onMouseDown={(e) => {
            e.preventDefault()
            toggleMark('bold')
          }}
        >
          <FaBold className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mr-1"
          title="Italic"
          onMouseDown={(e) => {
            e.preventDefault()
            toggleMark('italic')
          }}
        >
          <FaItalic className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mr-1"
          title="Underline"
          onMouseDown={(e) => {
            e.preventDefault()
            toggleMark('underline')
          }}
        >
          <FaUnderline className="w-4 h-4" />
        </button>
        <span className="border-r border-gray-300 dark:border-gray-700 h-6 mx-2"></span>
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mr-1"
          title="Heading"
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock('heading-one')
          }}
        >
          <FaHeading className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mr-1"
          title="Quote"
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock('block-quote')
          }}
        >
          <FaQuoteRight className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mr-1"
          title="Bulleted List"
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock('bulleted-list')
          }}
        >
          <FaListUl className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mr-1"
          title="Numbered List"
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock('numbered-list')
          }}
        >
          <FaListOl className="w-4 h-4" />
        </button>
        <span className="border-r border-gray-300 dark:border-gray-700 h-6 mx-2"></span>
        <button
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 mr-1"
          title="Insert Image"
          onMouseDown={(e) => {
            e.preventDefault()
            insertImage()
          }}
        >
          <FaImage className="w-4 h-4" />
        </button>
      </div>
      
      {/* Editor */}
      <div className="p-4 min-h-[300px]">
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
            if (onChange) onChange(newValue)
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Start writing your story..."
            spellCheck
            autoFocus
            className="min-h-[250px] focus:outline-none"
          />
        </Slate>
      </div>
    </div>
  )
}

export default RichTextEditor 