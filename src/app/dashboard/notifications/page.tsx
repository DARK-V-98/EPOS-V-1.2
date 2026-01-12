import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold font-headline">Notifications</h1>

      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
          <CardDescription>Keep track of important updates and alerts.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
            <div className="bg-muted p-4 rounded-full">
                <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
          <h3 className="text-lg font-semibold">No new notifications</h3>
          <p className="text-muted-foreground">You're all caught up!</p>
        </CardContent>
      </Card>
    </div>
  );
}
