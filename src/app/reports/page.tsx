// pages/ReportsPage.tsx
'use client'
import React, { useState, useMemo, useCallback} from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';


// --- 1. TypeScript Interfaces ---

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface OrderItem {
  productId: string;
  quantity: number;
  priceAtOrder: number; // Price at the time of order
}

interface Order {
  id: string;
  items: OrderItem[];
  orderDate: string; // YYYY-MM-DD format for easy date comparison
  totalPrice: number;
}

// --- 2. Mock Data ---

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Classic Burger', category: 'Main Course', price: 12.99 },
  { id: 'p2', name: 'Caesar Salad', category: 'Appetizer', price: 8.50 },
  { id: 'p3', name: 'French Fries', category: 'Side Dish', price: 4.00 },
  { id: 'p4', name: 'Coca-Cola', category: 'Beverage', price: 2.50 },
  { id: 'p5', name: 'Cheesecake', category: 'Dessert', price: 7.00 },
  { id: 'p6', name: 'Spaghetti Carbonara', category: 'Main Course', price: 15.50 },
  { id: 'p7', name: 'Chicken Wings', category: 'Appetizer', price: 9.75 },
  { id: 'p8', name: 'Lemonade', category: 'Beverage', price: 3.00 },
  { id: 'p9', name: 'Chocolate Lava Cake', category: 'Dessert', price: 8.00 },
  { id: 'p10', name: 'Margherita Pizza', category: 'Main Course', price: 14.00 },
];


// Helper to generate a random date within a range
const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Generate more realistic mock orders
const generateMockOrders = (numOrders: number): Order[] => {
  const orders: Order[] = [];
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  for (let i = 0; i < numOrders; i++) {
    const orderItems: OrderItem[] = [];
    let totalPrice = 0;
    const numItems = Math.floor(Math.random() * 3) + 1; // 1 to 3 items per order

    for (let j = 0; j < numItems; j++) {
      const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
      const quantity = Math.floor(Math.random() * 2) + 1; // 1 or 2 of each item
      orderItems.push({
        productId: randomProduct.id,
        quantity: quantity,
        priceAtOrder: randomProduct.price,
      });
      totalPrice += randomProduct.price * quantity;
    }

    orders.push({
      id: `ORD-${String(i + 1).padStart(4, '0')}`,
      items: orderItems,
      orderDate: getRandomDate(threeMonthsAgo, today),
      totalPrice: parseFloat(totalPrice.toFixed(2)),
    });
  }
  return orders;
};

const ALL_MOCK_ORDERS: Order[] = generateMockOrders(200); // Generate 200 mock orders

// --- 3. Helper Functions for Data Processing ---

const getProductById = (productId: string) => MOCK_PRODUCTS.find(p => p.id === productId);

const filterOrdersByDateRange = (orders: Order[], startDate: string, endDate: string) => {
  return orders.filter(order => {
    const orderDate = new Date(order.orderDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return orderDate >= start && orderDate <= end;
  });
};

const calculateDailySales = (orders: Order[]) => {
  const dailySalesMap: { [date: string]: number } = {};
  orders.forEach(order => {
    dailySalesMap[order.orderDate] = (dailySalesMap[order.orderDate] || 0) + order.totalPrice;
  });

  // Convert to array of objects for Recharts, sort by date
  return Object.keys(dailySalesMap)
    .sort()
    .map(date => ({ date, sales: parseFloat(dailySalesMap[date].toFixed(2)) }));
};

const calculateTopSellingProducts = (orders: Order[]) => {
  const productRevenueMap: { [productId: string]: number } = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      productRevenueMap[item.productId] = (productRevenueMap[item.productId] || 0) + (item.priceAtOrder * item.quantity);
    });
  });

  return Object.keys(productRevenueMap)
    .map(productId => {
      const product = getProductById(productId);
      return {
        name: product ? product.name : `Unknown Product (${productId})`,
        revenue: parseFloat(productRevenueMap[productId].toFixed(2)),
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5); // Top 5 products
};

const calculateSalesByCategory = (orders: Order[]) => {
  const categoryRevenueMap: { [category: string]: number } = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      const product = getProductById(item.productId);
      if (product) {
        categoryRevenueMap[product.category] = (categoryRevenueMap[product.category] || 0) + (item.priceAtOrder * item.quantity);
      }
    });
  });

  return Object.keys(categoryRevenueMap)
    .map(category => ({
      name: category,
      value: parseFloat(categoryRevenueMap[category].toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);
};

// --- 4. Reusable Components (Internal to ReportsPage) ---

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, description }) => (
  <div className="bg-[var(--color-card-background)] p-6 rounded-lg shadow-sm flex flex-col items-start justify-center">
    <h3 className="text-sm font-medium text-[var(--color-muted-foreground)] mb-1">{title}</h3>
    <p className="text-3xl font-semibold text-[var(--color-foreground)]">{value}</p>
    {description && <p className="text-xs text-[var(--color-muted-foreground)] mt-1">{description}</p>}
  </div>
);

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => (
  <div className="bg-[var(--color-card-background)] p-6 rounded-lg shadow-sm h-96 flex flex-col">
    <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">{title}</h3>
    <div className="flex-grow">
      {children}
    </div>
  </div>
);

// --- 5. Main ReportsPage Component ---

const ReportsPage: React.FC = () => {
  const today = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(today.getDate() - 29); // Last 30 days

  const [startDate, setStartDate] = useState<string>(defaultStartDate.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(today.toISOString().split('T')[0]);
  // const [theme, setTheme] = useState<'light' | 'dark'>('light'); // New theme state

  // // Effect to apply theme class to the HTML element
  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [theme]);

 
  const filteredOrders = useMemo(() => {
    return filterOrdersByDateRange(ALL_MOCK_ORDERS, startDate, endDate);
  }, [startDate, endDate]);

  // --- Calculated Report Data ---
  const totalSales = useMemo(() =>
    parseFloat(filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0).toFixed(2)),
    [filteredOrders]
  );

  const totalOrders = useMemo(() => filteredOrders.length, [filteredOrders]);

  const averageOrderValue = useMemo(() =>
    totalOrders > 0 ? parseFloat((totalSales / totalOrders).toFixed(2)) : 0,
    [totalSales, totalOrders]
  );

  const dailySalesData = useMemo(() => calculateDailySales(filteredOrders), [filteredOrders]);
  const topSellingProductsData = useMemo(() => calculateTopSellingProducts(filteredOrders), [filteredOrders]);
  const salesByCategoryData = useMemo(() => calculateSalesByCategory(filteredOrders), [filteredOrders]);

  // Pie chart colors (can also be theme-dependent, but fixed for this example)
  const PIE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // --- CSV Export Function (Frontend Only) ---
  const handleExportCSV = useCallback(() => {
    // Prepare table headers
    const headers = [
      'Order ID', 'Product', 'Category', 'Quantity', 'Total Price', 'Order Date'
    ];

    // Prepare table rows
    const rows = filteredOrders.flatMap(order =>
      order.items.map(item => {
        const product = getProductById(item.productId);
        return [
          order.id,
          product?.name || 'N/A',
          product?.category || 'N/A',
          item.quantity,
          item.priceAtOrder * item.quantity,
          order.orderDate,
        ];
      })
    );

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection for download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `restaurant_reports_${startDate}_to_${endDate}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    } else {
      // Fallback for browsers that don't support download attribute
      // This might open the CSV in a new tab instead of downloading
      window.open('data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    }
  }, [filteredOrders, startDate, endDate]);

  return (
    <div className="h-[calc(100vh-100px)] bg-[var(--color-background)] p-4 sm:p-6 md:p-8 font-inter transition-colors duration-300 overflow-auto custom-scroll">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Reports Overview</h1>
       
         
      </div>


      {/* Date Range Picker and Export Button */}
      <div className="bg-[var(--color-card-background)] p-6 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <label htmlFor="startDate" className="text-[var(--color-muted-foreground)] text-sm font-medium">From:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-card-background)]"
          />
          <label htmlFor="endDate" className="text-[var(--color-muted-foreground)] text-sm font-medium">To:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-[var(--color-border)] rounded-md px-3 py-2 text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-[var(--color-card-background)]"
          />
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-[var(--color-button-primary)] hover:bg-[var(--color-button-primary-hover)] text-[var(--color-button-primary-foreground)] font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
        >
          Export Report (CSV)
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <SummaryCard title="Total Sales" value={`$${totalSales.toFixed(2)}`} />
        <SummaryCard title="Total Orders" value={totalOrders} />
        <SummaryCard title="Average Order Value" value={`$${averageOrderValue.toFixed(2)}`} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ChartContainer title="Daily Sales Trends">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} stroke="var(--color-muted-foreground)" />
              <YAxis tickFormatter={(tick) => `$${tick}`} stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card-background)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
                itemStyle={{ color: 'var(--color-foreground)' }}
                labelStyle={{ color: 'var(--color-muted-foreground)' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
              />
              <Line type="monotone" dataKey="sales" stroke="var(--color-chart-line)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Top 5 Selling Products by Revenue">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topSellingProductsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} interval={0} style={{ fontSize: '12px', fill: 'var(--color-muted-foreground)' }} />
              <YAxis tickFormatter={(tick) => `$${tick}`} stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card-background)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
                itemStyle={{ color: 'var(--color-foreground)' }}
                labelStyle={{ color: 'var(--color-muted-foreground)' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="var(--color-chart-bar)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Sales Breakdown by Product Category">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesByCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="var(--color-chart-line)" // Default fill, will be overridden by Cells
                dataKey="value"
                label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
              >
                {salesByCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card-background)', borderColor: 'var(--color-border)', color: 'var(--color-foreground)' }}
                itemStyle={{ color: 'var(--color-foreground)' }}
                labelStyle={{ color: 'var(--color-muted-foreground)' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
              />
              <Legend wrapperStyle={{ color: 'var(--color-foreground)' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        </div>
      </div>

      {/* Detailed Order Data Table */}
      <div className="bg-[var(--color-card-background)] p-6 rounded-lg shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">Detailed Order Data</h3>
        <table className="min-w-full divide-y divide-[var(--color-border)]">
          <thead className="bg-[var(--color-muted-background)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">Order Date</th>
            </tr>
          </thead>
          <tbody className="bg-[var(--color-card-background)] divide-y divide-[var(--color-border)]">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-[var(--color-muted-foreground)]">
                  No orders found for the selected date range.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                order.items.map((item, itemIndex) => {
                  const product = getProductById(item.productId);
                  return (
                    <tr key={`${order.id}-${itemIndex}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--color-foreground)]">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-muted-foreground)]">{product?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-muted-foreground)]">{product?.category || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-muted-foreground)]">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-foreground)]">${(item.priceAtOrder * item.quantity).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-muted-foreground)]">{order.orderDate}</td>
                    </tr>
                  );
                })
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;