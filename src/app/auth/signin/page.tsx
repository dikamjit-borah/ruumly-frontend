'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Building2 } from 'lucide-react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthError
} from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';

const googleProvider = new GoogleAuthProvider();

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getAuth = () => {
    const firebaseAuth = getFirebaseAuth();
    if (!firebaseAuth) {
      throw new Error('Firebase is not configured. Please check your environment variables.');
    }
    return firebaseAuth;
  };

  const callBackendSignIn = async (idToken: string) => {
    try {
      const response = await fetch('https://ruumly-backend.onrender.com/api/auth/firebase-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Backend authentication failed');
      }

      const data = await response.json();
      const { access_token, owner } = data;

      // Store tokens and user data
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('user', JSON.stringify(owner));
      document.cookie = `auth_token=${access_token}; path=/; max-age=86400`;

      // Update auth context
      setUser(owner);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Backend authentication failed';
      setError(errorMessage);
      console.error('Backend sign in error:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Sign in with Google popup
      const firebaseAuth = getAuth();
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Call backend to verify token and create/fetch user
      await callBackendSignIn(idToken);
    } catch (err) {
      const firebaseError = err as AuthError;
      setError(firebaseError.message || 'Failed to sign in with Google');
      console.error('Google sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const firebaseAuth = getAuth();

      // Sign in with email and password
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const idToken = await result.user.getIdToken();

      // Call backend to verify token and create/fetch user
      await callBackendSignIn(idToken);
    } catch (err) {
      const firebaseError = err as AuthError;
      
      // Handle specific Firebase error codes
      if (firebaseError.code === 'auth/user-not-found') {
        // Try to create a new account
        try {
          const firebaseAuth = getAuth();
          const createResult = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          const idToken = await createResult.user.getIdToken();
          await callBackendSignIn(idToken);
        } catch (createErr) {
          const createError = createErr as AuthError;
          setError(createError.message || 'Failed to create account');
        }
      } else {
        setError(firebaseError.message || 'Failed to sign in');
      }
      console.error('Email sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <Building2 className="text-blue-600 mb-4" size={48} />
            <h1 className="text-3xl font-bold text-gray-900">Ruumly</h1>
            <p className="text-gray-600 mt-2">Property Management System</p>
          </div>

          {/* Sign In Form */}
          <div className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email Sign In */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Input
                type="password"
                placeholder="Password"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>Don&apos;t have an account? <span className="text-blue-600">It will be created automatically on first sign in.</span></p>
            <p className="mt-4 text-xs text-gray-500">
              Sign in with Google or email/password to get started
            </p>
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-lg shadow p-6 text-center text-gray-600">
          <p className="text-sm">
            <strong>Firebase Authentication:</strong> Securely sign in with Google or email to access your property management dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
