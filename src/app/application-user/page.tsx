'use client'
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import Image from 'next/image';

// Import mock data from the separate file
import {
  mockOwner, // Changed to mockOwner
  mockActivityStats,
  mockWorkingHours,
  mockAttendanceInfo,
  mockRecentActivity,
  mockSalesData,
  mockProfitData, // New for owner
  mockCustomerData, // New for owner
 // New for owner
} from '@/lib/mockdata-owner'; // Updated import path

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

// --- Chart Configurations ---
const salesChartData = {
  labels: mockSalesData.map(data => data.date),
  datasets: [
    {
      label: 'Total Revenue',
      data: mockSalesData.map(data => data.sales),
      borderColor: 'rgb(75, 192, 192)', // Example: var(--chart-line-color-revenue)
      backgroundColor: 'rgba(75, 192, 192, 0.5)', // Example: var(--chart-fill-color-revenue)
      tension: 0.3,
      borderWidth: 3,
      pointRadius: 6,
      pointBackgroundColor: 'rgb(75, 192, 192)',
      pointBorderColor: '#fff',
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(75, 192, 192)',
    },
  ],
};

const profitChartData = { // New chart data for profit
  labels: mockProfitData.map(data => data.date),
  datasets: [
    {
      label: 'Net Profit',
      data: mockProfitData.map(data => data.profit),
      borderColor: 'rgb(102, 194, 164)', // A different green for profit
      backgroundColor: 'rgba(102, 194, 164, 0.5)',
      tension: 0.3,
      borderWidth: 3,
      pointRadius: 6,
      pointBackgroundColor: 'rgb(102, 194, 164)',
      pointBorderColor: '#fff',
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(102, 194, 164)',
    },
  ],
};

const customerChartData = { // New chart data for customers
  labels: mockCustomerData.map(data => data.date),
  datasets: [
    {
      label: 'Total Customers',
      data: mockCustomerData.map(data => data.customers),
      backgroundColor: 'rgba(255, 159, 64, 0.8)', // Orange for customers
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
      borderRadius: 8,
      hoverBackgroundColor: 'rgba(255, 159, 64, 1)',
    },
  ],
};
const titleFontWeight: "bold" | "normal" | "lighter" | "bolder" = "bold";
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        font: {
          size: 14,
          family: 'Inter',
        },
        color: 'var(--text-color-default, #4A5568)',
      },
    },
    title: {
      display: true,
      text: '',
      font: {
        size: 18,
        weight: 'bold',
        family: 'Inter',
      },
      color: 'var(--text-color-heading, #2D3748)',
    },
    tooltip: {
      backgroundColor: 'var(--tooltip-bg, rgba(30,41,59,0.9))',
      titleFont: {
        size: 15,
        family: 'Inter',
        weight: titleFontWeight
      },
      bodyFont: {
        size: 13,
        family: 'Inter',
      },
      padding: 12,
      borderRadius: 10,
      displayColors: true,
      boxPadding: 5,
    }
  },
  scales: {
    x: {
      ticks: {
        font: {
          family: 'Inter',
        },
        color: 'var(--text-color-light, #718096)',
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      ticks: {
        font: {
          family: 'Inter',
        },
        color: 'var(--text-color-light, #718096)',
      },
      grid: {
        color: 'var(--border-color-light, #E2E8F0)',
      },
      border: {
        display: false,
      },
    },
  },
};

const OwnerProfilePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
  }, []);

  const handleGeneratePDFReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Restaurant Owner Performance Report', 10, 20);

    doc.setFontSize(14);
    doc.text(`Owner: ${mockOwner.name} (ID: ${mockOwner.employeeId})`, 10, 40);
    doc.text(`Role: ${mockOwner.role}`, 10, 50);

    doc.setFontSize(16);
    doc.text('Today\'s Key Performance Indicators:', 10, 70);
    doc.setFontSize(12);
    doc.text(`Total Revenue: $${mockActivityStats.totalRevenueToday.toFixed(2)}`, 10, 80);
    doc.text(`Net Profit: $${mockActivityStats.netProfitToday.toFixed(2)}`, 10, 90);
    doc.text(`Total Customers: ${mockActivityStats.totalCustomersToday}`, 10, 100);
    doc.text(`Average Order Value: $${mockActivityStats.averageOrderValueToday.toFixed(2)}`, 10, 110);

    doc.save('owner_performance_report.pdf');
  };

  const handleGenerateCSVReport = () => {
    const headers = ["Date", "Total Revenue", "Net Profit", "Total Customers"];
    const rows = mockSalesData.map((sales, index) => {
      const profit = mockProfitData[index]?.profit || 0;
      const customers = mockCustomerData[index]?.customers || 0;
      return [sales.date, sales.sales, profit, customers];
    });

    let csvContent = headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'owner_restaurant_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  return (
    <div className="h-screen bg-[--color-background] font-inter p-4 sm:p-6 lg:p-8 overflow-auto custom-scrollbar"> {/* bg-gray-50 could be var(--bg-page) */}
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4"> 
        <div className="flex items-center  text-[--color-foreground]"> {/* text-[--color-foreground] could be var(--text-color-light) */}
          <span className="text-sm sm:text-base font-medium text-[--color-foreground]">{currentDate}</span>
          <span className="text-sm sm:text-base font-medium text-[--color-foreground]">{currentTime}</span>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"> {/* hover:bg-gray-100 could be var(--bg-hover), focus:ring-blue-400 could be var(--focus-ring-color) */}
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[--color-foreground]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Owner's Personal Info Card */}
        <div className="lg:col-span-1 bg-[--color-card-background] p-6 rounded-xl shadow-lg flex flex-col items-center text-center border border-gray-100 transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
          <div className="relative w-36 h-36 rounded-full overflow-hidden mb-5 border-4 border-blue-500 shadow-md"> {/* border-blue-500 could be var(--border-color-primary) */}
            <Image
              src={mockOwner.photo}
              alt={mockOwner.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <h2 className="text-2xl font-bold text-[--color-foreground] mb-1">{mockOwner.name}</h2>
          <p className="text-blue-600 text-lg font-medium mb-3">{mockOwner.role}</p> {/* text-blue-600 could be var(--text-color-primary) */}
          <div className="w-full space-y-2 text-[--color-foreground]">
            <p className="flex justify-between items-center text-base"><span className="font-semibold text-[--color-foreground]">Employee ID:</span> <span className="text-right font-medium">{mockOwner.employeeId}</span></p>
            <p className="flex justify-between items-center text-base"><span className="font-semibold text-[--color-foreground]">Status:</span> <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 shadow-sm">Active</span></p> {/* bg-green-100/text-green-800 could be var(--status-active-bg)/var(--status-active-text) */}
          </div>
        </div>

        {/* Restaurant Activity Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Revenue Today Card */}
          <div className="flex flex-col items-center justify-center p-5 rounded-xl shadow-md bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300 border border-green-200 transform hover:scale-[1.02]"> {/* bg-gradient could be var(--bg-gradient-green) */}
            <svg className="h-8 w-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1L21 6V3m0 0L2.23 21.027m0 0l-1.077-.384M2.23 21.027c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953M4.23 11c-1.11 0-2.08-.402-2.599-1L3 6V3m0 0l-.307.11m0 0c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953M6.23 11c-1.11 0-2.08-.402-2.599-1L5 6V3m0 0l-.307.11m0 0c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953" /></svg>
            <p className=" text-gray-700 font-semibold text-base mb-1">Total Revenue (Today)</p>
            <p className="text-2xl font-extrabold text-green-700">${mockActivityStats.totalRevenueToday.toFixed(2)}</p>
          </div>

          {/* Net Profit Today Card */}
          <div className="flex flex-col items-center justify-center p-5 rounded-xl shadow-md bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-lg transition-all duration-300 border border-teal-200 transform hover:scale-[1.02]">
            <svg className="h-8 w-8 text-teal-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1L21 6V3m0 0L2.23 21.027m0 0l-1.077-.384M2.23 21.027c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953M4.23 11c-1.11 0-2.08-.402-2.599-1L3 6V3m0 0l-.307.11m0 0c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953M6.23 11c-1.11 0-2.08-.402-2.599-1L5 6V3m0 0l-.307.11m0 0c-1.378 0-2.23-.42-2.23-.954 0-.533.852-.953 2.23-.953" /></svg>
            <p className=" text-gray-700 font-semibold text-base mb-1">Net Profit (Today)</p>
            <p className="text-2xl font-extrabold text-teal-700">${mockActivityStats.netProfitToday.toFixed(2)}</p>
          </div>

          {/* Total Customers Today Card */}
          <div className="flex flex-col items-center justify-center p-5 rounded-xl shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300 border border-blue-200 transform hover:scale-[1.02]">
            <svg className="h-8 w-8 text-blue-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 14v-7m0 0l3-3m-3 3l-3-3m-2-4a4 4 0 11-8 0 4 4 0 018 0zM12 14v-2m0 0L9 9m3 3l3 3"></path></svg>
            <p className=" text-gray-700 font-semibold text-base mb-1">Total Customers (Today)</p>
            <p className="text-2xl font-extrabold text-blue-700">{mockActivityStats.totalCustomersToday}</p>
          </div>

          {/* Average Order Value Today Card */}
          <div className="flex flex-col items-center justify-center p-5 rounded-xl shadow-md bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300 border border-purple-200 transform hover:scale-[1.02]">
            <svg className="h-8 w-8 text-purple-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <p className=" text-gray-700 font-semibold text-base mb-1">Avg. Order Value (Today)</p>
            <p className="text-2xl font-extrabold text-purple-700">${mockActivityStats.averageOrderValueToday.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* My Working Hours & My Attendance & My Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* My Working Hours Card */}
        <div className="bg-[--color-card-background] p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-[1.01]">
          <h3 className="text-xl font-bold text-[--color-foreground] mb-4">My Working Hours</h3>
          <div className="space-y-3">
            <p className="text-[--color-foreground] text-lg">Total Hours Worked Today: <span className="font-extrabold text-blue-600">{mockWorkingHours.totalHoursToday} hrs</span></p>
            <p className="text-[--color-foreground] text-lg">Total Hours Worked This Week: <span className="font-extrabold text-blue-600">{mockWorkingHours.totalHoursThisWeek} hrs</span></p>
          </div>
        </div>

        {/* My Attendance Information Card */}
        <div className="bg-[--color-card-background] p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-[1.01]">
          <h3 className="text-xl font-bold text-[--color-foreground] mb-4">My Attendance (Current Month)</h3>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <p className="text-[--color-foreground]">Days Present: <span className="font-extrabold text-green-600">{mockAttendanceInfo.daysPresent}</span></p>
            <p className="text-[--color-foreground]">Days Absent: <span className="font-extrabold text-red-600">{mockAttendanceInfo.daysAbsent}</span></p>
            <p className="text-[--color-foreground]">Days on Leave: <span className="font-extrabold text-yellow-600">{mockAttendanceInfo.daysOnLeave}</span></p>
            <p className="text-[--color-foreground]">Half-Days: <span className="font-extrabold text-blue-600">{mockAttendanceInfo.halfDays}</span></p>
          </div>
        </div>

        {/* My Recent Activity Log Card */}
        <div className="lg:col-span-1 bg-[--color-card-background] p-6 rounded-xl shadow-lg border border-gray-100 transform transition-transform duration-300 hover:scale-[1.01]">
          <h3 className="text-xl font-bold text-[--color-foreground] mb-4">My Recent Activity Log</h3>
          <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto custom-scrollbar">
            {mockRecentActivity.map(activity => (
              <li key={activity.id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[--color-foreground]">
                <span className="font-medium text-base mb-1 sm:mb-0">{activity.action}</span>
                <span className="text-sm text-gray-500">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Restaurant Performance Reports Section */}
      <div className="bg-[--color-card-background] p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
        <h3 className="text-2xl font-bold text-[--color-foreground] mb-6">Restaurant Performance Reports</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Total Revenue Trends Chart */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 text-center mb-4">Total Revenue Trends (Last 7 Days)</h4>
            <div className="h-64">
              <Line options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Total Revenue Trends (Last 7 Days)' } } }} data={salesChartData} />
            </div>
          </div>
          {/* Net Profit Trends Chart */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 text-center mb-4">Net Profit Trends (Last 7 Days)</h4>
            <div className="h-64">
              <Line options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Net Profit Trends (Last 7 Days)' } } }} data={profitChartData} />
            </div>
          </div>
          {/* Total Customers Over Time Chart */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-inner border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 text-center mb-4">Total Customers Over Time (Last 7 Days)</h4>
            <div className="h-64">
              <Bar options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Total Customers Over Time (Last 7 Days)' } } }} data={customerChartData} />
            </div>
          </div>
        </div>

        {/* Report Generation Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleGeneratePDFReport}
            className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path></svg>
            Generate PDF Report
          </button>
          <button
            onClick={handleGenerateCSVReport}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V11m-9 9H5v-5m0 0l-2 2"></path><path d="M19 3l-6 6-6-6"></path></svg>
            Generate CSV Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfilePage;
