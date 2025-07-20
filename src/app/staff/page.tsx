// src/app/staff/page.tsx
"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { MOCK_STAFF, StaffMember } from '@/lib/mockdata'; // Import mock data and interface
import { Button } from '@/components/ui/Button'; // Re-using your Button component
import { Plus } from 'lucide-react'; // Icon for Add Staff button

// --- Reusable Components (Internal to StaffPage) ---

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, bgColor, textColor }) => (
  <div className="bg-[var(--color-card-background)] p-6 rounded-lg shadow-sm flex items-center space-x-4 border border-[var(--color-border)]">
    <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-[var(--color-muted-foreground)]">{title}</p>
      <p className="text-2xl font-semibold text-[var(--color-foreground)]">{value}</p>
    </div>
  </div>
);

// Removed Modal and StaffModal definitions from here, as the form is now a separate page.
// If you still need generic Modal, keep components/Modal.tsx

const StaffPage: React.FC = () => {
  const router = useRouter();
  const [staffList, setStaffList] = useState<StaffMember[]>(MOCK_STAFF); // Use mock data directly

  // Memoized calculations for summary cards
  const totalStaff = useMemo(() => staffList.length, [staffList]);
  const activeStaff = useMemo(() => staffList.filter(s => s.isActive).length, [staffList]);
  const managersCount = useMemo(() => staffList.filter(s => s.role === 'Manager').length, [staffList]);
const handleViewStaff = (staffId: string) => {
    router.push(`/staff-profile/${staffId}`);
  };
  // Function to simulate deleting a staff member (for demonstration)
  const handleDeleteStaff = (id: string) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffList(prev => prev.filter(staff => staff.id !== id));
      alert('Staff member deleted!');
    }
  };

  // The "Add Staff" button now navigates to the new page
  const handleAddStaffClick = () => {
    router.push('/staff/add');
  };

  return (
    <div className="h-[calc(100vh-100px)] bg-[var(--color-background)] text-[var(--color-foreground)] p-4 md:p-6 overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-foreground)]">Staff Management</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard
            title="Total Staff"
            value={totalStaff}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-2v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2H3m14 0a2 2 0 102 2H3a2 2 0 102-2h14zm-7 0h-2m0-7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
            bgColor="bg-blue-100"
            textColor="text-blue-600"
          />
          <SummaryCard
            title="Active Staff"
            value={activeStaff}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
            bgColor="bg-green-100"
            textColor="text-green-600"
          />
          <SummaryCard
            title="Managers"
            value={managersCount}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.55 23.55 0 0112 15c-3.79 0-7.214-.493-10-1.745M16 16v.01M6 16v.01M12 16v.01m0 0h.01M12 12h.01M12 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm12 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path></svg>}
            bgColor="bg-purple-100"
            textColor="text-purple-600"
          />
        </div>

        {/* Staff List Table */}
        <div className="bg-[var(--color-card-background)] rounded-lg shadow-md overflow-hidden border border-[var(--color-border)]">
          <div className="p-4 flex justify-between items-center border-b border-[var(--color-border)]">
            <h2 className="text-xl font-semibold text-[var(--color-foreground)]">All Staff Members</h2>
            <Button onClick={handleAddStaffClick} className="bg-[var(--blue-primary)] text-white hover:bg-[var(--blue-hover)] flex items-center space-x-2">
              <Plus size={20} />
              <span>Add Staff</span>
            </Button>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full divide-y divide-[var(--color-border)]">
              <thead className="bg-[var(--color-muted-background)]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-[var(--color-card-background)] divide-y divide-[var(--color-border)]">
                {staffList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-[var(--color-muted-foreground)]">
                      No staff members found.
                    </td>
                  </tr>
                ) : (
                  staffList.map((staff) => (
                    <tr key={staff.id} className="hover:bg-[var(--color-muted-background)] transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Image
                          src={staff.profileImage || `https://placehold.co/50x50/cccccc/000000?text=${staff.name.charAt(0)}`}
                          alt={staff.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                          onClick={() => handleViewStaff(staff.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[var(--color-foreground)]">{staff.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[var(--color-foreground)]">{staff.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[var(--color-foreground)]">{staff.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-[var(--color-foreground)]">{staff.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          staff.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {staff.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {/* You can add an Edit button here that navigates to /staff/edit/[id] */}
                          <Button   onClick={() => router.push(`/staff/edit/${staff.id}`)}>Edit</Button>
                          <Button  onClick={() => handleDeleteStaff(staff.id)}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;