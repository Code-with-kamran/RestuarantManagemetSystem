"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Upload, ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input'; // Assuming these are custom components that use CSS variables
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select'; // Assuming this is a custom Select component

import Image from 'next/image';

interface Experience {
  title: string;
  company: string;
  years: number;
}

// Define the StaffMember interface to resolve type errors
interface StaffMember {
  id: string;
  name: string; // Full name, derived
  firstName: string;
  lastName: string;
  email: string;
  contactInfo: string;
  jobTitle: string;
  department: string;
  manager: string;
  location: string;
  dateJoined: string;
  address: string;
  city: string;
  state: string;
  isActive: boolean;
  profileImage: string; // Base64 string or URL for display
  avatar: string; // Could be a smaller version or initial, derived from profileImage
  experience: Experience[];
  skills: string[];
}

const AddStaffPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<StaffMember>({
    id: `S${Date.now()}`,
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    contactInfo: '',
    jobTitle: '',
    department: '',
    manager: '',
    location: '',
    dateJoined: '',
    address: '',
    city: '',
    state: '',
    isActive: true, // Default to active
    profileImage: '',
    avatar: '',
    experience: [],
    skills: [],
  });

  const [newSkill, setNewSkill] = useState<string>('');
  const [newExperience, setNewExperience] = useState<Experience>({ title: '', company: '', years: 0 });

  // State for image upload
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  // Update formData.name and avatar when firstName, lastName, or profileImage changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: `${prev.firstName} ${prev.lastName}`.trim(),
      // If avatar is meant to be a smaller version or derived, you might process profileImage here
      // For now, assuming avatar is the same as profileImage for simplicity
      avatar: prev.profileImage,
    }));
  }, [formData.firstName, formData.lastName, formData.profileImage]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | number) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.years > 0) {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, newExperience],
      }));
      setNewExperience({ title: '', company: '', years: 0 }); // Reset new experience fields
    } else {
      console.log("Please fill all new experience fields (title, company, years)."); // Changed from console.warn
    }
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleSkillsChange = (index: number, value: string) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill(''); // Reset new skill input
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Handle image file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, profileImage: reader.result as string })); // Set profileImage for form data
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImageFile(null);
      setProfileImagePreview(null);
      setFormData(prev => ({ ...prev, profileImage: '', avatar: '' })); // Clear image URL and avatar from form data
    }
  };

  // Handle removing the selected image
  const handleRemoveImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview(null);
    setFormData(prev => ({ ...prev, profileImage: '', avatar: '' })); // Clear image URL and avatar from form data
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = new FormData();
    // Append all form data fields
    Object.entries(formData).forEach(([key, value]) => {
      // Exclude profileImage as we're appending the file directly, and avatar as it's derived
      if (['profileImage', 'avatar'].includes(key)) {
        return;
      }
      if (['experience', 'skills'].includes(key)) { // Removed 'education' as it's not in the interface/form
        dataToSubmit.append(key, JSON.stringify(value));
      } else {
        dataToSubmit.append(key, String(value));
      }
    });

    // Append the image file if selected
    if (profileImageFile) {
      dataToSubmit.append('profileImageFile', profileImageFile); // Use a distinct key for the file
    }

    console.log("Submitting Form Data:");
    for (const pair of dataToSubmit.entries()) {
      console.log(pair[0]+ ': ' + pair[1]);
    }

    // In a real application, you would send this dataToSubmit to your backend API
    // const response = await fetch('/api/staff', {
    //   method: 'POST',
    //   body: dataToSubmit, // No 'Content-Type' header needed for FormData
    // });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      console.log('Staff added/updated successfully (simulated):', formData);
      // Replace alert with a custom message box or toast notification
      // alert('Staff member saved successfully!');
      console.log('Staff member saved successfully!'); // Placeholder for custom message box
      router.push('/staff'); // Navigate back to the staff list page
    } catch (error) {
      console.error('Failed to save staff member:', error);
      // Replace alert with a custom message box or toast notification
      // alert('Failed to save staff member.');
      console.log('Failed to save staff member.'); // Placeholder for custom message box
    }
  };

  const handleGoBack = () => {
    router.push('/staff'); // Navigate back to the staff list page
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] p-4 md:p-6 overflow-y-auto custom-scrollbar"
      style={{
        backgroundColor: 'var(--color-background, #f8f8f8)', // Default light gray
        color: 'var(--color-foreground, #333333)', // Default dark text
      }}
    >
      <div className="max-w-6xl mx-auto w-full"> {/* Increased max-width for better layout */}
        {/* Header with Go Back button and Page Title */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={handleGoBack} className="flex items-center space-x-2 border"
            style={{
              backgroundColor: 'var(--color-button-secondary, #e0e0e0)',
              color: 'var(--color-button-secondary-foreground, #333333)',
              borderColor: 'var(--color-border, #cccccc)',
              '--hover-bg': 'var(--color-button-secondary-hover, #d0d0d0)',
            } as React.CSSProperties}
          >
            <ChevronLeft size={18} />
            <span>Go Back</span>
          </Button>
          <h1 className="text-2xl font-bold"
            style={{ color: 'var(--color-foreground, #333333)' }}
          >
            Add New Staff Member
          </h1>
          <div>{/* Placeholder for alignment if needed */}</div>
        </div>

        {/* Main content area: Image Upload on left, Form on right */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Profile Image Section - Mimicking inspiration image */}
          <div className="flex-none w-full lg:w-1/3 rounded-lg shadow-md p-6 border flex flex-col items-center justify-start text-center min-h-[250px]"
            style={{
              backgroundColor: 'var(--color-card-background, #ffffff)',
              borderColor: 'var(--color-border, #cccccc)',
            }}
          >
            <h3 className="text-lg font-semibold mb-4 w-full text-left"
              style={{ color: 'var(--color-foreground, #333333)' }}
            >
              Profile Image
            </h3>
            <div className="relative w-40 h-40 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer group transition-colors"
              style={{
                borderColor: 'var(--color-border, #cccccc)',
                backgroundColor: 'var(--color-muted-background, #f0f0f0)',
                '--hover-border': 'var(--blue-primary, #3b82f6)', // Assuming --blue-primary is defined
              } as React.CSSProperties}
            >
              {profileImagePreview ? (
                <Image src={profileImagePreview} width={100} height={100} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center"
                  style={{ color: 'var(--color-muted-foreground, #888888)' }}
                >
                  <Upload size={48} className="mb-2" />
                  <span className="text-base font-medium">Upload</span>
                </div>
              )}
              <input
                type="file"
                id="profile-image-upload"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-xs mt-2"
              style={{ color: 'var(--color-muted-foreground, #888888)' }}
            >
              Max File Size: 5MB
            </p>
            <p className="text-xs"
              style={{ color: 'var(--color-muted-foreground, #888888)' }}
            >
              Aspect ratio should be 1:1
            </p>
            {profileImagePreview && (
              <Button type="button" onClick={handleRemoveImage} className="mt-4"
                style={{
                  color: 'var(--color-destructive-foreground, #ef4444)',
                  '--hover-text': 'var(--color-destructive-hover, #b91c1c)',
                } as React.CSSProperties}
              >
                <Trash2 size={16} className="mr-1" /> Remove Image
              </Button>
            )}
          </div>

          {/* Personal Information Form Section - Main Form Area */}
          <form onSubmit={handleSubmit} className="flex-1 space-y-6 rounded-lg shadow-md p-6 border"
            style={{
              backgroundColor: 'var(--color-card-background, #ffffff)',
              borderColor: 'var(--color-border, #cccccc)',
            }}
          >
            <h2 className="text-xl font-bold mb-4"
              style={{ color: 'var(--color-foreground, #333333)' }}
            >
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="contactInfo">Phone Number</Label>
                <Input id="contactInfo" name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="jobTitle">Designation</Label>
                <Select id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required>
                  <option value="">Select Designation</option>
                  <option value="Manager">Manager</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Chef">Chef</option>
                  <option value="Waiter">Waiter</option>
                  <option value="HR">HR</option>
                  <option value="Accountant">Accountant</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" name="department" value={formData.department} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="manager">Manager</Label>
                <Input id="manager" name="manager" value={formData.manager} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="dateJoined">Date Joined</Label>
                <Input id="dateJoined" name="dateJoined" type="date" value={formData.dateJoined} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded focus:ring-2"
                  style={{
                    color: 'var(--blue-primary, #3b82f6)', // Default blue
                    borderColor: 'var(--color-border, #cccccc)',
                    backgroundColor: 'var(--color-card-background, #ffffff)',
                    '--tw-ring-color': 'var(--blue-primary-light, #60a5fa)', // Default light blue for ring
                  } as React.CSSProperties}
                />
                <Label htmlFor="isActive">Active Employee</Label>
              </div>
            </div>

            {/* Experience Section */}
            <div className="p-4 rounded-lg border"
              style={{
                backgroundColor: 'var(--color-muted-background, #f0f0f0)',
                borderColor: 'var(--color-border, #cccccc)',
              }}
            >
              <h3 className="text-md font-semibold mb-3"
                style={{ color: 'var(--color-foreground, #333333)' }}
              >
                Experience
              </h3>
              {formData.experience.length === 0 && <p className="text-sm mb-3"
                style={{ color: 'var(--color-muted-foreground, #888888)' }}
              >
                No experience added yet.
              </p>}
              {formData.experience.map((exp, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-2 mb-2 p-2 rounded-md border"
                  style={{
                    backgroundColor: 'var(--color-card-background, #ffffff)',
                    borderColor: 'var(--color-border, #cccccc)',
                  }}
                >
                  <Input
                    type="text"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Years"
                    value={exp.years}
                    onChange={(e) => handleExperienceChange(index, 'years', parseInt(e.target.value) || 0)}
                    className="w-20"
                  />
                  <Button type="button" onClick={() => removeExperience(index)}
                    style={{
                      color: 'var(--color-destructive-foreground, #ef4444)',
                      '--hover-bg': 'var(--color-destructive-background-hover, #fee2e2)',
                      '--hover-text': 'var(--color-destructive-hover, #b91c1c)',
                    } as React.CSSProperties}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
              <div className="flex flex-col md:flex-row items-center gap-2 mt-3">
                <Input
                  type="text"
                  placeholder="New Job Title"
                  value={newExperience.title}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
                  className="flex-1"
                />
                <Input
                  type="text"
                  placeholder="New Company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Years"
                  value={newExperience.years}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, years: parseInt(e.target.value) || 0 }))}
                  className="w-20"
                />
                <Button type="button" onClick={addExperience} className="flex items-center"
                  style={{
                    backgroundColor: 'var(--blue-primary, #3b82f6)',
                    color: 'var(--color-white, #ffffff)',
                    '--hover-bg': 'var(--blue-hover, #2563eb)',
                  } as React.CSSProperties}
                >
                  <Plus size={18} className="mr-1" /> Add
                </Button>
              </div>
            </div>

            {/* Skills Section */}
            <div className="p-4 rounded-lg border"
              style={{
                backgroundColor: 'var(--color-muted-background, #f0f0f0)',
                borderColor: 'var(--color-border, #cccccc)',
              }}
            >
              <h3 className="text-md font-semibold mb-3"
                style={{ color: 'var(--color-foreground, #333333)' }}
              >
                Skills
              </h3>
              {formData.skills.length === 0 && <p className="text-sm mb-3"
                style={{ color: 'var(--color-muted-foreground, #888888)' }}
              >
                No skills added yet.
              </p>}
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 mb-2 p-2 rounded-md border"
                  style={{
                    backgroundColor: 'var(--color-card-background, #ffffff)',
                    borderColor: 'var(--color-border, #cccccc)',
                  }}
                >
                  <Input type="text" value={skill} onChange={(e) => handleSkillsChange(index, e.target.value)} className="flex-1" />
                  <Button type="button"  onClick={() => removeSkill(index)}
                    style={{
                      color: 'var(--color-destructive-foreground, #ef4444)',
                      '--hover-bg': 'var(--color-destructive-background-hover, #fee2e2)',
                      '--hover-text': 'var(--color-destructive-hover, #b91c1c)',
                    } as React.CSSProperties}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2 mt-3">
                <Input
                  type="text"
                  placeholder="New Skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addSkill} className="flex items-center"
                  style={{
                    backgroundColor: 'var(--blue-primary, #3b82f6)',
                    color: 'var(--color-white, #ffffff)',
                    '--hover-bg': 'var(--blue-hover, #2563eb)',
                  } as React.CSSProperties}
                >
                  <Plus size={18} className="mr-1" /> Add
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button type="button" onClick={handleGoBack} className="border"
                style={{
                  backgroundColor: 'var(--color-button-secondary, #e0e0e0)',
                  color: 'var(--color-button-secondary-foreground, #333333)',
                  borderColor: 'var(--color-border, #cccccc)',
                  '--hover-bg': 'var(--color-button-secondary-hover, #d0d0d0)',
                } as React.CSSProperties}
              >
                Cancel
              </Button>
              <Button type="submit"
                style={{
                  backgroundColor: 'var(--blue-primary, #3b82f6)',
                  color: 'var(--color-white, #ffffff)',
                  '--hover-bg': 'var(--blue-hover, #2563eb)',
                } as React.CSSProperties}
              >
                Save Staff
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStaffPage;
