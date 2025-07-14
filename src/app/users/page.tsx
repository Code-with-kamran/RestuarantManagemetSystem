// pages/waiter-profile.tsx
'use client'
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf'; // Import jsPDF
import Image from 'next/image';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// --- Mock Data ---
interface Waiter {
  photo: string;
  name: string;
  employeeId: string;
  role: string;
}

interface ActivityStats {
  tablesServedToday: number;
  ordersTakenToday: number;
  totalSalesAmountToday: number;
  tipsEarnedToday: number;
}

interface WorkingHours {
  totalHoursToday: number;
  totalHoursThisWeek: number;
}

interface AttendanceInfo {
  daysPresent: number;
  daysAbsent: number;
  daysOnLeave: number;
  halfDays: number;
}

interface RecentActivity {
  id: string;
  action: string;
  timestamp: string;
}

interface SalesDataPoint {
  date: string;
  sales: number;
}

interface TipsDataPoint {
  date: string;
  tips: number;
}

interface OrdersDataPoint {
  date: string;
  orders: number;
}

const mockWaiter: Waiter = {
  photo: 'https://images.unsplash.com/photo-1543610362-e1a5393a525f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Replace with a real image URL
  name: 'John Doe',
  employeeId: 'EMP001',
  role: 'Senior Waiter',
};

const mockActivityStats: ActivityStats = {
  tablesServedToday: 15,
  ordersTakenToday: 25,
  totalSalesAmountToday: 1250.75,
  tipsEarnedToday: 150.20,
};

const mockWorkingHours: WorkingHours = {
  totalHoursToday: 6.5,
  totalHoursThisWeek: 35.0,
};

const mockAttendanceInfo: AttendanceInfo = {
  daysPresent: 20,
  daysAbsent: 1,
  daysOnLeave: 2,
  halfDays: 0,
};

const mockRecentActivity: RecentActivity[] = [
  { id: '1', action: 'Order #124 completed', timestamp: '2025-07-14 09:55 AM' },
  { id: '2', action: 'Table 7 seated', timestamp: '2025-07-14 09:40 AM' },
  { id: '3', action: 'Order #123 modified', timestamp: '2025-07-14 09:30 AM' },
  { id: '4', action: 'Order #122 completed', timestamp: '2025-07-14 09:15 AM' },
  { id: '5', action: 'Shift started', timestamp: '2025-07-14 09:00 AM' },
];

const mockSalesData: SalesDataPoint[] = [
  { date: '2025-07-08', sales: 1000 },
  { date: '2025-07-09', sales: 1200 },
  { date: '2025-07-10', sales: 900 },
  { date: '2025-07-11', sales: 1500 },
  { date: '2025-07-12', sales: 1100 },
  { date: '2025-07-13', sales: 1300 },
  { date: '2025-07-14', sales: 1250.75 },
];

const mockTipsData: TipsDataPoint[] = [
  { date: '2025-07-08', tips: 100 },
  { date: '2025-07-09', tips: 150 },
  { date: '2025-07-10', tips: 90 },
  { date: '2025-07-11', tips: 180 },
  { date: '2025-07-12', tips: 120 },
  { date: '2025-07-13', tips: 160 },
  { date: '2025-07-14', tips: 150.20 },
];

const mockOrdersData: OrdersDataPoint[] = [
  { date: '2025-07-08', orders: 20 },
  { date: '2025-07-09', orders: 25 },
  { date: '2025-07-10', orders: 18 },
  { date: '2025-07-11', orders: 30 },
  { date: '2025-07-12', orders: 22 },
  { date: '2025-07-13', orders: 28 },
  { date: '2025-07-14', orders: 25 },
];

// --- Chart Configurations ---
const salesChartData = {
  labels: mockSalesData.map(data => data.date),
  datasets: [
    {
      label: 'Sales Amount',
      data: mockSalesData.map(data => data.sales),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.1,
    },
  ],
};

const tipsChartData = {
  labels: mockTipsData.map(data => data.date),
  datasets: [
    {
      label: 'Tips Earned',
      data: mockTipsData.map(data => data.tips),
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      tension: 0.1,
    },
  ],
};

const ordersChartData = {
  labels: mockOrdersData.map(data => data.date),
  datasets: [
    {
      label: 'Orders Taken',
      data: mockOrdersData.map(data => data.orders),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '', // Set title in individual chart components
    },
  },
};

const WaiterProfilePage: React.FC = () => {
  const handleGeneratePDFReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Waiter Performance Report', 10, 20);

    doc.setFontSize(14);
    doc.text(`Waiter: ${mockWaiter.name} (ID: ${mockWaiter.employeeId})`, 10, 40);
    doc.text(`Role: ${mockWaiter.role}`, 10, 50);

    doc.setFontSize(16);
    doc.text('Today\'s Activity Stats:', 10, 70);
    doc.setFontSize(12);
    doc.text(`Tables Served: ${mockActivityStats.tablesServedToday}`, 10, 80);
    doc.text(`Orders Taken: ${mockActivityStats.ordersTakenToday}`, 10, 90);
    doc.text(`Total Sales: $${mockActivityStats.totalSalesAmountToday.toFixed(2)}`, 10, 100);
    doc.text(`Tips Earned: $${mockActivityStats.tipsEarnedToday.toFixed(2)}`, 10, 110);

    doc.save('waiter_report.pdf');
  };

  const handleGenerateCSVReport = () => {
    const headers = ["Date", "Sales Amount", "Tips Earned", "Orders Taken"];
    const rows = mockSalesData.map((sales, index) => {
      const tips = mockTipsData[index]?.tips || 0;
      const orders = mockOrdersData[index]?.orders || 0;
      return [sales.date, sales.sales, tips, orders];
    });

    let csvContent = headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection for download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'waiter_sales_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleNavigateToPOS = () => {
    alert("Navigating to Point of Sale (POS) page...");
    // In a real application, you would use Next.js's useRouter to navigate:
    // import { useRouter } from 'next/router';
    // const router = useRouter();
    // router.push('/pos');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
        {/* Header and POS Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Waiter Profile</h1>
          <button
            onClick={handleNavigateToPOS}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Go to POS (Take New Order)
          </button>
        </div>

        {/* Waiter's Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center">
            <Image
              src={mockWaiter.photo}
              alt={mockWaiter.name}
              width={100}
              height={100}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-900">{mockWaiter.name}</h2>
            <p className="text-gray-600">Employee ID: <span className="font-medium">{mockWaiter.employeeId}</span></p>
            <p className="text-gray-600">Role: <span className="font-medium">{mockWaiter.role}</span></p>
          </div>

          {/* Activity Stats */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Tables Served Today Card */}
            <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10v6m0 0v-6m0 6h18m-9 0a3 3 0 01-3-3V7a3 3 0 013-3h.01M21 10v6m0 0v-6m0 6h-6m-6 0v-6m0 6a3 3 0 003-3V7a3 3 0 00-3-3h.01M18 10v6m0 0v-6m0 6h-6m6 0a3 3 0 01-3-3V7a3 3 0 013-3h.01" />
              </svg>
              <p className="text-gray-700 font-semibold text-md mb-1">Tables Served Today</p>
              <p className="text-3xl font-extrabold text-green-700">{mockActivityStats.tablesServedToday}</p>
            </div>

            {/* Orders Taken Today Card */}
            <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100 hover:shadow-lg transition-shadow duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p className="text-gray-700 font-semibold text-md mb-1">Orders Taken Today</p>
              <p className="text-3xl font-extrabold text-yellow-700">{mockActivityStats.ordersTakenToday}</p>
            </div>

            {/* Total Sales Today Card */}
            <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-700 font-semibold text-md mb-1">Total Sales Today</p>
              <p className="text-3xl font-extrabold text-blue-700">${mockActivityStats.totalSalesAmountToday.toFixed(2)}</p>
            </div>

            {/* Tips Earned Today Card */}
            <div className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1L21 6V3m0 0L2.23 21.027m0 0l-1.077-.384M2.23 21.027c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953M4.23 11c-1.11 0-2.08-.402-2.599-1L3 6V3m0 0l-.307.11m0 0c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953M6.23 11c-1.11 0-2.08-.402-2.599-1L5 6V3m0 0l-.307.11m0 0c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1L21 6V3m0 0L2.23 21.027m0 0l-1.077-.384M2.23 21.027c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953M4.23 11c-1.11 0-2.08-.402-2.599-1L3 6V3m0 0l-.307.11m0 0c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953M6.23 11c-1.11 0-2.08-.402-2.599-1L5 6V3m0 0l-.307.11m0 0c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953" />
              </svg>
              <p className="text-gray-700 font-semibold text-md mb-1">Tips Earned Today</p>
              <p className="text-3xl font-extrabold text-purple-700">${mockActivityStats.tipsEarnedToday.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Working Hours & Attendance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Working Hours</h3>
            <p className="text-gray-700 mb-2">Total Hours Worked Today: <span className="font-bold">{mockWorkingHours.totalHoursToday} hrs</span></p>
            <p className="text-gray-700">Total Hours Worked This Week: <span className="font-bold">{mockWorkingHours.totalHoursThisWeek} hrs</span></p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance Information (Current Month)</h3>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-700">Days Present: <span className="font-bold text-green-600">{mockAttendanceInfo.daysPresent}</span></p>
              <p className="text-gray-700">Days Absent: <span className="font-bold text-red-600">{mockAttendanceInfo.daysAbsent}</span></p>
              <p className="text-gray-700">Days on Leave: <span className="font-bold text-yellow-600">{mockAttendanceInfo.daysOnLeave}</span></p>
              <p className="text-gray-700">Half-Days: <span className="font-bold text-blue-600">{mockAttendanceInfo.halfDays}</span></p>
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity Log</h3>
          <ul className="divide-y divide-gray-200">
            {mockRecentActivity.map(activity => (
              <li key={activity.id} className="py-2 flex justify-between items-center">
                <span className="text-gray-700">{activity.action}</span>
                <span className="text-gray-500 text-sm">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reports Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Reports</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-medium text-gray-800 text-center mb-4">Sales Trends (Last 7 Days)</h4>
              <Line options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Sales Trends (Last 7 Days)' }}}} data={salesChartData} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-medium text-gray-800 text-center mb-4">Tips Trends (Last 7 Days)</h4>
              <Line options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Tips Trends (Last 7 Days)' }}}} data={tipsChartData} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-medium text-gray-800 text-center mb-4">Orders Over Time (Last 7 Days)</h4>
              <Bar options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Orders Over Time (Last 7 Days)' }}}} data={ordersChartData} />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleGeneratePDFReport}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            >
              Generate PDF Report
            </button>
            <button
              onClick={handleGenerateCSVReport}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              Generate CSV Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterProfilePage;