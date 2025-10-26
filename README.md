# React Developer Challenge

A comprehensive challenge system designed to test senior React developers' skills through practical coding challenges. Candidates must find and fix bugs, optimize code, and solve problems to capture hidden flags within a 45-minute time limit.

## 🎯 Overview

This challenge system evaluates senior React developers through practical coding exercises. Candidates find and fix bugs to capture flags, providing a hands-on assessment of their React expertise.

### 📊 Statistics

- **Total Challenges**: 27
- **Levels**: 5 (Progressive difficulty)
- **Target Time**: 45 minutes
- **Technologies**: React 18, Jest, React Testing Library
- **Test Coverage**: Full test suite included

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern browser (Chrome/Firefox recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mirzaaghazadeh/React-Developer-Challenge
cd React-Developer-Challenge
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Run tests**
```bash
npm test
```

5. **Access the challenge**
```
http://localhost:3000
```

---

## 📋 Challenge Structure

### Level 1: React Basics & Component Logic (5 challenges)
- useState Hook Bug Fix
- Event Handler Issues
- Conditional Rendering Bug
- Props Destructuring Fix
- Key Prop Missing

### Level 2: React Hooks & Side Effects (6 challenges)
- useEffect Dependency Array Bug
- Infinite Loop Fix
- Custom Hook Implementation
- useCallback Missing Dependency
- Memory Leak Prevention
- useRef Usage

### Level 3: State Management & Context (5 challenges)
- Context Provider Bug
- State Update Batching Issue
- Reducer Logic Error
- Context Performance Problem
- Complex State Updates

### Level 4: Performance Optimization (6 challenges)
- useMemo Misuse
- React.memo Implementation
- Large List Rendering
- Event Handler Optimization
- Code Splitting Bug
- Debouncing Search Input

### Level 5: Advanced React Patterns (6 challenges)
- Compound Components Pattern
- Render Props Bug
- Higher-Order Component Issue
- Portal Implementation
- Error Boundary Fix
- Custom Hooks Composition

---

## 🎮 How to Complete Challenges

### For Candidates

1. **Start the Challenge**: Navigate to `http://localhost:3000`
2. **Choose a Level**: Start with Level 1, then progress to higher levels
3. **Solve Challenges**: 
   - Read the problem description
   - Analyze the broken code
   - Identify and fix the issues
   - Run tests to verify your solution
4. **Find Flags**: Flags are hidden in console outputs, component renders, test outputs, and success messages
5. **Submit Flags**: Use the flag submission form to verify your solutions

### Tips for Success
- ✅ Use browser DevTools console
- ✅ Check React DevTools for component state
- ✅ Read code comments for hints
- ✅ Run tests to verify solutions: `npm test`
- ✅ Start with Level 1 (easier) and progress up
- ✅ Each flag format: `FLAG_X_NAME_HASH`

---

## 🔍 Flag System

- Each challenge has a unique encrypted flag
- Flags are revealed when challenges are solved correctly
- Format: `FLAG_X_CHALLENGENAME_XXXXXXXX`
- X represents the level (1, 2, 3, 4, or 5)
- XXXXXXXX is a unique hash

---

## 📁 Project Structure

```
React-Developer-Challenge/
├── src/
│   ├── challenges/
│   │   ├── level1/           # React Basics
│   │   ├── level2/           # React Hooks
│   │   ├── level3/           # State Management
│   │   ├── level4/           # Performance
│   │   └── level5/           # Advanced Patterns
│   ├── components/
│   │   ├── ChallengeLayout/  # Challenge wrapper
│   │   ├── FlagSubmission/   # Flag input UI
│   │   └── Progress/         # Progress tracking
│   ├── utils/
│   │   └── flagService.js    # Flag validation
│   ├── App.js                # Main application
│   └── index.js              # Entry point
├── tests/
│   ├── level1.test.js
│   ├── level2.test.js
│   ├── level3.test.js
│   └── setupTests.js
├── package.json
├── README.md
└── SOLUTIONS.md              # 🔒 Keep private!
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- level1.test.js

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 🚨 Troubleshooting

### Common Issues

1. **Installation Errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Port Already in Use**
```bash
# Use a different port
PORT=3001 npm start
```

3. **Test Failures**
```bash
npm test -- --clearCache
npm test
```

### Evaluation Criteria

#### 🏆 Flag-based Scoring

- **27/27 (100%)**: Expert level 🏆
- **21-26 (80-99%)**: Senior level ⭐
- **16-20 (60-79%)**: Mid-Senior level ✨
- **11-15 (40-59%)**: Mid level 📚
- **<11 (<40%)**: Junior level 🌱

#### ⏱️ Time-based Scoring

- **<45 min**: Outstanding ⚡
- **45-60 min**: Excellent ✅
- **60-90 min**: Good 👍
- **90-120 min**: Satisfactory 📝
- **>120 min**: Needs improvement 📖

#### 💎 Code Quality Factors

- Clean, readable fixes: +bonus points
- Proper React patterns: +bonus points
- Comments explaining fixes: +bonus points
- Test coverage: +bonus points

---

## 📚 Topics Covered

### React Fundamentals
- ✅ Component lifecycle
- ✅ Props and state
- ✅ Event handling
- ✅ Conditional rendering
- ✅ Lists and keys

### React Hooks
- ✅ useState
- ✅ useEffect
- ✅ useCallback
- ✅ useMemo
- ✅ useRef
- ✅ useContext
- ✅ useReducer
- ✅ Custom hooks

### State Management
- - ✅ Context API
- - ✅ Reducers
- - ✅ Complex state
- - ✅ State immutability
- - ✅ Performance optimization

### Advanced Concepts
- - ✅ Error boundaries
- - ✅ Portals
- - ✅ HOCs
- - ✅ Render props
- - ✅ Compound components
- - ✅ Code splitting
- - ✅ Lazy loading

### Performance
- ✅ Memoization
- ✅ React.memo
- ✅ Virtualization concepts
- ✅ Debouncing
- ✅ Event optimization

---

## 🎨 Features

### For Candidates
- ✅ Beautiful, modern UI with gradient design
- ✅ Progressive difficulty levels
- ✅ Real-time flag validation
- ✅ Progress tracking system
- ✅ Challenge completion indicators
- ✅ Hints in code comments
- ✅ Browser console hints
- ✅ Responsive design

### For Interviewers
- ✅ Complete solutions guide (SOLUTIONS.md)
- ✅ Evaluation criteria
- ✅ Time-based scoring
- ✅ Comprehensive test suite
- ✅ Easy to customize
- ✅ Detailed setup instructions

---

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Build for production
npm run build

# Lint code
npm run lint

# Fix lint issues
npm run lint:fix
```


---

## 👨‍💼 For Interviewers & Administrators

### Initial Setup

1. **Test the application yourself**
   - Complete all challenges to understand the experience
   - Review SOLUTIONS.md thoroughly
   - Familiarize yourself with expected bugs and fixes

2. **Prepare the environment**
   - Ensure Node.js 18+ is installed
   - Test that npm install works
   - Verify the app starts correctly

3. **Create candidate materials**
   - Create a clean copy of the repository
   - Remove SOLUTIONS.md from candidate version
   - Prepare instruction template


---

## 📄 License

This project is licensed under the MIT License.

---

**Good luck with the challenges!** 🚀

