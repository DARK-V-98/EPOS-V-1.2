'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  BarChart,
  Boxes,
  CreditCard,
  Folder,
  LayoutGrid,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Users,
  Users2,
  Warehouse,
  Bell,
  Wallet,
  FileText,
  LifeBuoy
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { Badge } from './ui/badge';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutGrid,
  },
  { href: '/dashboard/products', label: 'Products', icon: Boxes },
  { href: '/dashboard/categories', label: 'Categories', icon: Folder },
  { href: '/dashboard/warehouses', label: 'Warehouses', icon: Warehouse },
  { href: '/dashboard/suppliers', label: 'Suppliers', icon: Truck },
  { href: '/dashboard/purchases', label: 'Purchases', icon: ShoppingCart },
  { href: '/pos', label: 'POS', icon: Wallet  },
  { href: '/dashboard/customers', label: 'Customers', icon: Users },
  { href: '/dashboard/reports', label: 'Reports', icon: BarChart, pro: true },
  { href: '/dashboard/notifications', label: 'Notifications', icon: Bell, count: 3 },
];

const settingsItems = [
   {
    href: '/dashboard/subscription',
    label: 'Subscription',
    icon: CreditCard,
  },
  {
    href: '/dashboard/users',
    label: 'Users & Roles',
    icon: Users2,
    subItems: [
        { href: '/dashboard/users', label: 'Users List' },
        { href: '/dashboard/users/add', label: 'Add User' },
        { href: '/dashboard/roles', label: 'Roles & Permissions' },
    ]
  },
  {
    href: '/dashboard/security',
    label: 'Security',
    icon: Shield,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isSubItemActive = (subItems?: { href: string }[]) => {
    if (!subItems) return false;
    return subItems.some((item) => pathname.startsWith(item.href));
  };
  
  const renderMenuItem = (item: any) => {
     if (item.subItems) {
      return (
         <Collapsible key={item.href} defaultOpen={isSubItemActive(item.subItems)}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="w-full justify-between"
                    isActive={pathname === item.href || isSubItemActive(item.subItems)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subItems.map((subItem: any, subIndex: number) => (
                    <SidebarMenuItem key={subIndex}>
                      <SidebarMenuSubButton isActive={pathname === subItem.href} asChild>
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
      )
    }

    return (
       <SidebarMenuItem key={item.href}>
        <SidebarMenuButton isActive={pathname === item.href} asChild>
          <Link href={item.href!}>
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </div>
             {item.pro && <Badge variant="destructive" className="ml-auto bg-primary text-primary-foreground">Pro</Badge>}
             {item.count && <Badge variant="secondary" className="ml-auto">{item.count}</Badge>}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  if (state === 'collapsed') {
    // Simplified view for collapsed state
    return (
      <SidebarMenu>
        {[...menuItems, ...settingsItems].map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              tooltip={{ children: item.label, side: 'right' }}
              isActive={pathname === item.href || isSubItemActive(item.subItems)}
              asChild
            >
              <Link href={item.subItems ? item.subItems[0].href : item.href!}>
                <item.icon />
                <span className="sr-only">{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SidebarGroup className="flex-grow">
        <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
        <SidebarMenu>
          {menuItems.map(renderMenuItem)}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
         <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
        <SidebarMenu>
          {settingsItems.map(renderMenuItem)}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
