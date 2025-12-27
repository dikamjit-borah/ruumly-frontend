'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { usePropertyStore } from '@/lib/store';
import { useTenants } from '@/hooks/useTenants';
import { formatDate } from '@/lib/utils';
import { Upload, Trash2, Plus, X, ArrowLeft } from 'lucide-react';

interface AdditionalMember {
  id: string;
  name: string;
  relation: string;
  phone?: string;
  age?: number;
}

export default function TenantDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const tenantId = params.id as string;
  
  const { tenants } = usePropertyStore();
  const { updateTenant } = useTenants();
  
  const tenant = useMemo(() => tenants.find(t => t.id === tenantId), [tenantId, tenants]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(tenant?.profilePicture);
  const [documents, setDocuments] = useState(tenant?.documents || []);
  const [additionalMembers, setAdditionalMembers] = useState<AdditionalMember[]>(tenant?.additionalMembers || []);
  const [newMember, setNewMember] = useState<Partial<AdditionalMember>>({});

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center">
          <p className="text-gray-500">Loading tenant details...</p>
        </div>
      </div>
    );
  }

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
    updateTenant(tenant.id, {
      profilePicture,
      documents,
      additionalMembers,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{tenant.firstName} {tenant.lastName}</h1>
              <p className="text-gray-500 mt-1">Tenant Details</p>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setProfilePicture(tenant.profilePicture);
                    setDocuments(tenant.documents || []);
                    setAdditionalMembers(tenant.additionalMembers || []);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            )}
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Sidebar with Profile */}
          <div className="col-span-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center">
                {/* Profile Picture */}
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
                  {profilePicture ? (
                    <Image 
                      src={profilePicture} 
                      alt="Profile" 
                      width={160}
                      height={160}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="text-gray-400">No Photo</span>
                  )}
                </div>
                {isEditing && (
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded cursor-pointer hover:bg-blue-100 mb-4 w-full justify-center">
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

                {/* Status Badge */}
                <div className="w-full mt-4 p-3 bg-gray-50 rounded text-center">
                  <p className="text-sm font-medium text-gray-700">Status</p>
                  <p className={`text-lg font-semibold mt-1 ${tenant.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                    {tenant.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1 text-gray-900">{tenant.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1 text-gray-900">{tenant.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{tenant.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-gray-900">{tenant.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Move In Date</label>
                    <p className="mt-1 text-gray-900">{formatDate(tenant.moveInDate)}</p>
                  </div>
                  {tenant.moveOutDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Move Out Date</label>
                      <p className="mt-1 text-gray-900">{formatDate(tenant.moveOutDate)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            {tenant.emergencyContact && (
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900">Emergency Contact</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-gray-900">{tenant.emergencyContact.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-gray-900">{tenant.emergencyContact.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
                  {isEditing && (
                    <div className="flex gap-2">
                      {(['aadhar', 'pan', 'office', 'other'] as const).map(docType => (
                        <label key={docType} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded cursor-pointer hover:bg-blue-100 capitalize">
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
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  {documents.length === 0 ? (
                    <p className="text-gray-500 text-sm">No documents uploaded</p>
                  ) : (
                    documents.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm font-medium capitalize text-gray-900">{doc.type} - {doc.name}</p>
                          <p className="text-xs text-gray-500">Uploaded: {formatDate(doc.uploadedAt)}</p>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveDocument(doc.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Members Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Additional Members</h2>
                  {isEditing && additionalMembers.length < 5 && (
                    <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                      <Plus size={14} />
                      Add Member
                    </button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {isEditing && (
                  <div className="p-4 bg-gray-50 rounded space-y-3 border border-gray-200">
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
                    <div className="grid grid-cols-2 gap-2">
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

                <div className="space-y-3">
                  {additionalMembers.length === 0 ? (
                    <p className="text-gray-500 text-sm">No additional members added</p>
                  ) : (
                    additionalMembers.map(member => (
                      <div key={member.id} className="flex items-start justify-between p-4 bg-gray-50 rounded border border-gray-200">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{member.relation}</p>
                          {member.phone && <p className="text-xs text-gray-500 mt-1">{member.phone}</p>}
                          {member.age && <p className="text-xs text-gray-500">Age: {member.age}</p>}
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600 ml-2"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
