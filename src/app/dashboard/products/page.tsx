'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Package,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  status: 'active' | 'inactive' | 'low-stock';
}

const products: Product[] = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', sku: 'IPH-15PM-256', category: 'Smartphones', price: 1199, cost: 950, stock: 45, minStock: 10, status: 'active' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', sku: 'SAM-S24U-512', category: 'Smartphones', price: 1299, cost: 1020, stock: 5, minStock: 15, status: 'low-stock' },
  { id: 3, name: 'MacBook Pro 14" M3 Pro', sku: 'MAC-BP14-M3', category: 'Laptops', price: 1999, cost: 1650, stock: 23, minStock: 5, status: 'active' },
  { id: 4, name: 'AirPods Pro 2nd Gen', sku: 'APL-APP2-WH', category: 'Audio', price: 249, cost: 180, stock: 89, minStock: 20, status: 'active' },
  { id: 5, name: 'Sony WH-1000XM5', sku: 'SNY-XM5-BK', category: 'Audio', price: 349, cost: 280, stock: 3, minStock: 10, status: 'low-stock' },
  { id: 6, name: 'iPad Pro 12.9" M2', sku: 'APL-IPP12-256', category: 'Tablets', price: 1099, cost: 850, stock: 34, minStock: 8, status: 'active' },
  { id: 7, name: 'Google Pixel 8 Pro', sku: 'GOO-PX8P-256', category: 'Smartphones', price: 999, cost: 780, stock: 0, minStock: 10, status: 'inactive' },
  { id: 8, name: 'Dell XPS 15 OLED', sku: 'DEL-XPS15-O', category: 'Laptops', price: 1799, cost: 1450, stock: 12, minStock: 5, status: 'active' },
];

const statusStyles = {
  'active': 'badge-success',
  'inactive': 'badge-destructive',
  'low-stock': 'badge-warning',
};

const statusLabels = {
  'active': 'Active',
  'inactive': 'Out of Stock',
  'low-stock': 'Low Stock',
};

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-display font-bold"
          >
            Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Manage your product inventory
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <Link href="/dashboard/products/add" className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <select className="input-field py-2 text-sm min-w-[140px]">
              <option>All Categories</option>
              <option>Smartphones</option>
              <option>Laptops</option>
              <option>Audio</option>
              <option>Tablets</option>
            </select>
            <select className="input-field py-2 text-sm min-w-[120px]">
              <option>All Status</option>
              <option>Active</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <button className="btn-ghost p-2">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary focus:ring-offset-0"
                  />
                </th>
                <th className="p-4 text-left table-header">Product</th>
                <th className="p-4 text-left table-header">SKU</th>
                <th className="p-4 text-left table-header">Category</th>
                <th className="p-4 text-right table-header">Price</th>
                <th className="p-4 text-right table-header">Stock</th>
                <th className="p-4 text-center table-header">Status</th>
                <th className="p-4 text-right table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary focus:ring-offset-0"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Cost: ${product.cost}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground font-mono">{product.sku}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground">{product.category}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="font-semibold text-foreground">${product.price}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div>
                      <span className={`font-semibold ${product.stock <= product.minStock ? 'text-warning' : 'text-foreground'}`}>
                        {product.stock}
                      </span>
                      <p className="text-xs text-muted-foreground">Min: {product.minStock}</p>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`badge ${statusStyles[product.status]}`}>
                      {statusLabels[product.status]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="btn-ghost p-2">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="btn-ghost p-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn-ghost p-2 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">1-8</span> of{' '}
            <span className="font-medium text-foreground">2,847</span> products
          </p>
          <div className="flex items-center gap-2">
            <button className="btn-ghost p-2" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="btn-primary py-1.5 px-3 text-sm">1</button>
            <button className="btn-ghost py-1.5 px-3 text-sm">2</button>
            <button className="btn-ghost py-1.5 px-3 text-sm">3</button>
            <span className="text-muted-foreground">...</span>
            <button className="btn-ghost py-1.5 px-3 text-sm">356</button>
            <button className="btn-ghost p-2">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
