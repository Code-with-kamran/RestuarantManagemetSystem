// pages/employee-profile/[id].tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
// Corrected import path assuming mockData is in utils/mockData.ts at the project root
import { MOCK_STAFF, StaffMember } from "../../../lib/mockdata";

const EmployeeProfilePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [staffMember, setStaffMember] = useState<StaffMember | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));

    if (id) {
      const foundStaff = MOCK_STAFF.find(s => s.id === id);
      setStaffMember(foundStaff || null);
    }
  }, [id]);

  if (!staffMember) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 bg-gray-50">
        Loading or Staff Member not found...
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Attendance summary
  const calculateAttendanceSummary = (attendance: StaffMember['attendanceRecords']) => {
    if (!attendance) return { totalDays: 0, presentDays: 0, absentDays: 0, halfDays: 0 };
    const totalDays = attendance.length;
    const presentDays = attendance.filter(r => r.status === "Present").length;
    const absentDays = attendance.filter(r => r.status === "Absent").length;
    const halfDays = attendance.filter(r => r.status === "Half-Day").length;
    return { totalDays, presentDays, absentDays, halfDays };
  };

  const attendanceSummary = calculateAttendanceSummary(staffMember.attendanceRecords || []);

  // Simple bar chart component (for Attendance)
  const BarChart = ({ data, max, color, label }: { data: number; max: number; color: string; label: string }) => {
    const height = 100; // Increased height for better visual
    const barWidth = 30; // Adjusted width
    const scale = max === 0 ? 0 : height / max;
    const barHeight = data * scale;
    return (
      <div className="flex flex-col items-center mx-3">
        <div
          className="w-8 rounded-t-md transition-all duration-300 ease-in-out" // Added rounded-t-md
          style={{
            height: `${barHeight}px`,
            backgroundColor: color,
            minHeight: data > 0 ? '5px' : '0' // Ensure small bars are visible
          }}
        ></div>
        <span className="text-xs text-gray-600 mt-2">{label}</span>
        <span className="text-sm font-semibold text-gray-800">{data}</span>
      </div>
    );
  };

  // Helper for a simple Donut chart (SVG) - for Leave
  const DonutChart = ({ data, size = 120, strokeWidth = 20 }: { data: { value: number; color: string; label: string }[]; size?: number; strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    if (total === 0) {
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    }

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((item, index) => {
          const strokeDasharray = `${(item.value / total) * circumference} ${circumference}`;
          const offset = currentOffset;
          currentOffset += (item.value / total) * circumference;
          return (
            <circle
              key={index} // Added key prop
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    );
  };

  // Helper for a simple radar chart (SVG) - for Performance
  const RadarChart = ({ metrics }: { metrics: StaffMember['performanceMetrics'] }) => {
    if (!metrics || metrics.length === 0) return <p className="text-gray-500 text-sm text-center">No performance data available.</p>;

    const size = 180; // Larger size for better detail
    const center = size / 2;
    const radius = size / 2 - 25; // Padding for labels
    const numPoints = metrics.length;
    const angleStep = (2 * Math.PI) / numPoints;

    const points = metrics.map((metric, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const valueRatio = metric.score / metric.maxScore;
      const x = center + radius * valueRatio * Math.cos(angle);
      const y = center + radius * valueRatio * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size}>
          {/* Grid lines (concentric circles) */}
          {[0.25, 0.5, 0.75, 1].map((r, i) => (
            <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="#e0e0e0" strokeWidth="0.5" />
          ))}
          {/* Axis lines */}
          {metrics.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return <line key={`axis-${i}`} x1={center} y1={center} x2={x2} y2={y2} stroke="#e0e0e0" strokeWidth="0.5" />;
          })}
          {/* Data polygon */}
          <polygon points={points} fill="rgba(66, 153, 225, 0.4)" stroke="#4299e1" strokeWidth="2" />
          {/* Labels */}
          {metrics.map((metric, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelX = center + (radius + 20) * Math.cos(angle);
            const labelY = center + (radius + 20) * Math.sin(angle);
            return (
              <text
                key={`label-${i}`} // Added key prop
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="#333"
              >
                {metric.name}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  const leaveSummaryData = staffMember.leaveRecords ? [
    { value: staffMember.leaveRecords.filter(l => l.type === 'Casual Leave' && l.status === 'Approved').length, color: '#4299e1', label: 'Casual' },
    { value: staffMember.leaveRecords.filter(l => l.type === 'Sick Leave' && l.status === 'Approved').length, color: '#f6ad55', label: 'Sick' },
    { value: staffMember.leaveRecords.filter(l => l.type === 'Vacation' && l.status === 'Approved').length, color: '#68d391', label: 'Vacation' },
    { value: staffMember.leaveRecords.filter(l => l.status === 'Pending').length, color: '#ecc94b', label: 'Pending' },
  ] : [];

  const totalApprovedLeaves = leaveSummaryData.reduce((sum, item) => sum + item.value, 0);


  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 md:p-8">
      {/* Top Bar with back arrow and current date/time */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="flex items-center space-x-4 text-gray-600">
          <span className="text-sm">{currentDate}, {currentTime}</span>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
        </div>
      </div>

      {/* Main Profile Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="relative w-36 h-36 rounded-full overflow-hidden mb-4 border-4 border-blue-300 shadow-md">
            <Image src={staffMember.avatar} alt={staffMember.name} layout="fill" objectFit="cover" />
            <span className="absolute bottom-2 right-2 bg-orange-500 text-white rounded-full p-2 text-xs flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4v16m8-8H4"></path></svg>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{staffMember.name}</h2>
          <p className="text-blue-600 text-lg font-medium">{staffMember.jobTitle}</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-3 shadow-sm">
            Active
          </span>
          <div className="mt-4 space-y-2 text-gray-700 text-center">
            <p><span className="font-semibold">Role:</span> {staffMember.role}</p>
            <p><span className="font-semibold">Position:</span> {staffMember.positionInDept}</p>
            <p><span className="font-semibold">Email:</span> <a href={`mailto:${staffMember.email}`} className="text-blue-600 hover:underline">{staffMember.email}</a></p>
            <p><span className="font-semibold">Phone:</span> {staffMember.contactInfo}</p>
            <p><span className="font-semibold">Company:</span> {staffMember.companyName}</p>
          </div>
          <div className="flex space-x-4 mt-5">
            {staffMember.socialMedia.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                {link.platform === 'LinkedIn' && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                )}
                {/* Add more social media icons as needed */}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Column: Calendar and Upcoming Events */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Calendar</h3>
            <div className="flex justify-between items-center mb-3">
              <button className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <span className="font-semibold text-lg text-gray-800">JULY 2020</span>
              <button className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
            <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-2 font-medium">
              <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
            </div>
            <div className="grid grid-cols-7 text-center text-gray-800">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <span key={day} className={`p-1 rounded-full text-sm font-medium
                  ${day === 24 || day === 27 ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-50 transition-colors duration-200'}`}>
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Upcoming Events</h3>
              <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3 shadow-sm">
                <div className="p-3 rounded-full bg-blue-200 text-blue-800 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Design review</p>
                  <p className="text-sm text-gray-600">9:00 AM - 10:00 AM</p>
                </div>
              </div>
              {/* More events can be added here */}
            </div>
          </div>
        </div>

        {/* Right Column: Basic, Personal, Occupation, Onboarding */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Basic Information <span className="text-sm text-gray-500">(Non-Editable)</span></h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Hire Date</p>
                <p className="font-medium">{formatDate(staffMember.hireDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Worked for</p>
                <p className="font-medium">{staffMember.workedFor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium">{staffMember.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">SSN</p>
                <p className="font-medium">{staffMember.ssn}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information <span className="text-sm text-gray-500">(Editable)</span></h3>
            <div className="grid grid-cols-1 gap-y-3 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Birth Date</p>
                <p className="font-medium">{formatDate(staffMember.birthDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{staffMember.address}, {staffMember.city}, {staffMember.state}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Occupation Information <span className="text-sm text-gray-500">(Non-Editable)</span></h3>
            <div className="flex flex-wrap justify-around items-center mt-4 gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <span className="text-sm text-gray-700 font-medium">{staffMember.employmentType}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mb-2 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <span className="text-sm text-gray-700 font-medium">{staffMember.occupationArea}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600 mb-2 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <span className="text-sm text-gray-700 font-medium">{staffMember.occupationLocation}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Onboarding</h3>
              <span className="text-sm text-gray-500">{staffMember.onboardingTasks.filter(t => t.completed).length}/{staffMember.onboardingTasks.length} completed</span>
            </div>
            <div className="space-y-3">
              {staffMember.onboardingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md shadow-sm">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      readOnly
                      className="form-checkbox h-4 w-4 text-blue-600 rounded mr-3"
                    />
                    <div>
                      <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{task.task}</p>
                      <p className="text-xs text-gray-500">Assigned: {task.assignedTo}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-2">
                    <span>{task.dueDate}</span>
                    {task.attachment && (
                      <a href="#" className="text-blue-600 hover:underline">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13.5"></path></svg>
                      </a>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
              <button className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-md hover:bg-blue-100 flex items-center justify-center text-sm font-medium shadow-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4v16m8-8H4"></path></svg>
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Sections: Attendance, Leave, Work Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Attendance Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance</h3>
          {staffMember.attendanceRecords && staffMember.attendanceRecords.length > 0 ? (
            <>
              <div className="flex justify-around items-end mb-6 py-4 border-b border-gray-200">
                <BarChart data={attendanceSummary.presentDays} max={attendanceSummary.totalDays} color="#4CAF50" label="Present" />
                <BarChart data={attendanceSummary.absentDays} max={attendanceSummary.totalDays} color="#F44336" label="Absent" />
                <BarChart data={attendanceSummary.halfDays} max={attendanceSummary.totalDays} color="#FFC107" label="Half-Day" />
              </div>
              <p className="text-sm text-gray-600 text-center mb-4">Last 30 Days Attendance Summary</p>
              <h4 className="font-semibold text-gray-800 mb-3">Recent Records:</h4>
              <ul className="space-y-2 text-sm text-gray-700 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {staffMember.attendanceRecords.slice(-5).reverse().map((record, index) => ( // Show last 5
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md shadow-sm">
                    <span className="font-medium">{formatDate(record.date)}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${record.status === 'Present' ? 'bg-green-100 text-green-800' :
                        record.status === 'Absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {record.status}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500 text-sm text-center">No attendance records available.</p>
          )}
        </div>

        {/* Leave Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave Overview</h3>
          {staffMember.leaveRecords && staffMember.leaveRecords.length > 0 ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <DonutChart data={leaveSummaryData} size={150} strokeWidth={25} />
                <p className="text-sm text-gray-600 mt-3">Total Approved Leaves: <span className="font-semibold text-gray-800">{totalApprovedLeaves}</span></p>
              </div>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm mb-4">
                {leaveSummaryData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2 shadow-sm" style={{ backgroundColor: item.color }}></span>
                    <span className="font-medium text-gray-700">{item.label}: <span className="font-semibold text-gray-900">{item.value}</span></span>
                  </div>
                ))}
              </div>
              <h4 className="font-semibold text-gray-800 mb-3">Recent Leave Requests:</h4>
              <ul className="space-y-2 text-sm text-gray-700 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {staffMember.leaveRecords.slice(-3).reverse().map((leave, index) => ( // Show last 3
                  <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md shadow-sm">
                    <span className="font-medium">{leave.type} ({formatDate(leave.startDate)} - {formatDate(leave.endDate)})</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {leave.status}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500 text-sm text-center">No leave records available.</p>
          )}
        </div>

        {/* Work Performance Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"> {/* Span 2 columns for performance */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Work Performance</h3>
          {staffMember.performanceMetrics && staffMember.performanceMetrics.length > 0 ? (
            <div className="flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="mb-4 md:mb-0">
                <RadarChart metrics={staffMember.performanceMetrics} />
              </div>
              <div className="space-y-3 text-sm text-gray-700 w-full md:w-auto">
                <h4 className="font-semibold text-gray-800 mb-2">Metrics Summary:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {staffMember.performanceMetrics.map((metric, index) => (
                    <p key={index} className="flex justify-between items-center">
                      <span className="font-medium">{metric.name}:</span>
                      <span className="font-semibold text-gray-900 ml-2">{metric.score}/{metric.maxScore}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">No performance metrics available.</p>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 shadow-sm text-sm font-medium"
        >
          Back
        </button>
        <button
          onClick={() => router.push('/staff')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md text-sm font-medium"
        >
          Back to Staff List
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
