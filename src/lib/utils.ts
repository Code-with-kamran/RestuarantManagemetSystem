import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils/mockData.ts

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  name: string; // Combined for display in table
  avatar: string; // URL to avatar image
  department: string; // e.g., 'Kitchen', 'Front of House', 'Management'
  jobTitle: string; // e.g., 'Head Chef', 'Waiter', 'Manager', 'Bartender'
  manager: string;
  dateJoined: string; // YYYY-MM-DD
  location: string;
  contactInfo: string; // Phone Number
  email: string; // Email from form
  address: string;
  city: string;
  state: string;
  education: { degreeProgram: string; institute: string }[];
  experience: { position: string; company: string; jobType: string; startDate: string; endDate: string | null; isCurrent: boolean; description: string }[];
  skills: string[];
  isActive: boolean;
  onLeave: boolean;
  onboarding: boolean;
}

export const MOCK_STAFF: StaffMember[] = [
  { id: 'EMP001', firstName: 'Alice', lastName: 'Johnson', name: 'Alice Johnson', avatar: 'https://placehold.co/40x40/FFDDC1/FF6B6B?text=AJ', department: 'Front of House', jobTitle: 'Restaurant Manager', manager: 'CEO', dateJoined: '2019-03-10', location: 'Main Branch', contactInfo: '555-111-2222', email: 'alice@example.com', address: '123 Main St', city: 'Anytown', state: 'CA', education: [{ degreeProgram: 'Hospitality Management', institute: 'Culinary Institute' }], experience: [], skills: ['Leadership', 'Customer Service'], isActive: true, onLeave: false, onboarding: false },
  { id: 'EMP002', firstName: 'Bob', lastName: 'Williams', name: 'Bob Williams', avatar: 'https://placehold.co/40x40/C1DFFF/6B9EFF?text=BW', department: 'Kitchen', jobTitle: 'Head Chef', manager: 'Alice Johnson', dateJoined: '2018-07-20', location: 'Main Branch', contactInfo: '555-333-4444', email: 'bob@example.com', address: '456 Oak Ave', city: 'Anytown', state: 'CA', education: [{ degreeProgram: 'Culinary Arts', institute: 'Le Cordon Bleu' }], experience: [], skills: ['Menu Planning', 'French Cuisine'], isActive: true, onLeave: false, onboarding: false },
  { id: 'EMP003', firstName: 'Charlie', lastName: 'Brown', name: 'Charlie Brown', avatar: 'https://placehold.co/40x40/D1FFC1/6BFF6B?text=CB', department: 'Front of House', jobTitle: 'Waiter', manager: 'Alice Johnson', dateJoined: '2021-01-05', location: 'Main Branch', contactInfo: '555-555-6666', email: 'charlie@example.com', address: '789 Pine Ln', city: 'Anytown', state: 'CA', education: [], experience: [], skills: ['Table Service', 'POS Systems'], isActive: true, onLeave: false, onboarding: false },
  { id: 'EMP004', firstName: 'Diana', lastName: 'Miller', name: 'Diana Miller', avatar: 'https://placehold.co/40x40/FFF1C1/FFC36B?text=DM', department: 'Kitchen', jobTitle: 'Sous Chef', manager: 'Bob Williams', dateJoined: '2020-09-12', location: 'Main Branch', contactInfo: '555-777-8888', email: 'diana@example.com', address: '101 Elm St', city: 'Anytown', state: 'CA', education: [], experience: [], skills: ['Grill Cook', 'Food Prep'], isActive: true, onLeave: false, onboarding: false },
  { id: 'EMP005', firstName: 'Eve', lastName: 'Davis', name: 'Eve Davis', avatar: 'https://placehold.co/40x40/E1C1FF/A36BFF?text=ED', department: 'Front of House', jobTitle: 'Bartender', manager: 'Alice Johnson', dateJoined: '2022-04-01', location: 'Main Branch', contactInfo: '555-999-0000', email: 'eve@example.com', address: '202 Maple Dr', city: 'Anytown', state: 'CA', education: [], experience: [], skills: ['Cocktail Mixing', 'Customer Engagement'], isActive: true, onLeave: false, onboarding: false },
  { id: 'EMP006', firstName: 'Frank', lastName: 'Garcia', name: 'Frank Garcia', avatar: 'https://placehold.co/40x40/C1FFFF/6BFFFF?text=FG', department: 'Kitchen', jobTitle: 'Dishwasher', manager: 'Bob Williams', dateJoined: '2023-02-14', location: 'Main Branch', contactInfo: '555-123-4567', email: 'frank@example.com', address: '303 Birch Rd', city: 'Anytown', state: 'CA', education: [], experience: [], skills: ['Cleaning', 'Organization'], isActive: true, onLeave: true, onboarding: false },
  { id: 'EMP007', firstName: 'Grace', lastName: 'Rodriguez', name: 'Grace Rodriguez', avatar: 'https://placehold.co/40x40/FFC1E1/FF6BBF?text=GR', department: 'Front of House', jobTitle: 'Host', manager: 'Alice Johnson', dateJoined: '2023-07-01', location: 'Main Branch', contactInfo: '555-234-5678', email: 'grace@example.com', address: '404 Cedar Ln', city: 'Anytown', state: 'CA', education: [], experience: [], skills: ['Greeting Guests', 'Reservation Management'], isActive: true, onLeave: false, onboarding: true },
  { id: 'EMP008', firstName: 'Henry', lastName: 'Martinez', name: 'Henry Martinez', avatar: 'https://placehold.co/40x40/E1FFC1/BFFF6B?text=HM', department: 'Kitchen', jobTitle: 'Pastry Chef', manager: 'Bob Williams', dateJoined: '2020-11-20', location: 'Main Branch', contactInfo: '555-345-6789', email: 'henry@example.com', address: '505 Fir St', city: 'Anytown', state: 'CA', education: [], experience: [], skills: ['Baking', 'Dessert Decoration'], isActive: true, onLeave: false, onboarding: false },
];
