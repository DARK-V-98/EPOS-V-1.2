'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BarChart,
  Boxes,
  CreditCard,
  Folder,
  LayoutDashboard,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Users,
  Users2,
  Warehouse,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Inventory',
    icon: Boxes,
    subItems: [
      { href: '/dashboard/products', label: 'Products' },
      { href: '/dashboard/categories', label: 'Categories' },
      { href: '/dashboard/warehouses', label: 'Warehouses' },
    ],
  },
  {
    label: 'Orders',
    icon: ShoppingCart,
    subItems: [
      { href: '/dashboard/purchases', label: 'Purchases' },
      { href: '/pos', label: 'Sales / POS' },
    ],
  },
  {
    label: 'People',
    icon: Users,
    subItems: [
      { href: '/dashboard/customers', label: 'Customers' },
      { href: '/dashboard/suppliers', label: 'Suppliers' },
    ],
  },
  {
    href: '/dashboard/reports',
    label: 'Reports',
    icon: BarChart,
  },
  {
    href: '/dashboard/users',
    label: 'Users & Roles',
    icon: Users2,
  },
];

const settingsItems = [
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
  {
    href: '/dashboard/subscription',
    label: 'Subscription',
    icon: CreditCard,
  },
  {
    href: '/dashboard/security',
    label: 'Security & Logs',
    icon: Shield,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const isSubItemActive = (subItems: { href: string }[]) => {
    return subItems.some((item) => item.href === pathname);
  };

  if (state === 'collapsed') {
    return (
      <>
        <SidebarMenu>
          {[...menuItems, ...settingsItems].map((item, index) =>
            item.subItems ? (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  tooltip={{ children: item.label, side: 'right' }}
                  isActive={isSubItemActive(item.subItems)}
                  asChild
                >
                  <Link href={item.subItems[0].href}>
                    <item.icon />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  tooltip={{ children: item.label, side: 'right' }}
                  isActive={pathname === item.href}
                  asChild
                >
                  <Link href={item.href!}>
                    <item.icon />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </>
    );
  }

  return (
    <>
      <SidebarMenu className="flex-grow">
        {menuItems.map((item, index) =>
          item.subItems ? (
            <Collapsible key={index} defaultOpen={isSubItemActive(item.subItems)}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="w-full justify-between"
                    isActive={isSubItemActive(item.subItems)}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform [&[data-state=open]]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.subItems.map((subItem, subIndex) => (
                    <SidebarMenuItem key={subIndex}>
                      <SidebarMenuSubButton isActive={pathname === subItem.href} asChild>
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton isActive={pathname === item.href} asChild>
                <Link href={item.href!}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>

      <SidebarMenu>
        {settingsItems.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton isActive={pathname === item.href} asChild>
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}
