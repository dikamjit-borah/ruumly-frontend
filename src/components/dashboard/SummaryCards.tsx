'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { Home, Users, DollarSign, AlertCircle } from 'lucide-react';

interface SummaryCardsProps {
  totalRooms: number;
  occupiedRooms: number;
  totalTenants: number;
  totalMonthlyRevenue: number;
  overduePayments: number;
}

export function SummaryCards({
  totalRooms,
  occupiedRooms,
  totalTenants,
  totalMonthlyRevenue,
  overduePayments,
}: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Rooms',
      value: totalRooms,
      icon: Home,
      color: 'bg-blue-50 text-blue-600',
      description: `${occupiedRooms} occupied`,
    },
    {
      title: 'Active Tenants',
      value: totalTenants,
      icon: Users,
      color: 'bg-green-50 text-green-600',
      description: 'Current residents',
    },
    {
      title: 'Monthly Revenue',
      value: formatCurrency(totalMonthlyRevenue),
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600',
      description: 'From occupied rooms',
    },
    {
      title: 'Overdue Payments',
      value: overduePayments,
      icon: AlertCircle,
      color: `${overduePayments > 0 ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`,
      description: 'Require attention',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-500 mt-2">{card.description}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
