'use client';
import { motion } from 'framer-motion';
import { 
  Package, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  AlertTriangle,
  Warehouse
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { redirect } from 'next/navigation';

const stats = [
  {
    icon: Package,
    label: 'Total Products',
    value: '2,847',
    change: 12.5,
    changeLabel: 'vs last month',
    variant: 'primary' as const,
  },
  {
    icon: DollarSign,
    label: 'Stock Value',
    value: '$1.24M',
    change: 8.2,
    changeLabel: 'vs last month',
    variant: 'success' as const,
  },
  {
    icon: ShoppingCart,
    label: "Today's Sales",
    value: '$12,845',
    change: 23.1,
    changeLabel: 'vs yesterday',
    variant: 'primary' as const,
  },
  {
    icon: TrendingUp,
    label: 'Monthly Profit',
    value: '$89,420',
    change: 15.8,
    changeLabel: 'vs last month',
    variant: 'success' as const,
  },
  {
    icon: AlertTriangle,
    label: 'Low Stock Items',
    value: '23',
    change: -5,
    changeLabel: 'items need restock',
    variant: 'warning' as const,
  },
  {
    icon: Warehouse,
    label: 'Warehouses',
    value: '5',
    changeLabel: '3 active transfers',
    variant: 'default' as const,
  },
];

interface UserProfile {
  firstName: string;
  lastName: string;
  roleId: string;
}

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  if (!isUserLoading && userProfile && userProfile.roleId === 'developer') {
    redirect('/dashboard/developer');
  }

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  const displayName = userProfile ? `${userProfile.firstName} ${userProfile.lastName}`.trim() : 'Back';
  const roleDisplay = userProfile ? userProfile.roleId.charAt(0).toUpperCase() + userProfile.roleId.slice(1) : 'User';

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
            {getGreeting()}, {isProfileLoading ? '...' : displayName}!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Welcome to your <span className="font-semibold text-primary">{roleDisplay}</span> Dashboard. Here's what's happening.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <select className="input-field py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <div>
          <LowStockAlert />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts />
        <RecentActivity />
      </div>
    </div>
  );
}
