# Interactive Storytelling Platform

An immersive web application for creating, sharing, and experiencing interactive stories with branching narratives.

## Features

### For Readers
- **Immersive Reading Experience**: Dynamic backgrounds, animations, and ambient sounds that adapt to the story genre
- **Choice-Based Progression**: Make decisions that affect the story outcome
- **Text-to-Speech Narration**: Listen to stories with customizable voice options
- **Reading History**: Track your path through stories and continue where you left off
- **Bookmarking**: Save your favorite stories for later
- **Social Sharing**: Share stories with friends
- **Comments & Discussion**: Engage with other readers through comments and replies
- **Achievement System**: Earn achievements and track your reading stats

### For Writers
- **Rich Text Editor**: Create beautiful, formatted story content
- **Branching Paths Editor**: Design complex narrative structures with multiple paths
- **Story Analytics**: Track how readers interact with your stories
- **Community Feedback**: Get comments and ratings from readers

## Technology Stack

- **Frontend**: React, React Router
- **UI**: Tailwind CSS, Framer Motion for animations
- **State Management**: React Hooks and Context API
- **Storage**: Local Storage (demo), would use a backend database in production

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/interactive-storytelling-platform.git
cd interactive-storytelling-platform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `/src/components`: Reusable UI components
  - `/layout`: Layout components like Header and Footer
  - `/story`: Story-related components like StoryCard, StoryReader, etc.
  - `/user`: User-related components like UserProfile, AchievementSystem, etc.
  - `/editor`: Story creation and editing components
- `/src/pages`: Page components
- `/src/assets`: Static assets like images
- `/src/utils`: Utility functions
- `/src/hooks`: Custom React hooks
- `/src/context`: React Context providers

## Future Enhancements

- Backend integration with user authentication
- Mobile app version
- Collaborative story creation
- AI-assisted story generation
- Advanced analytics for writers
- Monetization options for premium stories

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All the amazing open-source libraries that made this project possible
- The creative writing community for inspiration

## Recent Updates
- Added contribution tracking fixes
- Updated documentation
- Enhanced user experience
