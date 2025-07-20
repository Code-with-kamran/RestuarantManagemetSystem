// lib/mockdata-owner.ts

// --- Interfaces for Owner Profile Data ---
export interface Owner {
  photo: string;
  name: string;
  employeeId: string;
  role: string; // e.g., 'Owner', 'CEO'
}

export interface ActivityStats {
  totalRevenueToday: number; // Broader metric for owner
  totalCustomersToday: number; // New metric for owner
  netProfitToday: number; // Key financial metric
  averageOrderValueToday: number; // Key business metric
}

export interface WorkingHours {
  totalHoursToday: number;
  totalHoursThisWeek: number;
}

export interface AttendanceInfo {
  daysPresent: number;
  daysAbsent: number;
  daysOnLeave: number;
  halfDays: number;
}

export interface RecentActivity {
  id: string;
  action: string; // e.g., 'Approved Marketing Budget', 'Met with Investors'
  timestamp: string;
}

export interface SalesDataPoint {
  date: string;
  sales: number; // Total restaurant sales
}

export interface ProfitDataPoint { // New for owner profile
  date: string;
  profit: number;
}

export interface CustomerDataPoint { // New for owner profile
  date: string;
  customers: number;
}

// --- Mock Data for Owner Profile ---
export const mockOwner: Owner = {
  photo: 'https://images.unsplash.com/photo-1559863378-f03303102213?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // More formal photo
  name: 'Muhammad Akmal',
  employeeId: 'OWNR001',
  role: 'Restaurant Owner & CEO',
};

export const mockActivityStats: ActivityStats = {
  totalRevenueToday: 25000.50,
  totalCustomersToday: 450,
  netProfitToday: 8500.25,
  averageOrderValueToday: 55.50,
};

export const mockWorkingHours: WorkingHours = {
  totalHoursToday: 10.0,
  totalHoursThisWeek: 55.0,
};

export const mockAttendanceInfo: AttendanceInfo = {
  daysPresent: 25,
  daysAbsent: 0,
  daysOnLeave: 0,
  halfDays: 0,
};

export const mockRecentActivity: RecentActivity[] = [
  { id: '1', action: 'Approved Q3 marketing budget', timestamp: '2025-07-14 11:30 AM' },
  { id: '2', action: 'Reviewed new menu item proposals', timestamp: '2025-07-14 10:45 AM' },
  { id: '3', action: 'Met with head chef regarding inventory', timestamp: '2025-07-14 09:15 AM' },
  { id: '4', action: 'Analyzed weekly sales performance', timestamp: '2025-07-13 04:00 PM' },
  { id: '5', action: 'Attended industry conference call', timestamp: '2025-07-13 02:00 PM' },
];

export const mockSalesData: SalesDataPoint[] = [
  { date: '2025-07-08', sales: 20000 },
  { date: '2025-07-09', sales: 22000 },
  { date: '2025-07-10', sales: 18000 },
  { date: '2025-07-11', sales: 28000 },
  { date: '2025-07-12', sales: 21000 },
  { date: '2025-07-13', sales: 24000 },
  { date: '2025-07-14', sales: 25000.50 },
];

export const mockProfitData: ProfitDataPoint[] = [
  { date: '2025-07-08', profit: 6000 },
  { date: '2025-07-09', profit: 7500 },
  { date: '2025-07-10', profit: 5500 },
  { date: '2025-07-11', profit: 9000 },
  { date: '2025-07-12', profit: 6800 },
  { date: '2025-07-13', profit: 7800 },
  { date: '2025-07-14', profit: 8500.25 },
];

export const mockCustomerData: CustomerDataPoint[] = [
  { date: '2025-07-08', customers: 350 },
  { date: '2025-07-09', customers: 400 },
  { date: '2025-07-10', customers: 300 },
  { date: '2025-07-11', customers: 500 },
  { date: '2025-07-12', customers: 380 },
  { date: '2025-07-13', customers: 420 },
  { date: '2025-07-14', customers: 450 },
];
