/**
 * Firebase authentication utilities
 * Helper functions for common auth operations
 */

import { getFirebaseAuth } from './firebase';
import { 
  sendPasswordResetEmail, 
  updateProfile, 
  User as FirebaseUser,
  updateEmail,
  AuthError
} from 'firebase/auth';

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  try {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase not initialized');
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to send password reset email');
  }
}

/**
 * Update user profile in Firebase
 */
export async function updateUserProfile(
  user: FirebaseUser,
  displayName?: string,
  photoURL?: string
): Promise<void> {
  try {
    await updateProfile(user, {
      displayName: displayName || user.displayName || undefined,
      photoURL: photoURL || user.photoURL || undefined,
    });
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to update profile');
  }
}

/**
 * Update user email in Firebase
 */
export async function updateUserEmail(
  user: FirebaseUser,
  newEmail: string
): Promise<void> {
  try {
    await updateEmail(user, newEmail);
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to update email');
  }
}

/**
 * Get current user's ID token
 */
export async function getIdToken(user: FirebaseUser): Promise<string> {
  try {
    return await user.getIdToken();
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to get ID token');
  }
}

/**
 * Refresh user's ID token
 */
export async function refreshIdToken(user: FirebaseUser): Promise<string> {
  try {
    await user.reload();
    return await user.getIdToken();
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to refresh ID token');
  }
}

/**
 * Check if user email is verified
 */
export function isEmailVerified(user: FirebaseUser): boolean {
  return user.emailVerified;
}

/**
 * Get user's claims/custom properties
 */
export async function getUserClaims(
  user: FirebaseUser
): Promise<Record<string, any>> {
  try {
    const idTokenResult = await user.getIdTokenResult();
    return idTokenResult.claims;
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to get user claims');
  }
}

/**
 * Parse Firebase auth error code to user-friendly message
 */
export function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'Account not found. Please check your email or create a new account.',
    'auth/wrong-password': 'The password is incorrect.',
    'auth/email-already-in-use': 'This email is already in use.',
    'auth/weak-password': 'The password must be at least 6 characters long.',
    'auth/operation-not-allowed': 'This operation is not allowed.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/invalid-credential': 'Invalid credentials. Please try again.',
    'auth/popup-closed-by-user': 'The sign-in popup was closed.',
    'auth/popup-blocked': 'The sign-in popup was blocked by your browser.',
    'auth/account-exists-with-different-credential': 'This email is associated with a different sign-in method.',
  };

  return errorMessages[errorCode] || 'An authentication error occurred. Please try again.';
}
