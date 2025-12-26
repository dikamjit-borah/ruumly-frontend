'use client';

import React from 'react';
import { getStatusColor } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
