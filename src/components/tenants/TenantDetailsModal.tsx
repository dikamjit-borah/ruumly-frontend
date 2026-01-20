'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { usePropertyStore } from '@/lib/store';
import { useTenants } from '@/hooks/useTenants';
import { formatDate } from '@/lib/utils';
import { Upload, Trash2, Plus, X } from 'lucide-react';

interface AdditionalMember {
  id: string;
  name: string;
  relation: string;
  phone?: string;
  age?: number;
}

export function TenantDetailsModal() {
  const { selectedTenant, setSelectedTenant } = usePropertyStore();
  const { updateTenant } = useTenants();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(selectedTenant?.profilePicture);
  const [documents, setDocuments] = useState(selectedTenant?.documents || []);
  const [additionalMembers, setAdditionalMembers] = useState<AdditionalMember[]>(selectedTenant?.additionalMembers || []);
  const [newMember, setNewMember] = useState<Partial<AdditionalMember>>({});

  if (!selectedTenant) return null;

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: 'aadhar' | 'pan' | 'office' | 'other') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newDoc = {
          id: Math.random().toString(36).substr(2, 9),
          type: docType,
          name: file.name,
          url: event.target?.result as string,
          uploadedAt: new Date(),
        };
        setDocuments([...documents, newDoc]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.relation) {
      setAdditionalMembers([
        ...additionalMembers,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: newMember.name,
          relation: newMember.relation,
          phone: newMember.phone,
          age: newMember.age,
        }
      ]);
      setNewMember({});
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setAdditionalMembers(additionalMembers.filter(m => m.id !== memberId));
  };

  const handleSave = () => {
    updateTenant(selectedTenant.id, {
      profilePicture,
      documents,
      additionalMembers,
    });
    setIsEditing(false);
  };

  const handleClose = () => {
    setSelectedTenant(null);
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={!!selectedTenant}
      onClose={handleClose}
      title={`${selectedTenant.firstName} ${selectedTenant.lastName}`}
    >
      <div className="space-y-6 max-w-4xl">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-40 h-40 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden shadow-md">
            {profilePicture ? (
              <Image 
                src={profilePicture} 
                alt="Profile" 
                width={160}
                height={160}
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-gray-400 text-center">No Photo</span>
            )}
          </div>
          {isEditing && (
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
              <Upload size={18} />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Basic Details */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">First Name</label>
              <p className="mt-2 text-gray-900 font-medium">{selectedTenant.firstName}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Last Name</label>
              <p className="mt-2 text-gray-900 font-medium">{selectedTenant.lastName}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Email</label>
              <p className="mt-2 text-gray-900">{selectedTenant.email}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Phone</label>
              <p className="mt-2 text-gray-900">{selectedTenant.phone}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Move In</label>
              <p className="mt-2 text-gray-900">{formatDate(selectedTenant.moveInDate)}</p>
            </div>
            {selectedTenant.moveOutDate && (
              <div>
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Move Out</label>
                <p className="mt-2 text-gray-900">{formatDate(selectedTenant.moveOutDate)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contact */}
        {selectedTenant.emergencyContact && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Name</label>
                <p className="mt-2 text-gray-900 font-medium">{selectedTenant.emergencyContact.name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wide">Phone</label>
                <p className="mt-2 text-gray-900">{selectedTenant.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        )}

        {/* Documents Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Documents</h3>
            {isEditing && (
              <div className="flex gap-2 flex-wrap">
                {(['aadhar', 'pan', 'office', 'other'] as const).map(docType => (
                  <label key={docType} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors capitalize">
                    <Upload size={14} />
                    {docType}
                    <input
                      type="file"
                      onChange={(e) => handleDocumentUpload(e, docType)}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            {documents.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">No documents uploaded</p>
            ) : (
              documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <p className="text-sm font-medium capitalize text-gray-900">{doc.type} - {doc.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Uploaded: {formatDate(doc.uploadedAt)}</p>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveDocument(doc.id)}
                      className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Additional Members Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Additional Members</h3>
            {isEditing && additionalMembers.length < 5 && (
              <button
                onClick={() => {}}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus size={14} />
                Add Member
              </button>
            )}
          </div>

          {isEditing && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg space-y-3 border border-blue-200">
              <Input
                placeholder="Member Name"
                value={newMember.name || ''}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
              <Input
                placeholder="Relation (e.g., Spouse, Child)"
                value={newMember.relation || ''}
                onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Phone (optional)"
                  value={newMember.phone || ''}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                />
                <Input
                  placeholder="Age (optional)"
                  type="number"
                  value={newMember.age || ''}
                  onChange={(e) => setNewMember({ ...newMember, age: e.target.value ? parseInt(e.target.value) : undefined })}
                />
              </div>
              <Button
                onClick={handleAddMember}
                className="w-full"
                disabled={!newMember.name || !newMember.relation}
              >
                Add Member
              </Button>
            </div>
          )}

          <div className="space-y-2">
            {additionalMembers.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">No additional members added</p>
            ) : (
              additionalMembers.map(member => (
                <div key={member.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.relation}</p>
                    {member.phone && <p className="text-xs text-gray-500 mt-1">{member.phone}</p>}
                    {member.age && <p className="text-xs text-gray-500">Age: {member.age}</p>}
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors ml-2"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-6 border-t border-gray-200 mt-6 sticky bottom-0 bg-white pb-6">
        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setIsEditing(false);
              setProfilePicture(selectedTenant.profilePicture);
              setDocuments(selectedTenant.documents || []);
              setAdditionalMembers(selectedTenant.additionalMembers || []);
            }}
            className="px-6"
          >
            Cancel
          </Button>
        )}
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            className="px-6"
          >
            Edit Details
          </Button>
        )}
        {isEditing && (
          <Button 
            onClick={handleSave}
            className="px-6"
          >
            Save Changes
          </Button>
        )}
        <Button
          type="button"
          variant="secondary"
          onClick={handleClose}
          className="px-6"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
