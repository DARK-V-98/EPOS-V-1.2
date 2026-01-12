import { motion } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const activities = [
  {
    id: 1,
    icon: Package,
    title: 'New product added',
    description: 'iPhone 15 Pro Max added to inventory',
    time: '2 min ago',
    type: 'success'
  },
  {
    id: 2,
    icon: ShoppingCart,
    title: 'Sale completed',
    description: 'Order #1234 - $2,450.00',
    time: '15 min ago',
    type: 'primary'
  },
  {
    id: 3,
    icon: AlertTriangle,
    title: 'Low stock alert',
    description: 'Samsung Galaxy S24 - Only 5 left',
    time: '1 hour ago',
    type: 'warning'
  },
  {
    id: 4,
    icon: Truck,
    title: 'Purchase received',
    description: 'PO #789 from Tech Suppliers Inc.',
    time: '2 hours ago',
    type: 'success'
  },
  {
    id: 5,
    icon: Clock,
    title: 'Pending approval',
    description: 'Stock transfer request #456',
    time: '3 hours ago',
    type: 'default'
  },
];

const typeStyles = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary/20 text-primary',
  success: 'bg-success/20 text-success',
  warning: 'bg-warning/20 text-warning',
  destructive: 'bg-destructive/20 text-destructive',
};

export function RecentActivity() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-lg">Recent Activity</h2>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${typeStyles[activity.type as keyof typeof typeStyles]}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
