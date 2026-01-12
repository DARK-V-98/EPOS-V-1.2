'use client'
import { motion } from 'framer-motion';
import { TrendingUp, Package } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    sku: 'IPH-15PM-256',
    sold: 234,
    revenue: 280800,
    image: null,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    sku: 'SAM-S24U-512',
    sold: 189,
    revenue: 226800,
    image: null,
  },
  {
    id: 3,
    name: 'MacBook Pro 14"',
    sku: 'MAC-BP14-M3',
    sold: 156,
    revenue: 311688,
    image: null,
  },
  {
    id: 4,
    name: 'AirPods Pro 2',
    sku: 'APL-APP2-WH',
    sold: 312,
    revenue: 77688,
    image: null,
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    sku: 'SNY-XM5-BK',
    sold: 145,
    revenue: 50750,
    image: null,
  },
];

export function TopProducts() {
  const maxSold = Math.max(...products.map(p => p.sold));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-semibold text-lg">Best Selling Products</h2>
          <p className="text-sm text-muted-foreground">Top performers this month</p>
        </div>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                <span className="text-sm font-semibold text-foreground">
                  ${product.revenue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{product.sku}</span>
                <span className="text-xs text-muted-foreground">{product.sold} sold</span>
              </div>
              <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(product.sold / maxSold) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
