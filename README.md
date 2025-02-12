# Portfolio Website | Jeongbin Son

## Overview

Welcome to my portfolio website. This project is a showcase of my journey as a web developer exploring different tech stacks for building web applications. It serves as a hub to display projects and additional websites I create, as well as having a working contact form in case you want to get in touch!

---

## Features

### **1. Homepage**
- **Three.js Integration**: The homepage features an interactive spinning galaxy that occasionally shoot stars towards the user.
- **Dynamic Procedural Generation (Work in Progress)**: Exploring procedural generation to dynamically load and unload "chunks" of virtual land based on camera scrolling distance.

### **2. Projects Page**
- **Interactive Tetris Game**: A functional, mobile-friendly Tetris game with a global leaderboard stored in a MongoDB cluster.
- **Gomoku Game**: A game-in-progress featuring multiple modes:
  - Player vs Computer (algorithm-based logic)
  - Player vs AI (deep reinforcement learning in progress)
  - Player vs Player
  - **Current Focus**: Refining the AI mode by implementing better reward systems and parallelizing training for efficient AI learning.

### **3. Websites Page**
- A collection of links to other websites I've built, displayed with interactive card animations. Can click on website cards to show more information about my contributions!

### **4. Contact Form**
- A functional "Contact Us" form to allow visitors to reach out easily.

---

## Tech Stack

### **Frontend**
- **React.js**: Core framework for building the user interface.
- **Next.js**: For server-side rendering and enhanced routing capabilities.
- **Tailwind CSS**: Used for responsive and mobile-friendly design.

### **Backend**
- **Node.js**: Handles server-side logic and API endpoints.
- **Express.js**: Simplifies routing and middleware.

### **Databases**
- **MongoDB**: Stores leaderboard data for the Tetris game.
- **MySQL**: A secondary database for experimenting with structured data.

### **Additional Tools**
- **Three.js**: For rendering and animating 3D galaxy effects.
- **JWT (JSON Web Tokens)**: Authentication for potential user-based features in the future.

---

## Future Plans
- **Expand Procedural Generation**: Dynamically generate landscapes based on camera scrolling and unload distant "chunks" for optimal performance.
- **Enhance Gomoku AI**: Implement a robust reward system and optimize AI training through parallel processing.
- **Mobile Optimization**: Further refine mobile layouts and interactions.
- **Add More Projects**: Continuously update with new projects and experiments.

---

## How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/brian419/PortfolioWebsite.git
   cd PortfolioWebsite
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Access the Website**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contact  
This is a personal project, but I welcome suggestions, feedback, questions, or contributions. Feel free to use my contact form on the Contact page of my website <a href="https://www.jeongbinson.com" target="_blank">jeongbinson.com</a> or email me directly at <a href="mailto:json10@crimson.ua.edu">json10@crimson.ua.edu</a>.

---


### Personal Note for Development
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "backend": "node pages/api/train.js",
    "start": "concurrently \"npm run dev\" \"npm run backend\"",
    "lint": "next lint"
  },

currently removed backend for development as I work on other things besides player vs ai (deep learning).

### To-Do Checklist
1) Adding scroll-based animation to pages.
   a. Homepage: On initial load, the galaxy scene will be smaller. On user-scroll, gradually enlarge the scene until a certain threshold (of how much of the scene is centered) is met. Offer a snap based scroll as well.
   b. Scroll-based images look great I think.

2) Fixing primary, secondary, tertiary color schemes. 

3) Learn how to implement multiple languages, accessibility features (color blind & enlarge text options, etc)

4) Learn how to implement content based management system. Might be crude without using services like sanity.io. 
   a. Login to admin account and offer direct content management.
   b. secure login with jwt & multi factor authentication (through email code or link) with cybersecurity features in mind. 

5) Figure out idea for user based login (like why would they sign up and login)
   a. implement forgot password (like the one we did in capstone project)
   b. have fun with newletter system (automated email with option to turn off) with cybersecurity features in mind. 