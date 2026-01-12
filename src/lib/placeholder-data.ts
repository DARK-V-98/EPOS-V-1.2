import {
  Users,
  Boxes,
  ShoppingCart,
  DollarSign,
  Activity,
  CreditCard,
  Truck,
  UserPlus,
  TrendingUp,
  TrendingDown,
  Warehouse,
  AlertTriangle,
} from 'lucide-react';

export const dashboardCards = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    change: '+180.1%',
    icon: Users,
    color: 'green',
  },
   {
    title: 'Sales',
    value: '+12,234',
    change: '+19%',
    icon: CreditCard,
    color: 'green',
  },
  {
    title: 'Total Products',
    subtitle: 'vs last month',
    value: '2,847',
    change: '+12.5%',
    icon: Boxes,
    color: 'red',
  },
  {
    title: 'Stock Value',
    subtitle: 'vs last month',
    value: '$1.24M',
    change: '+8.2%',
    icon: DollarSign,
    color: 'green',
  },
  {
    title: 'Today\'s Sales',
    subtitle: 'vs yesterday',
    value: '$12,845',
    change: '+23.1%',
    icon: ShoppingCart,
    color: 'red',
  },
  {
    title: 'Monthly Profit',
    subtitle: 'vs last month',
    value: '$89,420',
    change: '+15.8%',
    icon: TrendingUp,
    color: 'green',
  },
  {
    title: 'Low Stock Items',
    subtitle: 'items need restock',
    value: '23',
    change: '-5%',
    icon: AlertTriangle,
    color: 'yellow',
  },
  {
    title: 'Warehouses',
    subtitle: '3 active transfers',
    value: '5',
    change: '',
    icon: Warehouse,
    color: 'gray',
  },
];

export const salesData = [
  { name: 'Jan', sales: 4000, purchases: 2400 },
  { name: 'Feb', sales: 3000, purchases: 1398 },
  { name: 'Mar', sales: 5000, purchases: 3800 },
  { name: 'Apr', sales: 4500, purchases: 3908 },
  { name: 'May', sales: 6000, purchases: 4800 },
  { name: 'Jun', sales: 5500, purchases: 3800 },
  { name: 'Jul', sales: 7000, purchases: 4300 },
  { name: 'Aug', sales: 6500, purchases: 5400 },
  { name: 'Sep', sales: 7200, purchases: 6100 },
  { name: 'Oct', sales: 7800, purchases: 6500 },
  { name: 'Nov', sales: 8500, purchases: 7000 },
  { name: 'Dec', sales: 9200, purchases: 8000 },
];

export const recentActivities = [
  {
    id: 1,
    user: 'John Doe',
    action: 'added a new product',
    target: 'SKU-2024-001',
    timestamp: '2 hours ago',
    icon: UserPlus,
  },
  {
    id: 2,
    user: 'Admin',
    action: 'processed sale',
    target: 'INV-2024-105',
    timestamp: '5 hours ago',
    icon: CreditCard,
  },
  {
    id: 3,
    user: 'Jane Smith',
    action: 'updated stock for',
    target: 'SKU-2023-050',
    timestamp: '1 day ago',
    icon: Activity,
  },
  {
    id: 4,
    user: 'Admin',
    action: 'received shipment',
    target: 'PO-2024-032',
    timestamp: '2 days ago',
    icon: Truck,
  },
];

export const products = [
    { id: 'PROD001', name: 'Wireless Mouse', category: 'Electronics', brand: 'TechGear', price: 25.99, stock: 150, sku: 'TG-WM-001', expiryDate: null, imageId: "1" },
    { id: 'PROD002', name: 'Mechanical Keyboard', category: 'Electronics', brand: 'KeyMaster', price: 120.00, stock: 75, sku: 'KM-MK-002', expiryDate: null, imageId: "2" },
    { id: 'PROD003', name: 'Organic Coffee Beans', category: 'Groceries', brand: 'BeanPure', price: 18.50, stock: 300, sku: 'BP-CB-003', expiryDate: '2025-12-31', imageId: "3" },
    { id: 'PROD004', name: 'Yoga Mat', category: 'Sports', brand: 'FlexiFit', price: 35.00, stock: 120, sku: 'FF-YM-004', expiryDate: null, imageId: "4" },
    { id: 'PROD005', name: 'LED Desk Lamp', category: 'Home Goods', brand: 'BrightenUp', price: 45.99, stock: 90, sku: 'BU-DL-005', expiryDate: null, imageId: "5" },
    { id: 'PROD006', name: 'Stainless Steel Water Bottle', category: 'Kitchen', brand: 'Hydrate+', price: 22.00, stock: 200, sku: 'HP-WB-006', expiryDate: null, imageId: "6" },
];

export const posProducts = [ ...products ];

export const customers = [
    { id: 'CUST001', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-0101', totalPurchases: 12, totalSpent: 1250.75 },
    { id: 'CUST002', name: 'Bob Williams', email: 'bob.w@example.com', phone: '555-0102', totalPurchases: 5, totalSpent: 850.00 },
    { id: 'CUST003', name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '555-0103', totalPurchases: 23, totalSpent: 3400.20 },
    { id: 'CUST004', name: 'Diana Miller', email: 'diana.m@example.com', phone: '555-0104', totalPurchases: 8, totalSpent: 720.50 },
    { id: 'CUST005', name: 'Ethan Davis', email: 'ethan.d@example.com', phone: '555-0105', totalPurchases: 15, totalSpent: 1980.90 },
];

export const users = [
    { id: 'USER001', name: 'John Doe', email: 'john.d@inventoryace.com', role: 'Admin', lastLogin: '2024-07-29 10:00 AM' },
    { id: 'USER002', name: 'Jane Smith', email: 'jane.s@inventoryace.com', role: 'Manager', lastLogin: '2024-07-29 09:30 AM' },
    { id: 'USER003', name: 'Peter Jones', email: 'peter.j@inventoryace.com', role: 'Staff', lastLogin: '2024-07-28 05:00 PM' },
    { id: 'USER004', name: 'Mary Johnson', email: 'mary.j@inventoryace.com', role: 'Staff', lastLogin: '2024-07-29 08:00 AM' },
];

export const roles = ['Developer', 'Admin', 'Manager', 'Staff', 'Auditor'];

export const categories = [
    { id: 'CAT001', name: 'Electronics', productCount: 120, subcategories: ['Laptops', 'Smartphones', 'Accessories'] },
    { id: 'CAT002', name: 'Groceries', productCount: 350, subcategories: ['Pantry Staples', 'Snacks', 'Beverages'] },
    { id: 'CAT003', name: 'Home Goods', productCount: 210, subcategories: ['Furniture', 'Decor', 'Lighting'] },
    { id: 'CAT004', name: 'Sports', productCount: 80, subcategories: ['Fitness', 'Outdoor', 'Team Sports'] },
    { id: 'CAT005', name: 'Kitchen', productCount: 150, subcategories: ['Cookware', 'Appliances', 'Utensils'] },
];

export const warehouses = [
    { id: 'WH001', name: 'Main Warehouse', location: 'New York, NY', stockValue: 150300.25, capacity: 85 },
    { id: 'WH002', name: 'West Coast Distribution', location: 'Los Angeles, CA', stockValue: 85200.00, capacity: 70 },
    { id: 'WH003', name: 'Downtown Store', location: 'Chicago, IL', stockValue: 45100.25, capacity: 95 },
];

export const suppliers = [
    { id: 'SUP001', name: 'TechGear Inc.', contact: 'info@techgear.com', lastOrder: '2024-07-15', totalSpent: 25000 },
    { id: 'SUP002', name: 'BeanPure Coffee Co.', contact: 'sales@beanpure.com', lastOrder: '2024-07-20', totalSpent: 12000 },
    { id: 'SUP003', name: 'FlexiFit Sports', contact: 'orders@flexifit.com', lastOrder: '2024-06-30', totalSpent: 18000 },
];

export const purchases = [
    { id: 'PO-2024-032', supplier: 'TechGear Inc.', date: '2024-07-15', total: 5200.00, status: 'Received' },
    { id: 'PO-2024-033', supplier: 'BeanPure Coffee Co.', date: '2024-07-20', total: 1500.50, status: 'Received' },
    { id: 'PO-2024-034', supplier: 'FlexiFit Sports', date: '2024-07-25', total: 3200.00, status: 'Pending' },
    { id: 'PO-2024-035', supplier: 'TechGear Inc.', date: '2024-07-28', total: 7800.00, status: 'Shipped' },
];

export const securityLogs = [
    { id: 1, timestamp: '2024-07-29 10:02:14', user: 'John Doe', ip: '192.168.1.10', action: 'Logged in successfully.' },
    { id: 2, timestamp: '2024-07-29 10:05:31', user: 'John Doe', ip: '192.168.1.10', action: 'Added new product: TG-WM-001.' },
    { id: 3, timestamp: '2024-07-29 09:30:55', user: 'Jane Smith', ip: '10.0.0.52', action: 'Logged in successfully.' },
    { id: 4, timestamp: '2024-07-29 08:00:12', user: 'Mary Johnson', ip: '203.0.113.25', action: 'Failed login attempt.' },
    { id: 5, timestamp: '2024-07-28 17:01:03', user: 'Peter Jones', ip: '172.16.10.3', action: 'Updated warehouse stock for WH003.' },
];

export const lowStockAlerts = [
  { id: '1', name: 'Samsung Galaxy S24', sku: 'SAM-S24-128', left: 5, min: 20, imageUrl: "https://picsum.photos/seed/a/40/40" },
  { id: '2', name: 'Google Pixel 8 Pro', sku: 'GOO-PX8P-256', left: 3, min: 15, imageUrl: "https://picsum.photos/seed/b/40/40" },
  { id: '3', name: 'Sony WH-1000XM5', sku: 'SNY-XM5-BK', left: 8, min: 25, imageUrl: "https://picsum.photos/seed/c/40/40" },
  { id: '4', name: 'iPad Pro 12.9"', sku: 'APL-IPP12-256', left: 2, min: 10, imageUrl: "https://picsum.photos/seed/d/40/40" },
];

export const recentSales = [
  { id: '1', name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: 1999.00, month: "January", avatarUrl: "https://i.pravatar.cc/40?img=1" },
  { id: '2', name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: 39.00, month: "February", avatarUrl: "https://i.pravatar.cc/40?img=2" },
  { id: '3', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: 299.00, month: "March", avatarUrl: "https://i.pravatar.cc/40?img=3" },
  { id: '4', name: 'William Kim', email: 'will@email.com', amount: 99.00, month: "April", avatarUrl: "https://i.pravatar.cc/40?img=4" },
  { id: '5', name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: 39.00, month: "May", avatarUrl: "https://i.pravatar.cc/40?img=5" },
];
