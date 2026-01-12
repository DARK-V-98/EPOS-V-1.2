import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, FileText, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const reports = [
    { title: "Stock Report", icon: Package, description: "Detailed view of all items in stock." },
    { title: "Sales Report", icon: TrendingUp, description: "Analyze sales performance over time." },
    { title: "Purchase Report", icon: TrendingDown, description: "Track all purchase orders and costs." },
    { title: "Profit & Loss", icon: BarChart, description: "Comprehensive financial performance." },
    { title: "Low Stock Report", icon: AlertTriangle, description: "Identify products needing replenishment." },
    { title: "Expiry Report", icon: FileText, description: "Monitor products approaching expiration." },
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Reports</h1>
      </div>

      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <BarChart className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 font-headline">Unlock Advanced Reporting</CardTitle>
          <CardDescription>
            Gain deeper insights into your business with our comprehensive reporting module.
            <br />
            Upgrade to a Pro plan to access all reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {reports.map(report => (
                    <div key={report.title} className="p-4 rounded-lg bg-background flex items-start gap-4 opacity-50">
                        <report.icon className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold">{report.title}</h3>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button size="lg">Upgrade to Pro</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
