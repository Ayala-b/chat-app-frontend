# Chat Application Front-End

This project contains the front-end code for a chat application. It is built with **React** and **Vite**, and connects to a **Firebase-based back-end**.

## Features

- **Authentication Screens:** Includes login/signup screens (`AuthScreen`) and a new client creation screen (`NewClientScreen`).
- **Chat Screen:** The main user interface for displaying and managing chat conversations.
- **Firebase Integration:** Uses Firebase for user authentication and data management (through the back-end).
- **Responsive UI:** Designed to provide a great user experience across different devices.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Vite:** Fast build tool for front-end projects.
- **Firebase:** Used as a BaaS (Backend as a Service) platform for authentication.
- **CSS Modules:** For managing and isolating styles.

## Installation and Local Setup

To run the project on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ayala-b/chat-app-frontend.git
   cd chat-app-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or with Yarn
   # yarn install
   ```

3. **Set environment variables:**
   Create a `.env` file in the root directory of the project. Add the required environment variables for connecting to Firebase and your back-end.

   **Example `.env` file:**
   ```
   # In using Firebase emulators for local development
   VITE_APP_USE_EMULATORS=true

4. **Run the development server:**
   ```bash
   npm run dev
   # or with Yarn
   # yarn dev
   ```
   The app will be available at `http://localhost:5173/` (or another port as specified by Vite).

## Usage

Once the app is running, you can:
1. Sign up or log in using the authentication screens.
2. Create a new client profile.
3. Use the chat screen to send and receive messages (requires an active and connected back-end).
