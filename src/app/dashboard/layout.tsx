import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { DashboardNav } from '@/components/dashboard-nav';
import { Header } from '@/components/header';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Logo className="h-8 w-8 text-primary" />
              <div className='flex flex-col'>
                <span className="font-headline text-lg">StockFlow</span>
                <span className='text-xs text-muted-foreground'>Inventory Pro</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <DashboardNav />
          </SidebarContent>
          <SidebarFooter></SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
