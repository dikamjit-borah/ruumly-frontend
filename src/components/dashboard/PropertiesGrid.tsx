'use client';

import React from 'react';
import { Building2, Users, DoorOpen, Phone, Mail } from 'lucide-react';
import { Property } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePropertyStore } from '@/lib/store';

interface PropertiesGridProps {
  properties: Property[];
}

export function PropertiesGrid({ properties }: PropertiesGridProps) {
  const { setSelectedPropertyId, setShowAddRoomModal } = usePropertyStore();

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Building2 size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">No properties yet. Create one to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map(property => (
        <Card key={property.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{property.name}</h3>
                <p className="text-sm text-gray-600">
                  {property.address}, {property.city}
                </p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                {property.type}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DoorOpen size={16} />
                <span>{property.totalRooms} rooms</span>
              </div>
              {property.phoneNumber && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>{property.phoneNumber}</span>
                </div>
              )}
              {property.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} />
                  <span className="truncate">{property.email}</span>
                </div>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedPropertyId(property.id);
                setShowAddRoomModal(true);
              }}
              className="w-full"
            >
              Add Room
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
