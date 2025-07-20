// lib/mockdata.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  total: number;
}

export interface Transaction {
  id: string;
  date: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
}

export interface Register {
  id: string;
  name: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  dateJoined: string;
  isActive: boolean;
  experience: { title: string; company: string; years: number }[];
  skills: string[];
  profileImage: string;
  firstName: string;
  lastName: string;
  department: string;
  jobTitle: string;
  manager: string;
  location: string;
  contactInfo: string;
  address: string;
  city: string;
  state: string;
  education: { degree: string; institution: string; year: number }[];
  avatar: string;
  onLeave: boolean;
  onboarding: boolean;
  hireDate: string;
  workedFor: string;
  employeeId: string;
  ssn: string;
  birthDate: string;
  maritalStatus: string;
  gender: string;
  race: string;
  ethnicity: string;
  religion: string;
  height: string;
  weight: string;
  bloodType: string;
  allergies: string;
  medicalConditions: string;
  emergencyContactName: string;
  positionInDept: string;
  supervisor: string;
  companyName: string;
  socialMedia: { platform: string; url: string }[];
  attendanceRecords: { date: string; status: string }[];
  leaveRecords: { type: string; startDate: string; endDate: string; status: string }[];
  performanceMetrics: { name: string; score: number; maxScore: number }[];
  onboardingTasks: {
    task: string;
    completed: boolean;
    assignedTo: string;
    dueDate: string;
    attachment?: boolean;
  }[];
}


export const MOCK_PRODUCTS: Product[] = [
  { id: "p1", name: "Tikka Burger", price: 250.0, category: "BURGERS", image: "https://placehold.co/100x100/A0D9B0/000000?text=Burger", description: "A classic juicy chicken patty seasoned with rich tikka spices." },
  { id: "p2", name: "Zinger Burger", price: 300.0, category: "BURGERS", image: "https://placehold.co/100x100/FFD700/000000?text=Zinger", description: "Crispy, succulent chicken fillet with a zesty coating." },
  { id: "p3", name: "Pizza (Small)", price: 500.0, category: "PIZZA", image: "https://placehold.co/100x100/FFA07A/000000?text=Pizza", description: "Delicious small pizza with a crispy crust." },
  { id: "p4", name: "Fries (Medium)", price: 120.0, category: "SIDES", image: "https://placehold.co/100x100/DDA0DD/000000?text=Fries", description: "Golden, crispy medium-sized fries." },
  { id: "p5", name: "Coke (Can)", price: 80.0, category: "DRINKS", image: "https://placehold.co/100x100/ADD8E6/000000?text=Coke", description: "Refreshingly cold can of Coca-Cola." },
  { id: "p6", name: "Chicken Roll", price: 180.0, category: "ROLLS", image: "https://placehold.co/100x100/87CEEB/000000?text=Roll", description: "Tender chicken pieces wrapped in a warm, soft paratha." },
  { id: "p7", name: "Veggie Burger", price: 220.0, category: "BURGERS", image: "https://placehold.co/100x100/90EE90/000000?text=Veggie", description: "A wholesome and flavorful vegetarian patty." },
  { id: "p8", name: "Large Pizza", price: 900.0, category: "PIZZA", image: "https://placehold.co/100x100/F0E68C/000000?text=LgPizza", description: "Our signature large pizza, generously topped." },
  { id: "p9", name: "Onion Rings", price: 150.0, category: "SIDES", image: "https://placehold.co/100x100/B0E0E6/000000?text=Rings", description: "Crispy, golden-brown onion rings." },
  { id: "p10", name: "Water Bottle", price: 50.0, category: "DRINKS", image: "https://placehold.co/100x100/ADD8E6/000000?text=Water", description: "Pure, refreshing bottled water." },
  { id: "p11", name: "Club Sandwich", price: 350.0, category: "SANDWICHES", image: "https://placehold.co/100x100/FFD700/000000?text=Sandwich", description: "A hearty triple-layered sandwich." },
  { id: "p12", name: "Pasta", price: 400.0, category: "MAIN COURSE", image: "https://placehold.co/100x100/FFA07A/000000?text=Pasta", description: "Creamy and rich pasta dish." },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "T001", date: "2024-07-15 14:30", total: 770.00, items: [{ name: "Tikka Burger", quantity: 2, price: 250 }, { name: "Fries (Medium)", quantity: 1, price: 120 }, { name: "Coke (Can)", quantity: 2, price: 80 }], paymentMethod: "Cash" },
  { id: "T002", date: "2024-07-15 11:00", total: 540.00, items: [{ name: "Zinger Burger", quantity: 1, price: 300 }, { name: "Water Bottle", quantity: 1, price: 50 }, { name: "Onion Rings", quantity: 1, price: 150 }], paymentMethod: "Debit Card" },
  { id: "T003", date: "2024-07-14 18:45", total: 900.00, items: [{ name: "Large Pizza", quantity: 1, price: 900 }], paymentMethod: "Cash" },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: "C001", name: "Walk-in Customer" },
  { id: "C002", name: "John Doe" },
  { id: "C003", name: "Jane Smith" },
];

export const MOCK_REGISTERS: Register[] = [
  { id: "R001", name: "Main Counter" },
  { id: "R002", name: "Drive-Thru" },
  { id: "R003", name: "Online Orders" },
];

export const MOCK_STAFF: StaffMember[] = [
  {
    "id": "staff-001",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "123-456-7890",
    "role": "Manager",
    "dateJoined": "2020-01-15",
    "isActive": true,
    "experience": [
      { "title": "Assistant Manager", "company": "Retail Co.", "years": 3 },
      { "title": "Sales Associate", "company": "Fashion Store", "years": 2 }
    ],
    "skills": ["Leadership", "Customer Service", "Inventory Management", "Team Building"],
    "profileImage": "https://placehold.co/150x150/FF5733/FFFFFF?text=AJ",
    "firstName": "Alice",
    "lastName": "Johnson",
    "department": "Operations",
    "jobTitle": "Store Manager",
    "manager": "N/A",
    "location": "New York, NY",
    "contactInfo": "alice.johnson@example.com",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "education": [
      { "degree": "B.A. Business Administration", "institution": "State University", "year": 2015 }
    ],
    "avatar": "https://placehold.co/150x150/FF5733/FFFFFF?text=AJ",
    "onLeave": false,
    "onboarding": false,
    "hireDate": "2020-01-15",
    "workedFor": "5 years",
    "employeeId": "EMP-001",
    "ssn": "XXX-XX-1234",
    "birthDate": "1988-05-20",
    "positionInDept": "Team Lead",
    "companyName": "Acme Corp",
    "socialMedia": [
      { "platform": "LinkedIn", "url": "https://linkedin.com/in/alicejohnson" }
    ],
    "attendanceRecords": [
      { "date": "2025-07-01", "status": "Present" },
      { "date": "2025-07-02", "status": "Present" },
      { "date": "2025-07-03", "status": "Absent" },
      { "date": "2025-07-04", "status": "Present" },
      { "date": "2025-07-05", "status": "Half-Day" },
      { "date": "2025-07-08", "status": "Present" },
      { "date": "2025-07-09", "status": "Present" },
      { "date": "2025-07-10", "status": "Present" },
      { "date": "2025-07-11", "status": "Present" },
      { "date": "2025-07-12", "status": "Present" }
    ],
    "leaveRecords": [
      { "type": "Casual Leave", "startDate": "2025-06-10", "endDate": "2025-06-12", "status": "Approved" },
      { "type": "Sick Leave", "startDate": "2025-07-03", "endDate": "2025-07-03", "status": "Approved" },
      { "type": "Vacation", "startDate": "2025-08-01", "endDate": "2025-08-05", "status": "Pending" }
    ],
    "performanceMetrics": [
      { "name": "Productivity", "score": 85, "maxScore": 100 },
      { "name": "Quality", "score": 90, "maxScore": 100 },
      { "name": "Teamwork", "score": 95, "maxScore": 100 },
      { "name": "Innovation", "score": 70, "maxScore": 100 }
    ],
    "onboardingTasks": [
      { "task": "Complete HR paperwork", "completed": true, "assignedTo": "HR", "dueDate": "2020-01-20" },
      { "task": "Attend orientation session", "completed": true, "assignedTo": "HR", "dueDate": "2020-01-22" },
      { "task": "Setup development environment", "completed": false, "assignedTo": "IT", "dueDate": "2020-01-25", "attachment": true }
    ],
    maritalStatus: "",
    gender: "",
    race: "",
    ethnicity: "",
    religion: "",
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
    emergencyContactName: "",
    supervisor: ""
  },
  {
    "id": "staff-002",
    "name": "Bob Williams",
    "email": "bob.williams@example.com",
    "phone": "987-654-3210",
    "role": "Cashier",
    "dateJoined": "2021-03-01",
    "isActive": true,
    "experience": [
      { "title": "Customer Service Rep", "company": "Call Center Inc.", "years": 1 }
    ],
    "skills": ["Cash Handling", "POS Systems", "Problem Solving"],
    "profileImage": "https://placehold.co/150x150/3366FF/FFFFFF?text=BW",
    "firstName": "Bob",
    "lastName": "Williams",
    "department": "Sales",
    "jobTitle": "Senior Cashier",
    "manager": "Alice Johnson",
    "location": "New York, NY",
    "contactInfo": "bob.williams@example.com",
    "address": "456 Oak Ave",
    "city": "New York",
    "state": "NY",
    "education": [
      { "degree": "High School Diploma", "institution": "Local High School", "year": 2019 }
    ],
    "avatar": "https://placehold.co/150x150/3366FF/FFFFFF?text=BW",
    "onLeave": false,
    "onboarding": false,
    "hireDate": "2021-03-01",
    "workedFor": "3 years",
    "employeeId": "EMP-002",
    "ssn": "XXX-XX-5678",
    "birthDate": "1995-11-10",
    "positionInDept": "Cashier",
    "companyName": "Acme Corp",
    "socialMedia": [],
    "attendanceRecords": [
      { "date": "2025-07-01", "status": "Present" },
      { "date": "2025-07-02", "status": "Present" },
      { "date": "2025-07-03", "status": "Present" },
      { "date": "2025-07-04", "status": "Present" },
      { "date": "2025-07-05", "status": "Present" },
      { "date": "2025-07-08", "status": "Present" },
      { "date": "2025-07-09", "status": "Present" },
      { "date": "2025-07-10", "status": "Present" },
      { "date": "2025-07-11", "status": "Half-Day" },
      { "date": "2025-07-12", "status": "Present" }
    ],
    "leaveRecords": [
      { "type": "Sick Leave", "startDate": "2025-05-01", "endDate": "2025-05-01", "status": "Approved" }
    ],
    "performanceMetrics": [
      { "name": "Accuracy", "score": 98, "maxScore": 100 },
      { "name": "Speed", "score": 92, "maxScore": 100 },
      { "name": "Customer Feedback", "score": 88, "maxScore": 100 }
    ],
    "onboardingTasks": [
      { "task": "Review POS system manual", "completed": true, "assignedTo": "Manager", "dueDate": "2021-03-05" },
      { "task": "Shadow senior cashier", "completed": true, "assignedTo": "Manager", "dueDate": "2021-03-10" }
    ],
    maritalStatus: "",
    gender: "",
    race: "",
    ethnicity: "",
    religion: "",
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
    emergencyContactName: "",
    supervisor: ""
  },
  {
    "id": "staff-003",
    "name": "Charlie Brown",
    "email": "charlie.brown@example.com",
    "phone": "555-123-4567",
    "role": "Chef",
    "dateJoined": "2019-07-20",
    "isActive": true,
    "experience": [
      { "title": "Sous Chef", "company": "Gourmet Bistro", "years": 4 },
      { "title": "Line Cook", "company": "Local Diner", "years": 2 }
    ],
    "skills": ["Cooking", "Menu Planning", "Food Safety", "Inventory Management"],
    "profileImage": "https://placehold.co/150x150/33FF66/FFFFFF?text=CB",
    "firstName": "Charlie",
    "lastName": "Brown",
    "department": "Kitchen",
    "jobTitle": "Head Chef",
    "manager": "Alice Johnson",
    "location": "New York, NY",
    "contactInfo": "charlie.brown@example.com",
    "address": "789 Pine Ln",
    "city": "New York",
    "state": "NY",
    "education": [
      { "degree": "Culinary Arts Diploma", "institution": "Culinary Institute", "year": 2017 }
    ],
    "avatar": "https://placehold.co/150x150/33FF66/FFFFFF?text=CB",
    "onLeave": true,
    "onboarding": false,
    "hireDate": "2019-07-20",
    "workedFor": "6 years",
    "employeeId": "EMP-003",
    "ssn": "XXX-XX-9012",
    "birthDate": "1985-01-01",
    "positionInDept": "Head Chef",
    "companyName": "Acme Corp",
    "socialMedia": [],
    "attendanceRecords": [
      { "date": "2025-07-01", "status": "Present" },
      { "date": "2025-07-02", "status": "Present" },
      { "date": "2025-07-03", "status": "Present" },
      { "date": "2025-07-04", "status": "Present" },
      { "date": "2025-07-05", "status": "Absent" },
      { "date": "2025-07-08", "status": "Present" },
      { "date": "2025-07-09", "status": "Present" },
      { "date": "2025-07-10", "status": "Present" },
      { "date": "2025-07-11", "status": "Present" },
      { "date": "2025-07-12", "status": "Absent" }
    ],
    "leaveRecords": [
      { "type": "Vacation", "startDate": "2025-07-05", "endDate": "2025-07-07", "status": "Approved" }
    ],
    "performanceMetrics": [
      { "name": "Creativity", "score": 92, "maxScore": 100 },
      { "name": "Efficiency", "score": 88, "maxScore": 100 },
      { "name": "Hygiene", "score": 99, "maxScore": 100 }
    ],
    "onboardingTasks": [
      { "task": "Kitchen safety training", "completed": true, "assignedTo": "Manager", "dueDate": "2019-07-25" }
    ],
    maritalStatus: "",
    gender: "",
    race: "",
    ethnicity: "",
    religion: "",
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
    emergencyContactName: "",
    supervisor: ""
  },
  {
    "id": "staff-004",
    "name": "Diana Prince",
    "email": "diana.prince@example.com",
    "phone": "111-222-3333",
    "role": "HR Specialist",
    "dateJoined": "2022-09-10",
    "isActive": true,
    "experience": [
      { "title": "HR Assistant", "company": "Tech Solutions", "years": 2 }
    ],
    "skills": ["Recruitment", "Employee Relations", "Onboarding", "HR Policies"],
    "profileImage": "https://placehold.co/150x150/FF33CC/FFFFFF?text=DP",
    "firstName": "Diana",
    "lastName": "Prince",
    "department": "Human Resources",
    "jobTitle": "HR Specialist",
    "manager": "N/A",
    "location": "New York, NY",
    "contactInfo": "diana.prince@example.com",
    "address": "101 Elm St",
    "city": "New York",
    "state": "NY",
    "education": [
      { "degree": "M.S. Human Resources", "institution": "City University", "year": 2020 }
    ],
    "avatar": "https://placehold.co/150x150/FF33CC/FFFFFF?text=DP",
    "onLeave": false,
    "onboarding": true,
    "hireDate": "2022-09-10",
    "workedFor": "2 years",
    "employeeId": "EMP-004",
    "ssn": "XXX-XX-3456",
    "birthDate": "1990-03-15",
    "positionInDept": "HR Specialist",
    "companyName": "Acme Corp",
    "socialMedia": [
      { "platform": "LinkedIn", "url": "https://linkedin.com/in/dianaprince" }
    ],
    "attendanceRecords": [
      { "date": "2025-07-01", "status": "Present" },
      { "date": "2025-07-02", "status": "Present" },
      { "date": "2025-07-03", "status": "Present" },
      { "date": "2025-07-04", "status": "Present" },
      { "date": "2025-07-05", "status": "Present" },
      { "date": "2025-07-08", "status": "Present" },
      { "date": "2025-07-09", "status": "Present" },
      { "date": "2025-07-10", "status": "Present" },
      { "date": "2025-07-11", "status": "Present" },
      { "date": "2025-07-12", "status": "Present" }
    ],
    "leaveRecords": [],
    "performanceMetrics": [
      { "name": "Compliance", "score": 95, "maxScore": 100 },
      { "name": "Employee Satisfaction", "score": 88, "maxScore": 100 },
      { "name": "Recruitment Efficiency", "score": 90, "maxScore": 100 }
    ],
    "onboardingTasks": [
      { "task": "Review HR policies", "completed": true, "assignedTo": "Manager", "dueDate": "2022-09-15" },
      { "task": "Setup new employee files", "completed": true, "assignedTo": "Self", "dueDate": "2022-09-20" },
      { "task": "Attend HR software training", "completed": false, "assignedTo": "IT", "dueDate": "2022-09-25" }
    ],
    maritalStatus: "",
    gender: "",
    race: "",
    ethnicity: "",
    religion: "",
    height: "",
    weight: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
    emergencyContactName: "",
    supervisor: ""
  }
];

export const CATEGORIES = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)));