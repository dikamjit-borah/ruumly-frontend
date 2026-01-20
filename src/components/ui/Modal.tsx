'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, ChevronRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-5xl',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black transition-opacity duration-300',
          isOpen ? 'opacity-40' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        role="presentation"
      />
      
      {/* Modal Container */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={onClose}
      >
        <div
          className={cn(
            'bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden w-full transition-transform duration-300',
            sizes[size],
            isOpen ? 'scale-100' : 'scale-95'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-white rounded-full"></div>
              <h2 id="modal-title" className="text-2xl font-bold text-white">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-blue-700 rounded-full transition-all duration-200 hover:shadow-md"
              aria-label="Close"
            >
              <X size={28} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white via-blue-50 to-white">
            <div className="px-8 py-8">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
