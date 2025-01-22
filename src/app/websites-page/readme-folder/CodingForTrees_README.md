# Code for Trees 🌳

## Project Overview
Code for Trees is a platform designed to gamify coding challenges while encouraging contributions to environmental causes. By engaging in coding activities, users earn points that translate into theoretical tree planting, combining skill-building with environmental impact.

---

## Features

### User Interaction
- **Scrollable Feeds**
  - Feed of coding challenges, with notifications for new challenges (toggleable in settings).
  - Feed of user-submitted challenges with hashtags for easy categorization (e.g., `#codefortrees`, `#code`).
- **User Profiles**
  - Users can follow accounts and interact with their posts.
  - Registration and login system with enhanced security features.
    - Includes rate limiting for account creation and abuse prevention (IP/email checks).
- **Gamification**
  - Users submit answers to coding challenges and earn points based on accuracy and edge case coverage.
  - Points contribute to individual scores, which translate to theoretical tree planting.

### Post and Comment System
- Posts and comments can be liked, replied to, and bookmarked for future reference.
- Bookmarks are accessible in a dedicated user tab.

### Search and Navigation
- **Search Functionality**
  - Indexing across pages and keywords for quick navigation.
- **Dynamic Homepage**
  - Logged-out users see a static feed without interaction capabilities.
  - Logged-in users gain full interactivity.

### Accessibility and Customization
- Multi-language support.
- Dark mode and light mode options.

### Cybersecurity Features
- JWT-based authentication with secure cookie sessions.
- Prevention of known exploits such as plus-addressing abuse.

### Additional Features
- Footer with links to GitHub, LinkedIn, and a dedicated email for support: `codefortrees@outlook.com`.
- Admin content management system for easy platform moderation.

---

## Tech Stack

### Frontend
- **React.js**: For building interactive user interfaces.
- **Next.js**: For server-side rendering and routing.
- **Tailwind CSS**: For responsive and modern design.

### Backend
- **Node.js**: For scalable backend logic.
- **Express.js**: For handling API routes.
- **Python**: For advanced computations and future AI/ML integrations.

### Database
- **MySQL**: For relational data (user profiles, challenges, and comments).
- **MongoDB (Future Expansion)**: For unstructured data like posts and hashtags.

### Additional Tools
- **Three.js**: For 3D visualizations and interactive components.
- **JWT**: For secure authentication.
- **Unit Testing Frameworks**: Jest for frontend testing and Pytest for backend testing.

---

## Future Plans
- Integrate NoSQL options like CouchDB or PouchDB.
- Develop an AI-driven coding assistant to evaluate user-submitted code.
- Expand gamification features with leaderboards and community challenges.

---

## Author
**Jeongbin (Brian) Son**  
Email: [json10@crimson.ua.edu](mailto:json10@crimson.ua.edu)

---

## License
[MIT License](LICENSE)

---
