import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', sales: 4000, purchases: 2400 },
  { name: 'Feb', sales: 3000, purchases: 1398 },
  { name: 'Mar', sales: 5000, purchases: 3800 },
  { name: 'Apr', sales: 2780, purchases: 3908 },
  { name: 'May', sales: 1890, purchases: 4800 },
  { name: 'Jun', sales: 2390, purchases: 3800 },
  { name: 'Jul', sales: 3490, purchases: 4300 },
  { name: 'Aug', sales: 4200, purchases: 2900 },
  { name: 'Sep', sales: 5100, purchases: 3200 },
  { name: 'Oct', sales: 4800, purchases: 2800 },
  { name: 'Nov', sales: 6200, purchases: 4100 },
  { name: 'Dec', sales: 7100, purchases: 3500 },
];

export function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-semibold text-lg">Sales Overview</h2>
          <p className="text-sm text-muted-foreground">Monthly sales vs purchases</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">Purchases</span>
          </div>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0 72% 51%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0 72% 51%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="purchasesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(0 0% 45%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(0 0% 45%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0 0% 100%)',
                border: '1px solid hsl(0 0% 90%)',
                borderRadius: '8px',
                boxShadow: '0 8px 32px hsl(0 0% 0% / 0.1)'
              }}
              labelStyle={{ color: 'hsl(0 0% 10%)' }}
              formatter={(value: number | undefined) => value ? [`$${value.toLocaleString()}`, undefined] : ['', undefined]}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(0 72% 51%)"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
            <Area
              type="monotone"
              dataKey="purchases"
              stroke="hsl(142 76% 36%)"
              strokeWidth={2}
              fill="url(#purchasesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
