// lib/mockdata.ts

export type AttendanceRecord = {
  date: string;
  status: 'Present' | 'Absent' | 'Half-Day';
};

export type LeaveRecord = {
  type: string;
  startDate: string;
  endDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
};

export type PerformanceMetric = {
  name: string;
  score: number;
  maxScore: number;
};

export type OnboardingTask = {
  task: string;
  completed: boolean;
  assignedTo: string;
  dueDate: string;
  attachment?: string;
};

export type StaffMember = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  positionInDept: string;
  email: string;
  contactInfo: string;
  companyName: string;
  socialMedia: { platform: string; url: string }[];
  hireDate: string;
  workedFor: string;
  employeeId: string;
  ssn: string;
  birthDate: string;
  address: string;
  city: string;
  state: string;
  employmentType: string;
  occupationArea: string;
  occupationLocation: string;
  onboardingTasks: OnboardingTask[];
  attendanceRecords?: AttendanceRecord[];
  leaveRecords?: LeaveRecord[];
  performanceMetrics?: PerformanceMetric[];
};

const generateAttendance = (): AttendanceRecord[] => {
  const statuses: AttendanceRecord['status'][] = ['Present', 'Absent', 'Half-Day'];
  const records: AttendanceRecord[] = [];
  for (let i = 10; i >= 1; i--) {
    records.push({
      date: `2025-07-${i.toString().padStart(2, '0')}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return records;
};

const generateLeaves = (): LeaveRecord[] => [
  {
    type: 'Sick Leave',
    startDate: '2025-06-01',
    endDate: '2025-06-02',
    status: 'Approved',
  },
  {
    type: 'Vacation',
    startDate: '2025-05-10',
    endDate: '2025-05-15',
    status: 'Pending',
  },
];

const generateMetrics = (): PerformanceMetric[] => [
  { name: 'Code Quality', score: Math.floor(Math.random() * 100), maxScore: 100 },
  { name: 'Teamwork', score: Math.floor(Math.random() * 100), maxScore: 100 },
  { name: 'Productivity', score: Math.floor(Math.random() * 100), maxScore: 100 },
  { name: 'Communication', score: Math.floor(Math.random() * 100), maxScore: 100 },
];

const generateOnboarding = (): OnboardingTask[] => [
  {
    task: 'Submit Documents',
    completed: Math.random() > 0.5,
    assignedTo: 'HR',
    dueDate: '2025-04-15',
  },
  {
    task: 'Setup Workstation',
    completed: Math.random() > 0.5,
    assignedTo: 'IT',
    dueDate: '2025-04-16',
  },
];

export const MOCK_STAFF: StaffMember[] = [
  {
    id: "EMP005",
    name: "John Doe",
    avatar: "/avatar.jpg",
    role: "Software Engineer",
    positionInDept: "Frontend Developer",
    email: "john.doe@example.com",
    contactInfo: "(123) 456-7890",
    companyName: "TechCorp Inc.",
    socialMedia: [{ platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" }],
    hireDate: "2022-04-01",
    workedFor: "2 years, 3 months",
    employeeId: "EMP005",
    ssn: "XXX-XX-7890",
    birthDate: "1992-09-10",
    address: "202 Maple Dr",
    city: "Anytown",
    state: "CA",
    employmentType: "Full-Time",
    occupationArea: "Service",
    occupationLocation: "Anytown, CA",
    onboardingTasks: generateOnboarding(),
    attendanceRecords: generateAttendance(),
    leaveRecords: generateLeaves(),
    performanceMetrics: generateMetrics(),
  },

  {
    id: "EMP006",
    name: "Alice Smith",
    avatar: "/avatar2.jpg",
    role: "UI/UX Designer",
    positionInDept: "Design Lead",
    email: "alice.smith@example.com",
    contactInfo: "(321) 654-0987",
    companyName: "DesignPro",
    socialMedia: [{ platform: "LinkedIn", url: "https://linkedin.com/in/alicesmith" }],
    hireDate: "2021-11-12",
    workedFor: "3 years, 8 months",
    employeeId: "EMP006",
    ssn: "XXX-XX-2345",
    birthDate: "1990-05-17",
    address: "45 Pine St",
    city: "Sunnyvale",
    state: "CA",
    employmentType: "Full-Time",
    occupationArea: "Design",
    occupationLocation: "Sunnyvale, CA",
    onboardingTasks: generateOnboarding(),
    attendanceRecords: generateAttendance(),
    leaveRecords: generateLeaves(),
    performanceMetrics: generateMetrics(),
  },

  {
    id: "EMP007",
    name: "Michael Johnson",
    avatar: "/avatar3.jpg",
    role: "Backend Developer",
    positionInDept: "API Specialist",
    email: "michael.johnson@example.com",
    contactInfo: "(987) 654-3210",
    companyName: "DataWorks",
    socialMedia: [{ platform: "LinkedIn", url: "https://linkedin.com/in/mjohnson" }],
    hireDate: "2020-03-15",
    workedFor: "5 years, 4 months",
    employeeId: "EMP007",
    ssn: "XXX-XX-6789",
    birthDate: "1988-12-05",
    address: "12 Cedar Ave",
    city: "San Jose",
    state: "CA",
    employmentType: "Full-Time",
    occupationArea: "Development",
    occupationLocation: "San Jose, CA",
    onboardingTasks: generateOnboarding(),
    attendanceRecords: generateAttendance(),
    leaveRecords: generateLeaves(),
    performanceMetrics: generateMetrics(),
  },

  {
    id: "EMP008",
    name: "Samantha Lee",
    avatar: "/avatar4.jpg",
    role: "QA Engineer",
    positionInDept: "Test Automation",
    email: "samantha.lee@example.com",
    contactInfo: "(555) 123-4567",
    companyName: "QualityFirst",
    socialMedia: [{ platform: "LinkedIn", url: "https://linkedin.com/in/samanthalee" }],
    hireDate: "2023-02-10",
    workedFor: "1 year, 5 months",
    employeeId: "EMP008",
    ssn: "XXX-XX-3456",
    birthDate: "1995-08-22",
    address: "99 Spruce St",
    city: "Santa Clara",
    state: "CA",
    employmentType: "Part-Time",
    occupationArea: "Testing",
    occupationLocation: "Santa Clara, CA",
    onboardingTasks: generateOnboarding(),
    attendanceRecords: generateAttendance(),
    leaveRecords: generateLeaves(),
    performanceMetrics: generateMetrics(),
  },

  // Duplicate and vary for more people
  ...Array.from({ length: 11 }, (_, i) => ({
    id: `EMP${9 + i}`,
    name: `Employee ${i + 5}`,
    avatar: `/avatar${(i % 4) + 1}.jpg`,
    role: ["DevOps Engineer", "HR Manager", "Marketing Specialist", "Support Agent"][i % 4],
    positionInDept: ["Infrastructure", "Recruitment", "SEO", "Customer Service"][i % 4],
    email: `employee${i + 5}@example.com`,
    contactInfo: `(555) 000-00${i + 10}`,
    companyName: ["TechCorp Inc.", "DesignPro", "DataWorks", "QualityFirst"][i % 4],
    socialMedia: [{ platform: "LinkedIn", url: `https://linkedin.com/in/employee${i + 5}` }],
    hireDate: `202${Math.floor(i/4)+1}-0${(i % 9) + 1}-15`,
    workedFor: `${Math.floor(Math.random() * 6)} years, ${Math.floor(Math.random() * 12)} months`,
    employeeId: `EMP${9 + i}`,
    ssn: `XXX-XX-${1000 + i}`,
    birthDate: `199${Math.floor(Math.random() * 10)}-${(Math.floor(Math.random() * 12) + 1)
      .toString()
      .padStart(2, "0")}-${(Math.floor(Math.random() * 28) + 1).toString().padStart(2, "0")}`,
    address: `${100 + i} Elm St`,
    city: ["Anytown", "Sunnyvale", "San Jose", "Santa Clara"][i % 4],
    state: "CA",
    employmentType: ["Full-Time", "Part-Time"][i % 2],
    occupationArea: ["Service", "Design", "Development", "Support"][i % 4],
    occupationLocation: `${["Anytown", "Sunnyvale", "San Jose", "Santa Clara"][i % 4]}, CA`,
    onboardingTasks: generateOnboarding(),
    attendanceRecords: generateAttendance(),
    leaveRecords: generateLeaves(),
    performanceMetrics: generateMetrics(),
  })),
];
