'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  dashboardCards,
  salesData,
  recentActivities,
  lowStockAlerts,
} from '@/lib/placeholder-data';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase text-muted-foreground">
              Sales
            </span>
            <span className="font-bold text-red-500">
              ${payload[0].value.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-xs uppercase text-muted-foreground">
              Purchases
            </span>
            <span className="font-bold text-green-500">
              ${payload[1].value.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your inventory.</p>
        </div>
        <Button variant="outline">Last 7 days</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {dashboardCards.map((card, index) => (
          <Card key={index} className={cn(
            'flex flex-col',
            card.color === 'red' ? 'bg-red-50' : 'bg-green-50',
            card.color === 'yellow' && 'bg-yellow-50',
            card.color === 'gray' && 'bg-gray-100',
          )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className={cn("p-2 rounded-md", 
                card.color === 'red' ? 'bg-red-100' : 'bg-green-100',
                card.color === 'yellow' && 'bg-yellow-100',
                 card.color === 'gray' && 'bg-gray-200'
                )}>
                <card.icon className={cn("h-5 w-5", 
                  card.color === 'red' ? 'text-red-600' : 'text-green-600',
                  card.color === 'yellow' && 'text-yellow-600',
                  card.color === 'gray' && 'text-gray-600'
                  )} />
              </div>
              <p
                className={cn(
                  'text-sm font-medium',
                  card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                )}
              >
                {card.change}
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Sales Overview</CardTitle>
            <CardDescription>
              Monthly sales vs purchases
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                 <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '20px' }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="purchases"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorPurchases)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" /> Low Stock
              Alerts
            </CardTitle>
            <CardDescription>4 items need attention</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            {lowStockAlerts.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                   <Image src="/placeholder.svg" alt={item.name} width={40} height={40} className='rounded-md' />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-500">{item.left} left</p>
                  <p className="text-xs text-muted-foreground">Min: {item.min}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardContent>
             <Button variant="ghost" className="w-full text-primary">
              View All Alerts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
