import { motion } from 'framer-motion';
import { AlertTriangle, Package, ArrowRight } from 'lucide-react';

const lowStockItems = [
  { id: 1, name: 'Samsung Galaxy S24', sku: 'SAM-S24-128', stock: 5, minStock: 20 },
  { id: 2, name: 'Google Pixel 8 Pro', sku: 'GOO-PX8P-256', stock: 3, minStock: 15 },
  { id: 3, name: 'Sony WH-1000XM5', sku: 'SNY-XM5-BK', stock: 8, minStock: 25 },
  { id: 4, name: 'iPad Pro 12.9"', sku: 'APL-IPP12-256', stock: 2, minStock: 10 },
];

export function LowStockAlert() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-warning/20">
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-lg">Low Stock Alerts</h2>
          <p className="text-sm text-muted-foreground">{lowStockItems.length} items need attention</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {lowStockItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="flex items-center gap-4 p-3 rounded-lg bg-warning/5 border border-warning/20"
          >
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.sku}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-warning">{item.stock} left</p>
              <p className="text-xs text-muted-foreground">Min: {item.minStock}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 btn-ghost text-sm justify-center">
        <span>View All Alerts</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
