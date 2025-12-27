/**
 * Custom hook for managing properties
 */

import { useCallback, useMemo } from 'react';
import { usePropertyStore } from '@/lib/store';
import { Property } from '@/lib/types';
import { searchFilter } from '@/lib/utils';

export function useProperties() {
  const {
    properties,
    searchTerm,
    addProperty,
    updateProperty,
    deleteProperty,
    setSelectedProperty,
  } = usePropertyStore();

  const filteredProperties = useMemo(() => {
    return searchFilter<Property>(properties, searchTerm, ['name', 'city', 'address']);
  }, [properties, searchTerm]);

  const stats = useMemo(() => {
    return {
      total: properties.length,
      byType: {
        apartment: properties.filter(p => p.type === 'apartment').length,
        house: properties.filter(p => p.type === 'house').length,
        condo: properties.filter(p => p.type === 'condo').length,
        commercial: properties.filter(p => p.type === 'commercial').length,
      },
    };
  }, [properties]);

  const handleAddProperty = useCallback(
    (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
      addProperty(property);
    },
    [addProperty]
  );

  const handleUpdateProperty = useCallback(
    (id: string, updates: Partial<Property>) => {
      updateProperty(id, updates);
    },
    [updateProperty]
  );

  const handleDeleteProperty = useCallback(
    (id: string) => {
      deleteProperty(id);
      setSelectedProperty(null);
    },
    [deleteProperty, setSelectedProperty]
  );

  const handleSelectProperty = useCallback(
    (property: Property) => {
      setSelectedProperty(property);
    },
    [setSelectedProperty]
  );

  return {
    properties: filteredProperties,
    allProperties: properties,
    stats,
    addProperty: handleAddProperty,
    updateProperty: handleUpdateProperty,
    deleteProperty: handleDeleteProperty,
    selectProperty: handleSelectProperty,
  };
}
