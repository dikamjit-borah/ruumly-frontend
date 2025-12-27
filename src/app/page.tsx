import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Building2, Users, IndianRupee, BarChart3, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FD] to-[#E8F0FE]">
      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-[#E0E7FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="text-[#0F2854]" size={32} />
            <span className="text-2xl font-bold text-gray-900">Ruumly</span>
          </div>
          <Link href="/auth/signin">
            <Button className="bg-[#0F2854] hover:bg-[#0A1F3F] text-white">Sign In</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Manage Your Rental Properties with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ruumly is a comprehensive property management system designed to help you efficiently manage rental properties, tenants, rooms, and rent payments all in one place.
            </p>
            <div className="flex gap-4">
              <Link href="/auth/signin">
                <Button size="lg" className="flex items-center gap-2 bg-[#0F2854] hover:bg-[#0A1F3F] text-white">
                  Get Started
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <button className="px-6 py-3 border-2 border-[#0F2854] rounded-lg font-semibold text-[#0F2854] hover:bg-[#0F2854] hover:text-white transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Content - Features Preview */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border-l-4 border-[#0F2854]">
              <Building2 className="text-[#0F2854] mb-3" size={28} />
              <h3 className="text-lg font-semibold text-gray-900">Property Management</h3>
              <p className="text-gray-600 mt-2">Easily manage multiple properties with all details in one place</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border-l-4 border-[#4285F4]">
              <Users className="text-[#4285F4] mb-3" size={28} />
              <h3 className="text-lg font-semibold text-gray-900">Tenant Management</h3>
              <p className="text-gray-600 mt-2">Track tenants, documents, and additional family members</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border-l-4 border-[#EA4335]">
              <IndianRupee className="text-[#EA4335] mb-3" size={28} />
              <h3 className="text-lg font-semibold text-gray-900">Rent Collection</h3>
              <p className="text-gray-600 mt-2">Track rent payments, pending amounts, and overdue rents</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border-l-4 border-[#FBBC04]">
              <BarChart3 className="text-[#FBBC04] mb-3" size={28} />
              <h3 className="text-lg font-semibold text-gray-900">Analytics & Reports</h3>
              <p className="text-gray-600 mt-2">Get insights into your rental business performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-[#0F2854] to-[#1A3A6F] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Multi-Property Support',
                description: 'Manage unlimited properties with complete information control'
              },
              {
                title: 'Room Management',
                description: 'Track rooms, availability, types, and rental amounts'
              },
              {
                title: 'Tenant Profiles',
                description: 'Complete tenant information including documents and family members'
              },
              {
                title: 'Document Upload',
                description: 'Store important documents like Aadhar, PAN, and office documents'
              },
              {
                title: 'Rent Tracking',
                description: 'Monitor pending, paid, and overdue rent payments'
              },
              {
                title: 'Dashboard Analytics',
                description: 'Real-time overview of properties, rooms, tenants, and revenue'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-[#1A3A6F] bg-opacity-80 backdrop-blur-sm rounded-lg hover:bg-opacity-100 transition border border-[#4285F4] border-opacity-50 hover:border-opacity-100">
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0F2854] to-[#4285F4] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Sign in with your Google account to start managing your properties today
          </p>
          <Link href="/auth/signin">
            <Button 
              size="lg" 
              className="bg-white text-[#0F2854] hover:bg-blue-50 font-semibold"
            >
              Sign In with Google
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F2854] text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Ruumly</h4>
              <p className="text-sm">Property management made simple</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300">Features</a></li>
                <li><a href="#" className="hover:text-blue-300">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-300">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-300">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1A3A6F] pt-8 text-center text-sm space-y-2">
            <p>&copy; 2025 Ruumly. All rights reserved.</p>
            <p>Made with <span className="text-[#EA4335]">❤</span> by <a href="https://backendandbeyond.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">backendandbeyond.com</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
