# Personal Finance Tracker

A modern, responsive Personal Finance Tracker built with React and Firebase. Track your income, expenses, budgets, and visualize your spending trends. Supports both authenticated and guest users.

## Features
- User authentication (Sign Up, Login, Guest mode)
- Add, edit, and delete transactions
- Set and update monthly budget
- Visualize spending trends with charts
- Data persistence with Firebase Firestore for authenticated users
- In-memory data for guest users (no account required)
- Responsive, clean UI with modern CSS
- Robust error handling and helpful messages

## Demo
<img width="1918" height="893" alt="login page" src="https://github.com/user-attachments/assets/84298ef7-572c-49d5-912a-5020b9f11d72" />
<img width="1918" height="896" alt="signup page" src="https://github.com/user-attachments/assets/262524dc-2ade-4021-b618-719d7c6cbe2b" />
<img width="1918" height="897" alt="dashboard page 1" src="https://github.com/user-attachments/assets/3c2cb482-e91b-4005-8bda-eea7b8235c8f" />
<img width="1918" height="897" alt="dashboard page 2" src="https://github.com/user-attachments/assets/5ca4e184-59ab-4738-9580-5d7e88c729cb" />
<img width="1918" height="897" alt="dashboard page 3" src="https://github.com/user-attachments/assets/4b41dd06-190f-472e-99cd-950c7f25670f" />
<img width="1918" height="896" alt="dashboard page 4" src="https://github.com/user-attachments/assets/eb5bafed-1938-48ba-a0d5-52cf04de30fe" />
<img width="1918" height="895" alt="dashboard page 5" src="https://github.com/user-attachments/assets/10213b16-b53c-4d96-9ca7-5167a12e990b" />

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/megha5401/Finance_Tracker.git
   cd Finance_Tracker
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Firebase Setup:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password) in the Firebase console.
   - Create a **Firestore Database** (in test mode for development).
   - In the Firebase console, go to Project Settings > General > Your apps, and add a new web app. Copy the Firebase config.
   - Create a file at `src/firebaseConfig.js` and paste your config:
     ```js
     import { initializeApp } from "firebase/app";
     import { getAuth } from "firebase/auth";
     import { getFirestore } from "firebase/firestore";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const db = getFirestore(app);
     ```
   - **Set Firestore Security Rules:**
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
         // Allow guest mode (in-memory, no Firestore access)
       }
     }
     ```
   - If you see a Firestore index error, follow the link in the error message to create the required index.

4. **Start the app:**
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000) by default.

## Usage
- **Sign Up** for a new account or **Login** if you already have one.
- Or, click **Continue as Guest** to try the app without an account (data will not persist).
- Add your transactions, set your budget, and view your spending trends.

## Customization
- Update styles in `src/index.css` for a different look.
- Modify components in `src/components/` as needed.

## Troubleshooting
- **Blank screen?** Make sure you have a valid `src/firebaseConfig.js` file and have installed all dependencies.
- **Firebase errors?** Check your Firestore rules and ensure Email/Password authentication is enabled.
- **Index errors?** Create the required Firestore index as prompted in the error message.

## Live Demo
[View the app on GitHub Pages](https://megha5401.github.io/Finance_Tracker/)

## License
MIT
