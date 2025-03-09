import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommentSection = ({ storyId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [commentBeingRepliedTo, setCommentBeingRepliedTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  // Load comments (simulated data)
  useEffect(() => {
    // For demo purposes, use localStorage with sample data initially
    const savedComments = localStorage.getItem(`story_${storyId}_comments`);
    
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Sample initial comments
      const sampleComments = [
        {
          id: '1',
          text: 'I love how this story lets you choose your own path! The fantasy elements are really creative.',
          author: {
            id: '201',
            name: 'Alex Chen',
            avatar: 'https://i.pravatar.cc/150?img=33'
          },
          timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
          likes: 12,
          replies: [
            {
              id: '101',
              text: 'Totally agree! The world-building is incredible.',
              author: {
                id: '202',
                name: 'Maria Johnson',
                avatar: 'https://i.pravatar.cc/150?img=47'
              },
              timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
              likes: 3
            }
          ]
        },
        {
          id: '2',
          text: 'The twist at the crystal city path really caught me by surprise. Didn\'t see that coming!',
          author: {
            id: '203',
            name: 'Jamal Williams',
            avatar: 'https://i.pravatar.cc/150?img=54'
          },
          timestamp: new Date(Date.now() - 3600000 * 10).toISOString(), // 10 hours ago
          likes: 7,
          replies: []
        }
      ];
      
      setComments(sampleComments);
      localStorage.setItem(`story_${storyId}_comments`, JSON.stringify(sampleComments));
    }
  }, [storyId]);
  
  // Handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newCommentObj = {
        id: Date.now().toString(),
        text: newComment,
        author: {
          id: 'current-user', // In a real app, this would be the logged-in user's ID
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=5' // Placeholder avatar
        },
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: []
      };
      
      const updatedComments = [newCommentObj, ...comments];
      setComments(updatedComments);
      localStorage.setItem(`story_${storyId}_comments`, JSON.stringify(updatedComments));
      
      setNewComment('');
      setIsLoading(false);
    }, 500);
  };
  
  // Handle reply submission
  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    
    if (!replyText.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newReply = {
        id: Date.now().toString(),
        text: replyText,
        author: {
          id: 'current-user', // In a real app, this would be the logged-in user's ID
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?img=5' // Placeholder avatar
        },
        timestamp: new Date().toISOString(),
        likes: 0
      };
      
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
      localStorage.setItem(`story_${storyId}_comments`, JSON.stringify(updatedComments));
      
      setReplyText('');
      setCommentBeingRepliedTo(null);
      setIsLoading(false);
    }, 500);
  };
  
  // Handle liking a comment
  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      // Handle liking a reply
      const updatedComments = comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return { ...reply, likes: reply.likes + 1 };
              }
              return reply;
            })
          };
        }
        return comment;
      });
      
      setComments(updatedComments);
      localStorage.setItem(`story_${storyId}_comments`, JSON.stringify(updatedComments));
    } else {
      // Handle liking a top-level comment
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      });
      
      setComments(updatedComments);
      localStorage.setItem(`story_${storyId}_comments`, JSON.stringify(updatedComments));
    }
  };
  
  // Format date to relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffSec < 60) {
      return 'just now';
    } else if (diffMin < 60) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffDay < 30) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="comments-section py-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Discussion
        <span className="ml-2 text-gray-500 dark:text-gray-400 text-lg">({comments.length})</span>
      </h2>
      
      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-8">
        <div className="flex gap-3">
          <img 
            src="https://i.pravatar.cc/150?img=5" 
            alt="Your avatar" 
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this story..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none min-h-[100px]"
              disabled={isLoading}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                disabled={!newComment.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </>
                ) : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Comments List */}
      <div className="space-y-6">
        <AnimatePresence>
          {comments.map(comment => (
            <motion.div 
              key={comment.id} 
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-3">
                <img 
                  src={comment.author.avatar} 
                  alt={comment.author.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">{comment.author.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 mb-3">{comment.text}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <button 
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>{comment.likes}</span>
                    </button>
                    
                    <button 
                      onClick={() => setCommentBeingRepliedTo(commentBeingRepliedTo === comment.id ? null : comment.id)}
                      className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      <span>Reply</span>
                    </button>
                  </div>
                  
                  {/* Reply Form */}
                  <AnimatePresence>
                    {commentBeingRepliedTo === comment.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                      >
                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`Reply to ${comment.author.name}...`}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none min-h-[80px]"
                            disabled={isLoading}
                          ></textarea>
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              type="button"
                              className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium"
                              onClick={() => setCommentBeingRepliedTo(null)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium disabled:opacity-50"
                              disabled={!replyText.trim() || isLoading}
                            >
                              {isLoading ? 'Posting...' : 'Reply'}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4 ml-2">
                      {comment.replies.map(reply => (
                        <motion.div 
                          key={reply.id} 
                          className="flex gap-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={reply.author.avatar} 
                            alt={reply.author.name} 
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 dark:text-white">{reply.author.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(reply.timestamp)}</span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 text-sm mb-1">{reply.text}</p>
                            <button 
                              onClick={() => handleLikeComment(reply.id, true, comment.id)}
                              className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs mt-1"
                            >
                              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {comments.length === 0 && (
          <div className="text-center py-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection; 