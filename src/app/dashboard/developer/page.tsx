'use client';
import { motion } from 'framer-motion';
import { Code, Database, Bug, Users, GitBranch } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { useUser } from '@/firebase';

const devStats = [
  {
    icon: Code,
    label: 'API Endpoints',
    value: '42',
    changeLabel: '2 new this week',
    variant: 'primary' as const,
  },
  {
    icon: Database,
    label: 'Firestore Reads',
    value: '1.2M',
    change: 3.2,
    changeLabel: 'in last 24h',
    variant: 'success' as const,
  },
  {
    icon: Bug,
    label: "Open Issues",
    value: '12',
    change: -2,
    changeLabel: 'vs last week',
    variant: 'warning' as const,
  },
  {
    icon: Users,
    label: 'Active Users',
    value: '1,287',
    change: 12.1,
    changeLabel: 'in last 24h',
    variant: 'default' as const,
  },
  {
    icon: GitBranch,
    label: 'Open PRs',
    value: '8',
    changeLabel: '3 awaiting review',
    variant: 'primary' as const,
  },
];

export default function DeveloperDashboard() {
  const { user } = useUser();

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
            Developer Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Welcome, {user?.displayName || 'Developer'}. System status and metrics below.
          </motion.p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {devStats.map((stat, index) => (
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

      {/* Other developer-specific components would go here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="font-display font-semibold text-lg mb-4">System Logs</h2>
          <div className="h-64 bg-gray-900 text-white font-mono text-xs p-4 rounded-lg overflow-y-scroll">
            <p><span className="text-green-400">[INFO]</span> User 'admin@example.com' logged in.</p>
            <p><span className="text-yellow-400">[WARN]</span> High latency detected on /api/products.</p>
            <p><span className="text-red-400">[ERROR]</span> Failed to connect to payment gateway.</p>
            <p><span className="text-green-400">[INFO]</span> New user registered: 'dev@example.com'.</p>
          </div>
        </div>
        <div className="glass-card p-6">
          <h2 className="font-display font-semibold text-lg mb-4">Deployment Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Production</p>
                <p className="text-sm text-muted-foreground">v1.2.3 - #a1b2c3d</p>
              </div>
              <div className="badge badge-success">Live</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Staging</p>
                <p className="text-sm text-muted-foreground">v1.3.0-rc1 - #e4f5g6h</p>
              </div>
              <div className="badge badge-primary">Deploying...</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
