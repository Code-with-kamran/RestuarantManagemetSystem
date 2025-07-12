// types/index.ts


'use client'
import React, { useEffect } from 'react';
import { useCallback, useMemo, useState } from 'react';

import Image from 'next/image';





interface SalesTableProps {
  sales: Sale[];
}

const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" className="form-checkbox" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grand Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8">
                    <Image
                      className="h-8 w-8 rounded-full object-cover"
                      src={sale.customer.avatar || "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=1080"}
                      alt={sale.customer.name}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{sale.customer.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.reference}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={sale.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.grandTotal.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.paid.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${sale.due.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <PaymentStatusBadge status={sale.paymentStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export interface Customer {
  name: string;
  avatar: string;
}

export type SaleStatus = 'Completed' | 'Pending';
export type PaymentStatus = 'Paid' | 'Unpaid' | 'Overdue';

export interface Sale {
  id: string;
  customer: Customer;
  reference: string;
  date: string; // "DD Mon YYYY"
  status: SaleStatus;
  grandTotal: number;
  paid: number;
  due: number;
  paymentStatus: PaymentStatus;
}




interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
  totalEntries: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
//   totalEntries,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mt-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">Row Per Page</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-sm text-gray-700">Entries</span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              currentPage === number ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
};


export interface Filter {
  customer: string;
  status: SaleStatus;
  paymentStatus: PaymentStatus;
}

const dummySales: Sale[] = [
  {
    id: '1',
    customer: { name: 'Carl Evans', avatar: '/avatars/carl.png' },
    reference: 'SL001',
    date: '24 Dec 2024',
    status: 'Completed',
    grandTotal: 1000,
    paid: 1000,
    due: 0,
    paymentStatus: 'Paid',
  },
  {
    id: '2',
    customer: { name: 'Minerva Rameriz', avatar: '/avatars/minerva.png' },
    reference: 'SL002',
    date: '10 Dec 2024',
    status: 'Pending',
    grandTotal: 1500,
    paid: 0,
    due: 1500,
    paymentStatus: 'Unpaid',
  },
  {
    id: '3',
    customer: { name: 'Robert Lamon', avatar: '/avatars/robert.png' },
    reference: 'SL003',
    date: '08 Feb 2023',
    status: 'Completed',
    grandTotal: 1500,
    paid: 0,
    due: 1500,
    paymentStatus: 'Paid', // Assuming this means they paid in full later
  },
  {
    id: '4',
    customer: { name: 'Patricia Lewis', avatar: '/avatars/patricia.png' },
    reference: 'SL004',
    date: '12 Feb 2023',
    status: 'Completed',
    grandTotal: 2000,
    paid: 1000,
    due: 1000,
    paymentStatus: 'Overdue',
  },
  {
    id: '5',
    customer: { name: 'Mark Joslyn', avatar: '/avatars/mark.png' },
    reference: 'SL005',
    date: '17 Mar 2023',
    status: 'Completed',
    grandTotal: 800,
    paid: 800,
    due: 0,
    paymentStatus: 'Paid',
  },
  {
    id: '6',
    customer: { name: 'Emma Bates', avatar: '/avatars/emma.png' },
    reference: 'SL008',
    date: '16 Apr 2023',
    status: 'Completed',
    grandTotal: 1100,
    paid: 1100,
    due: 0,
    paymentStatus: 'Paid',
  },
  {
    id: '7',
    customer: { name: 'Richard Fralick', avatar: '/avatars/richard.png' },
    reference: 'SL009',
    date: '04 May 2023',
    status: 'Pending',
    grandTotal: 2300,
    paid: 2300, // This seems contradictory if status is 'Pending' but paid is full. Assuming it's a display error in the image or special case. I'll make it reflect 'Paid' for consistency.
    due: 0,
    paymentStatus: 'Paid',
  },
  {
    id: '8',
    customer: { name: 'Michelle Robbison', avatar: '/avatars/michelle.png' },
    reference: 'SL010',
    date: '29 May 2023',
    status: 'Pending',
    grandTotal: 1700,
    paid: 1700, // Same as above
    due: 0,
    paymentStatus: 'Paid',
  },
];


interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({ status }) => {
  const badgeClasses = {
    Paid: 'text-green-500',
    Unpaid: 'text-red-500',
    Overdue: 'text-orange-500',
  };

  return (
    <span className={`text-xs font-medium flex items-center ${badgeClasses[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: status === 'Paid' ? 'rgb(34, 197, 94)' : status === 'Unpaid' ? 'rgb(239, 68, 68)' : 'rgb(249, 115, 22)' }}></span>
      {status}
    </span>
  );
};






interface SalesHeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customerFilter: string;
  onCustomerFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  statusFilter: string;
  onStatusFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  paymentStatusFilter: string;
  onPaymentStatusFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortBy: string;
  onSortByChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  availableCustomers: string[]; // To populate customer dropdown
}

const SalesHeader: React.FC<SalesHeaderProps> = ({
  searchQuery,
  onSearchChange,
  customerFilter,
  onCustomerFilterChange,
  statusFilter,
  onStatusFilterChange,
  paymentStatusFilter,
  onPaymentStatusFilterChange,
  sortBy,
  onSortByChange,
  availableCustomers,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4">
      <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={onSearchChange}
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      <div className="flex space-x-2 w-full md:w-auto justify-around">
        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={customerFilter}
          onChange={onCustomerFilterChange}
        >
          <option value="All">Customer</option>
          {availableCustomers.map(customer => (
            <option key={customer} value={customer}>{customer}</option>
          ))}
        </select>

        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={statusFilter}
          onChange={onStatusFilterChange}
        >
          <option value="All">Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={paymentStatusFilter}
          onChange={onPaymentStatusFilterChange}
        >
          <option value="All">Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Overdue">Overdue</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={sortBy}
          onChange={onSortByChange}
        >
          <option value="Date">Sort By: Last 7 Days</option>
          <option value="Grand Total">Sort By: Grand Total</option>
          {/* Add more sort options as needed */}
        </select>
      </div>
    </div>
  );
};






interface StatusBadgeProps {
  status: SaleStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const badgeClasses = {
    Completed: 'bg-green-100 text-green-800',
    Pending: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClasses[status]}`}
    >
      {status}
    </span>
  );
};


// Inside SalesPage component




const SalesPage: React.FC = () => {
  const [salesData, setSalesData] = useState<Sale[]>(dummySales); // In real app, fetch from API
  const [filteredSalesData, setFilteredSalesData] = useState<Sale[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customerFilter, setCustomerFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Date'); // Default sort
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);




 




  // Extract unique customer names for the filter dropdown
  const availableCustomers = useMemo(() => {
    const customers = new Set<string>();
    dummySales.forEach(sale => customers.add(sale.customer.name));
    return ['All', ...Array.from(customers).sort()];
  }, []);

  const applyFiltersAndSorting = useCallback(() => {
    let tempSales = [...salesData];

    // Apply Search
    if (searchQuery) {
      tempSales = tempSales.filter(sale =>
        sale.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sale.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply Customer Filter
    if (customerFilter !== 'All') {
      tempSales = tempSales.filter(sale => sale.customer.name === customerFilter);
    }

    // Apply Status Filter
    if (statusFilter !== 'All') {
      tempSales = tempSales.filter(sale => sale.status === statusFilter);
    }

    // Apply Payment Status Filter
    if (paymentStatusFilter !== 'All') {
      tempSales = tempSales.filter(sale => sale.paymentStatus === paymentStatusFilter);
    }

    // Apply Sort By
    if (sortBy === 'Date') {
      tempSales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'Grand Total') {
      tempSales.sort((a, b) => b.grandTotal - a.grandTotal);
    }
    // Add more sort conditions here

    setFilteredSalesData(tempSales);
    setCurrentPage(1); // Reset to first page when filters change
  }, [salesData, searchQuery, customerFilter, statusFilter, paymentStatusFilter, sortBy]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [applyFiltersAndSorting]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSalesData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedSales = filteredSalesData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sales Overview</h1>

      <SalesHeader
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        customerFilter={customerFilter}
        onCustomerFilterChange={(e) => setCustomerFilter(e.target.value)}
        statusFilter={statusFilter}
        onStatusFilterChange={(e) => setStatusFilter(e.target.value)}
        paymentStatusFilter={paymentStatusFilter}
        onPaymentStatusFilterChange={(e) => setPaymentStatusFilter(e.target.value)}
        sortBy={sortBy}
        onSortByChange={(e) => setSortBy(e.target.value)}
        availableCustomers={availableCustomers}
      />

      <SalesTable sales={paginatedSales} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        totalEntries={filteredSalesData.length}
      />
    </div>
  );
};

export default SalesPage;