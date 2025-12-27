'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const { isAuthenticated, user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  // Hide navbar on landing page and auth pages
  const isPublicPage = pathname === '/' || pathname.startsWith('/auth/');
  
  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  if (isPublicPage) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ruumly</h1>
              <p className="text-xs text-gray-500">Property Management</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                Dashboard
              </Link>
              <Link href="/properties" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                Properties
              </Link>
              <Link href="/rooms" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                Rooms
              </Link>
              <Link href="/tenants" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                Tenants
              </Link>
              <Link href="/rent" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                Rent
              </Link>
            </div>
            
            {isAuthenticated && user && (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
            
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
