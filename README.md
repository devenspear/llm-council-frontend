# Deven's LLM Council

A multi-model AI deliberation system that brings together multiple Large Language Models for collaborative decision-making and enhanced responses.

## Features

- **Multi-Stage AI Deliberation**: Three-stage process for comprehensive AI responses
  - Stage 1: Initial responses from multiple LLM models
  - Stage 2: Cross-model critique and analysis
  - Stage 3: Final synthesis and refined output
- **Model Selection**: Choose from multiple OpenRouter-supported LLMs
- **Conversation Management**: Save and organize multiple conversation threads
- **Credits Tracking**: Real-time display of OpenRouter API credits
- **Dark Mode**: System-wide dark/light theme toggle
- **iOS Mobile Optimized**: Fully responsive with native-like experience on iOS devices

## iOS Mobile Optimizations

This app is specifically optimized for iOS mobile devices with:

- **Safe Area Support**: Proper handling of notches, Dynamic Island, and home indicators
- **Touch-Optimized UI**: All buttons meet Apple's 44x44pt minimum touch target
- **Responsive Sidebar**: Hamburger menu with slide-out drawer navigation
- **iOS Safari Fixes**: Proper viewport height handling (no address bar issues)
- **Smooth Scrolling**: Momentum scrolling throughout the app
- **No Zoom on Input**: Prevents unwanted zooming when focusing input fields
- **Tactile Feedback**: Visual feedback on all touch interactions
- **PWA Ready**: Install as a web app on your iOS home screen

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Markdown Rendering**: react-markdown
- **Styling**: Custom CSS with CSS variables for theming
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- OpenRouter API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/devenspear/llm-council-frontend.git
cd llm-council-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Login**: Enter your OpenRouter API key to authenticate
2. **Select Models**: Choose which LLM models to participate in the council
3. **Start Conversation**: Type your question or prompt
4. **View Deliberation**: Watch as models respond, critique, and synthesize
5. **Manage Conversations**: Save and switch between different conversation threads

## Architecture

The app uses a three-stage deliberation process:

1. **Initial Response (Stage 1)**: Selected models independently respond to the user's prompt
2. **Critique (Stage 2)**: Models analyze and critique each other's responses
3. **Synthesis (Stage 3)**: A final model synthesizes all inputs into a comprehensive answer

## Mobile Usage

For the best mobile experience on iOS:

1. Open Safari and navigate to the app
2. Tap the Share button
3. Select "Add to Home Screen"
4. Launch from your home screen for a native app experience

## Configuration

The app connects to a backend API (not included in this repository) that handles:
- OpenRouter API integration
- Conversation persistence
- Credit tracking
- Model orchestration

Ensure your backend is configured and accessible at the appropriate endpoint.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vite.dev/)
- LLM access powered by [OpenRouter](https://openrouter.ai/)
- Icons: Unicode emoji characters
