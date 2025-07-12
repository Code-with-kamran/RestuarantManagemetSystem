// pages/staff.tsx
"use client"
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation"; // Corrected import for Next.js 13+ App Router
import { MOCK_STAFF, StaffMember } from '../../lib/mockdata'; // Import mock data and interface

// --- Reusable Components (Internal to StaffPage) ---


interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, bgColor, textColor }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
    <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  className?: string; // For custom width/height
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`bg-white rounded-lg shadow-xl w-full mx-auto p-6 relative my-8 ${className || 'max-w-lg'}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {children}
      </div>
    </div>
  );
};

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Action</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main StaffPage Component ---

const StaffPage: React.FC = () => {
  const router = useRouter();
  // Using a local state for staffMembers for client-side manipulation.
  // In a real app, this would come from a global state manager or API.
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(MOCK_STAFF);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null); // State for staff being edited
  const [staffToDeleteId, setStaffToDeleteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'manage' | 'chart' | 'leave'>('manage');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState('All');
  const [selectedJobTitleFilter, setSelectedJobTitleFilter] = useState('All');
  const [selectedManagerFilter, setSelectedManagerFilter] = useState('All');
  const [selectedLocationFilter, setSelectedLocationFilter] = useState('All');

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Calculate summary counts
  const totalEmployees = staffMembers.length;
  const activeEmployees = staffMembers.filter(s => s.isActive).length;
  const onLeaveEmployees = staffMembers.filter(s => s.onLeave).length;
  const onboardingEmployees = staffMembers.filter(s => s.onboarding).length;

  // Extract unique filter options from the current staffMembers state
  const uniqueRoles = useMemo(() => ['All', ...Array.from(new Set(staffMembers.map(s => s.jobTitle)))].sort(), [staffMembers]);
  const uniqueDepartments = useMemo(() => ['All', ...Array.from(new Set(staffMembers.map(s => s.department)))].sort(), [staffMembers]);
  const uniqueJobTitles = useMemo(() => ['All', ...Array.from(new Set(staffMembers.map(s => s.jobTitle)))].sort(), [staffMembers]);
  const uniqueManagers = useMemo(() => ['All', ...Array.from(new Set(staffMembers.map(s => s.manager)))].sort(), [staffMembers]);
  const uniqueLocations = useMemo(() => ['All', ...Array.from(new Set(staffMembers.map(s => s.location)))].sort(), [staffMembers]);

  const filteredStaff = useMemo(() => {
    let tempStaff = staffMembers;

    if (searchTerm) {
      tempStaff = tempStaff.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRoleFilter !== 'All') {
      tempStaff = tempStaff.filter(staff => staff.jobTitle === selectedRoleFilter);
    }
    if (selectedDepartmentFilter !== 'All') {
      tempStaff = tempStaff.filter(staff => staff.department === selectedDepartmentFilter);
    }
    if (selectedJobTitleFilter !== 'All') {
      tempStaff = tempStaff.filter(staff => staff.jobTitle === selectedJobTitleFilter);
    }
    if (selectedManagerFilter !== 'All') {
      tempStaff = tempStaff.filter(staff => staff.manager === selectedManagerFilter);
    }
    if (selectedLocationFilter !== 'All') {
      tempStaff = tempStaff.filter(staff => staff.location === selectedLocationFilter);
    }

    return tempStaff;
  }, [staffMembers, searchTerm, selectedRoleFilter, selectedDepartmentFilter, selectedJobTitleFilter, selectedManagerFilter, selectedLocationFilter]);

  // Open modal for adding new staff
  const handleAddStaff = () => {
    setEditingStaff(null); // Clear any previous editing data
    setIsModalOpen(true);
  };

  // Open modal for editing existing staff
  const handleEditStaff = (staff: StaffMember) => {
    setEditingStaff(staff);
    setIsModalOpen(true);
  };

  // Navigate to employee profile page
  const handleViewStaff = (staffId: string) => {
    router.push(`/employee-profile/${staffId}`);
  };

  const handleDeleteClick = (id: string) => {
    setStaffToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const confirmDelete = () => {
    if (staffToDeleteId) {
      setStaffMembers(prev => prev.filter(staff => staff.id !== staffToDeleteId));
      setSelectedRows(prev => prev.filter(id => id !== staffToDeleteId));
      setIsConfirmDialogOpen(false);
      setStaffToDeleteId(null);
    }
  };

  // Function to save staff data from the modal form
  const handleSaveStaff = (staff: StaffMember) => {
    if (editingStaff) {
      // Edit existing staff
      setStaffMembers(prev => prev.map(s => (s.id === staff.id ? staff : s)));
    } else {
      // Add new staff
      setStaffMembers(prev => [...prev, { ...staff, id: `EMP-${Date.now()}` }]); // Simple ID generation
    }
    setIsModalOpen(false); // Close modal after saving
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRoleFilter('All');
    setSelectedDepartmentFilter('All');
    setSelectedJobTitleFilter('All');
    setSelectedManagerFilter('All');
    setSelectedLocationFilter('All');
  };

  const handleRowSelect = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const handleSelectAllRows = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows(filteredStaff.map(staff => staff.id));
    } else {
      setSelectedRows([]);
    }
  };

  const isAllRowsSelected = selectedRows.length === filteredStaff.length && filteredStaff.length > 0;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Employees</h1>
      <p className="text-gray-600 mb-6">Manage and view the complete list of employees within the organization.</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Employee"
          value={totalEmployees}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-10a2 2 0 01-2-2V9a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2zM9 11h6m-3 6v-3m-3 0h6m-3 0v3"></path></svg>}
          bgColor="bg-red-100"
          textColor="text-red-500"
        />
        <SummaryCard
          title="Active Employee"
          value={activeEmployees}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
          bgColor="bg-green-100"
          textColor="text-green-500"
        />
        <SummaryCard
          title="On Leave"
          value={onLeaveEmployees}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          bgColor="bg-yellow-100"
          textColor="text-yellow-500"
        />
        <SummaryCard
          title="Onboarding"
          value={onboardingEmployees}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>}
          bgColor="bg-purple-100"
          textColor="text-purple-500"
        />
      </div>


      {/* Header with Tabs and Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex space-x-4 border-b border-gray-200 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('manage')}
              className={`pb-3 border-b-2 ${activeTab === 'manage' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'} font-semibold text-sm`}
            >
              Manage Employees
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              className={`pb-3 border-b-2 ${activeTab === 'chart' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'} font-semibold text-sm`}
            >
              Organisation Chart
            </button>
            <button
              onClick={() => setActiveTab('leave')}
              className={`pb-3 border-b-2 ${activeTab === 'leave' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'} font-semibold text-sm`}
            >
              Leave Requests
            </button>
          </div>
          <div className="flex space-x-3 w-full sm:w-auto justify-end">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Export
            </button>
            <button
              onClick={handleAddStaff}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Add Employee
            </button>
          </div>
        </div>

        {/* Filters and Search - Only visible for Manage Employees tab */}
        {activeTab === 'manage' && (
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-3 mt-4">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={selectedDepartmentFilter}
                onChange={(e) => setSelectedDepartmentFilter(e.target.value)}
              >
                <option value="All">Department</option>
                {uniqueDepartments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={selectedJobTitleFilter}
                onChange={(e) => setSelectedJobTitleFilter(e.target.value)}
              >
                <option value="All">Job Title</option>
                {uniqueJobTitles.map(title => <option key={title} value={title}>{title}</option>)}
              </select>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={selectedManagerFilter}
                onChange={(e) => setSelectedManagerFilter(e.target.value)}
              >
                <option value="All">Manager</option>
                {uniqueManagers.map(manager => <option key={manager} value={manager}>{manager}</option>)}
              </select>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                // No specific date filter dropdown in UI, but can be added
              >
                <option value="All">Date of Joining</option>
                {/* Add date options if needed */}
              </select>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
              >
                <option value="All">Job Type</option>
                {uniqueRoles.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
              <select
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={selectedLocationFilter}
                onChange={(e) => setSelectedLocationFilter(e.target.value)}
              >
                <option value="All">Location</option>
                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <button
                onClick={handleClearFilters}
                className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Filters
              </button>
            </div>
            <div className="relative w-full md:w-auto md:min-w-[250px]">
              <input
                type="text"
                placeholder="Search Employees by Name, ID..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Conditional Content based on Active Tab */}
      {activeTab === 'manage' && (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={isAllRowsSelected}
                    onChange={(e) => handleSelectAllRows(e.target.checked)}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emp ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Joining</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th> {/* Actions */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                    No staff members found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStaff.map(staff => (
                  <tr key={staff.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 rounded"
                        checked={selectedRows.includes(staff.id)}
                        onChange={(e) => handleRowSelect(staff.id, e.target.checked)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full object-cover"
                            src={staff.avatar}
                            alt={staff.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.jobTitle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{staff.manager}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.dateJoined}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button onClick={() => handleViewStaff(staff.id)} className="text-gray-500 hover:text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </button>
                        <button onClick={() => handleEditStaff(staff)} className="text-gray-500 hover:text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onClick={() => handleDeleteClick(staff.id)} className="text-gray-500 hover:text-red-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {selectedRows.length > 0 && (
            <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
              {selectedRows.length} of {filteredStaff.length} row(s) selected.
            </div>
          )}
          {/* Pagination - Basic placeholder, can be expanded */}
          <div className="flex justify-end items-center px-6 py-3 bg-gray-50">
            <span className="text-sm text-gray-600 mr-4">
              {selectedRows.length} of {filteredStaff.length} row(s) selected
            </span>
            <button className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md disabled:opacity-50" disabled>Previous</button>
            <span className="mx-2 text-blue-600 font-semibold">1</span>
            <span className="mx-2 text-gray-500">2</span>
            <span className="mx-2 text-gray-500">3</span>
            <span className="mx-2 text-gray-500">...</span>
            <span className="mx-2 text-gray-500">200</span>
            <button className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md disabled:opacity-50" disabled={filteredStaff.length <= 10}>Next</button>
          </div>
        </div>
      )}

      {activeTab === 'chart' && (
        <div className="bg-white p-6 rounded-lg shadow-sm min-h-[400px] flex items-center justify-center text-gray-500 text-lg">
          Organisation Chart functionality coming soon!
        </div>
      )}

      {activeTab === 'leave' && (
        <div className="bg-white p-6 rounded-lg shadow-sm min-h-[400px] flex items-center justify-center text-gray-500 text-lg">
          Leave Requests functionality coming soon!
        </div>
      )}

      {/* Add/Edit Staff Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
        className="max-w-full h-full" // Make modal full width and height
      >
        <StaffForm
          initialData={editingStaff}
          onSave={handleSaveStaff}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete staff member ${staffToDeleteId}? This action cannot be undone.`}
      />
    </div>
  );
};

export default StaffPage;

// --- Staff Form Component (Internal to StaffPage for simplicity) ---
// This component contains the detailed form for adding/editing staff.
interface StaffFormProps {
  initialData: StaffMember | null;
  onSave: (staff: StaffMember) => void;
  onCancel: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<StaffMember, 'id' | 'avatar' | 'name' | 'isActive' | 'onLeave' | 'onboarding'>>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    department: initialData?.department || '',
    jobTitle: initialData?.jobTitle || '', // Maps to Designation
    manager: initialData?.manager || '',
    dateJoined: initialData?.dateJoined || '',
    location: initialData?.location || '',
    contactInfo: initialData?.contactInfo || '', // Phone Number
    email: initialData?.email || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    education: initialData?.education || [],
    experience: initialData?.experience || [],
    skills: initialData?.skills || [],
  });

  // Effect to update form data if initialData changes (e.g., when editing a different staff member)
  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        department: initialData.department,
        jobTitle: initialData.jobTitle,
        manager: initialData.manager,
        dateJoined: initialData.dateJoined,
        location: initialData.location,
        contactInfo: initialData.contactInfo,
        email: initialData.email,
        address: initialData.address,
        city: initialData.city,
        state: initialData.state,
        education: initialData.education,
        experience: initialData.experience,
        skills: initialData.skills,
      });
    } else {
      // Reset form if no initialData (for adding new staff)
      setFormData({
        firstName: '', lastName: '', department: '', jobTitle: '', manager: '',
        dateJoined: '', location: '', contactInfo: '', email: '', address: '',
        city: '', state: '', education: [], experience: [], skills: [],
      });
    }
  }, [initialData]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index: number, field: keyof StaffMember['education'][0], value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setFormData(prev => ({ ...prev, education: [...prev.education, { degreeProgram: '', institute: '' }] }));
  };

  const handleExperienceChange = (index: number, field: keyof StaffMember['experience'][0], value: string | boolean) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setFormData(prev => ({ ...prev, experience: [...prev.experience, { position: '', company: '', jobType: '', startDate: '', endDate: null, isCurrent: false, description: '' }] }));
  };

  const handleSkillsChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setFormData(prev => ({ ...prev, skills: [...prev.skills, ''] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff: StaffMember = {
      ...formData,
      id: initialData?.id || `EMP-${Date.now()}`, // Use existing ID or generate new
      name: `${formData.firstName} ${formData.lastName}`, // Combine for table display
      avatar: initialData?.avatar || `https://placehold.co/40x40/E0E7FF/4F46E5?text=${formData.firstName[0]}${formData.lastName[0]}`,
      isActive: initialData?.isActive ?? true, // Default to active for new staff
      onLeave: initialData?.onLeave ?? false,
      onboarding: initialData?.onboarding ?? false,
    };
    onSave(newStaff); // Call the onSave prop passed from StaffPage
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* Placeholder for avatar, could be an Image component */}
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
          <button type="button" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Details */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="text" id="contactInfo" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Designation</label>
          <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-gray-800 mb-3">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor={`degreeProgram-${index}`} className="block text-sm font-medium text-gray-700">Degree Program</label>
              <input type="text" id={`degreeProgram-${index}`} name={`degreeProgram-${index}`} value={edu.degreeProgram} onChange={(e) => handleEducationChange(index, 'degreeProgram', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            </div>
            <div>
              <label htmlFor={`institute-${index}`} className="block text-sm font-medium text-gray-700">Institute</label>
              <input type="text" id={`institute-${index}`} name={`institute-${index}`} value={edu.institute} onChange={(e) => handleEducationChange(index, 'institute', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            </div>
          </div>
        ))}
        <button type="button" onClick={addEducation} className="text-blue-600 text-sm flex items-center mt-2">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4v16m8-8H4"></path></svg>
          Add Education
        </button>
      </div>

      {/* Experience Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-gray-800 mb-3">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor={`expPosition-${index}`} className="block text-sm font-medium text-gray-700">Position/Designation</label>
              <input type="text" id={`expPosition-${index}`} name={`expPosition-${index}`} value={exp.position} onChange={(e) => handleExperienceChange(index, 'position', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            </div>
            <div>
              <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700">Company</label>
              <input type="text" id={`company-${index}`} name={`company-${index}`} value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            </div>
            <div>
              <label htmlFor={`jobType-${index}`} className="block text-sm font-medium text-gray-700">Job Type</label>
              <input type="text" id={`jobType-${index}`} name={`jobType-${index}`} value={exp.jobType} onChange={(e) => handleExperienceChange(index, 'jobType', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            </div>
            <div>
              <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
              <input type="date" id={`startDate-${index}`} name={`startDate-${index}`} value={exp.startDate} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            </div>
            <div>
              <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">End Date</label>
              <input type="date" id={`endDate-${index}`} name={`endDate-${index}`} value={exp.endDate || ''} onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} disabled={exp.isCurrent} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 disabled:bg-gray-100 sm:text-sm" />
              <div className="flex items-center mt-2">
                <input type="checkbox" id={`isCurrent-${index}`} checked={exp.isCurrent} onChange={(e) => handleExperienceChange(index, 'isCurrent', e.target.checked)} className="h-4 w-4 text-blue-600 rounded" />
                <label htmlFor={`isCurrent-${index}`} className="ml-2 block text-sm text-gray-900">I'm currently work here</label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id={`description-${index}`} name={`description-${index}`} value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"></textarea>
            </div>
          </div>
        ))}
        <button type="button" onClick={addExperience} className="text-blue-600 text-sm flex items-center mt-2">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4v16m8-8H4"></path></svg>
          Add Experience
        </button>
      </div>

      {/* Skills Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-gray-800 mb-3">Skills</h3>
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input type="text" value={skill} onChange={(e) => handleSkillsChange(index, e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm" />
            {/* Add remove skill button if needed */}
          </div>
        ))}
        <button type="button" onClick={addSkill} className="text-blue-600 text-sm flex items-center mt-2">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4v16m8-8H4"></path></svg>
          Add Skill
        </button>
      </div>


      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel} // Use the onCancel prop to close the modal
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm text-sm"
        >
          Save
        </button>
      </div>
    </form>
  );
};
