'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PropertySchema, PropertyFormData } from '@/lib/validations';
import { usePropertyStore } from '@/lib/store';
import { useProperties } from '@/hooks/useProperties';
import { Building2, MapPin, DollarSign, FileText } from 'lucide-react';

export function EditPropertyModal() {
  const { showEditPropertyModal, setShowEditPropertyModal, selectedProperty } = usePropertyStore();
  const { updateProperty } = useProperties();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(PropertySchema),
  });

  useEffect(() => {
    if (selectedProperty) {
      reset({
        name: selectedProperty.name,
        address: selectedProperty.address,
        city: selectedProperty.city,
        state: selectedProperty.state,
        pinCode: selectedProperty.pinCode,
        type: selectedProperty.type,
        totalRooms: selectedProperty.totalRooms,
        description: selectedProperty.description,
        phoneNumber: selectedProperty.phoneNumber,
        email: selectedProperty.email,
      });
    }
  }, [selectedProperty, reset]);

  const onSubmit = (data: PropertyFormData) => {
    if (selectedProperty) {
      updateProperty(selectedProperty.id, {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
        type: data.type,
        totalRooms: data.totalRooms,
        description: data.description,
        phoneNumber: data.phoneNumber,
        email: data.email,
      });
      reset();
      setShowEditPropertyModal(false);
    }
  };

  return (
    <Modal
      isOpen={showEditPropertyModal}
      onClose={() => {
        setShowEditPropertyModal(false);
        reset();
      }}
      title="Edit Property"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <Building2 size={24} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Property Name"
              placeholder="e.g., Downtown Apartments"
              {...register('name')}
              error={errors.name?.message}
            />

            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-blue-400 mt-1 flex-shrink-0" />
              <Input
                label="Street Address"
                placeholder="123 Main St"
                {...register('address')}
                error={errors.address?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                placeholder="Delhi"
                {...register('city')}
                error={errors.city?.message}
              />
              <Input
                label="State"
                placeholder="Delhi"
                {...register('state')}
                error={errors.state?.message}
              />
            </div>

            <Input
              label="Pin Code"
              placeholder="110001"
              {...register('pinCode')}
              error={errors.pinCode?.message}
            />
          </div>
        </div>

        {/* Property Details Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign size={24} className="text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">Property Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                {...register('type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <Input
              label="Total Rooms"
              type="number"
              placeholder="5"
              {...register('totalRooms')}
              error={errors.totalRooms?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                placeholder="Add details about the property..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
                {...register('description')}
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Contact Information (Optional)</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Phone Number"
              placeholder="(555) 123-4567"
              {...register('phoneNumber')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="property@example.com"
              {...register('email')}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowEditPropertyModal(false);
              reset();
            }}
            className="px-6"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-6">
            Update Property
          </Button>
        </div>
      </form>
    </Modal>
  );
}
