'use client';

import React, { useState } from 'react';
import { useProperties } from '@/hooks/useProperties';
import { usePropertyStore } from '@/lib/store';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export function PropertyListTable() {
  const { properties, stats, selectProperty, deleteProperty } = useProperties();
  const { setSearchTerm, setShowAddPropertyModal, setShowEditPropertyModal } = usePropertyStore();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleEdit = (propertyId: string) => {
    const property = usePropertyStore.getState().properties.find(p => p.id === propertyId);
    if (property) {
      selectProperty(property);
      setShowEditPropertyModal(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
            <p className="text-sm text-gray-500 mt-1">
              {stats.total} total properties
            </p>
          </div>
          <Button onClick={() => setShowAddPropertyModal(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Add Property
          </Button>
        </div>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            placeholder="Search properties..."
            value={searchInput}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {properties.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>No properties found. Create your first property!</p>
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell isHeader>Name</TableCell>
                <TableCell isHeader>Address</TableCell>
                <TableCell isHeader>Type</TableCell>
                <TableCell isHeader>Total Rooms</TableCell>
                <TableCell isHeader>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.address}, {property.city}</TableCell>
                  <TableCell className="capitalize">{property.type}</TableCell>
                  <TableCell>{property.totalRooms}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Edit property"
                      >
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteProperty(property.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Delete property"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
