# Wordle Game - Backend (PHP) & Frontend (React)

A Wordle game built with a PHP backend and a React frontend. The game features word validation through an API, input validation alerts, animations, and a secure session-based mechanism to hide the solution from the user.

## 🚀 Features

- **Word Validation**: Words are validated using an external API to check if they exist and meet the correct length.
- **Input Alerts**: Alerts notify the user of invalid inputs such as incorrect word length or non-dictionary words.
- **Win/Loss Feedback**: A modal displays a message when the user wins or loses the game.
- **Session-Based Security**: The solution is stored securely in the user's session to prevent them from knowing the correct answer.
- **Animations**: Smooth animations for user interactions, including word guessing and feedback.

## 🛠 Technologies Used

- **PHP**: Backend framework for handling game logic and API integration.
- **React**: Frontend library for building the user interface and managing state.
- **Session Management**: To store the solution securely on the backend.

## 📌 Getting Started

### Prerequisites

- PHP (v7.4 or later)
- Node.js (v14 or later)
- npm or yarn

### 🔧 Installation & Setup

#### 1. **Clone the Repository**

```bash
git clone https://github.com/maker-dev/wordle-game.git
cd wordle-game
```

### **2. Set up the Backend (php)**  
```bash
cd api

composer install

# Create a .env file and configure the environment variables
cp .env.example .env //
```

### **3. Set up the Frontend (React.js)**  
```bash
cd ui

npm install

# Create a .env file and configure the environment variables
cp .env.example .env //

npm run dev
```
