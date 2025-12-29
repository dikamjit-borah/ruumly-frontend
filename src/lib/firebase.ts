'use client';

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

function initializeFirebase() {
  // Only initialize on client side
  if (typeof window === 'undefined') {
    return null;
  }

  // Return existing instance if already initialized
  if (app) return app;

  // Check if all required env variables are present
  if (
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    !process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ) {
    console.error('Missing Firebase configuration. Please set environment variables.');
    return null;
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication
    auth = getAuth(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }

  return app;
}

export function getFirebaseApp(): FirebaseApp | null {
  return app || initializeFirebase();
}

export function getFirebaseAuth(): Auth | null {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      auth = getAuth(firebaseApp);
    }
  }
  return auth;
}

// Lazy getters for backwards compatibility
export const getApp = getFirebaseApp;
export const getAuthInstance = getFirebaseAuth;
