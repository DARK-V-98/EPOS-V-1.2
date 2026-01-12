import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Warehouse,
  Truck,
  ShoppingCart,
  Receipt,
  Users,
  BarChart3,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  CreditCard,
  Shield,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { 
    icon: Package, 
    label: 'Products', 
    children: [
      { label: 'Product List', path: '/products' },
      { label: 'Add Product', path: '/products/add' },
      { label: 'Categories', path: '/categories' },
    ]
  },
  { icon: Warehouse, label: 'Warehouses', path: '/warehouses' },
  { icon: Truck, label: 'Suppliers', path: '/suppliers' },
  { 
    icon: ShoppingCart, 
    label: 'Purchases',
    children: [
      { label: 'Purchase List', path: '/purchases' },
      { label: 'Add Purchase', path: '/purchases/add' },
      { label: 'Returns', path: '/purchases/returns' },
    ]
  },
  { 
    icon: Receipt, 
    label: 'Sales',
    children: [
      { label: 'POS', path: '/pos' },
      { label: 'Sales List', path: '/sales' },
      { label: 'Returns', path: '/sales/returns' },
    ]
  },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: BarChart3, label: 'Reports', path: '/reports', badge: 'Pro' },
  { icon: Bell, label: 'Notifications', path: '/notifications', badge: '3' },
];

const bottomNavItems: NavItem[] = [
  { icon: CreditCard, label: 'Subscription', path: '/subscription' },
  { icon: Shield, label: 'Security', path: '/security' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Products']);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderNavItem = (item: NavItem, index: number) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const active = item.path ? isActive(item.path) : item.children?.some(child => isActive(child.path));

    return (
      <motion.div
        key={item.label}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {hasChildren ? (
          <div>
            <button
              onClick={() => toggleExpand(item.label)}
              className={`nav-link w-full justify-between ${active ? 'active' : ''}`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </span>
              <span className="flex items-center gap-2">
                {item.badge && (
                  <span className={`badge ${item.badge === 'Pro' ? 'badge-primary' : 'badge-warning'}`}>
                    {item.badge}
                  </span>
                )}
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </span>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 mt-1 space-y-1 overflow-hidden"
                >
                  {item.children?.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`nav-link text-sm ${isActive(child.path) ? 'active' : ''}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to={item.path!}
            onClick={() => setIsMobileOpen(false)}
            className={`nav-link ${active ? 'active' : ''}`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium flex-1">{item.label}</span>
            {item.badge && (
              <span className={`badge ${item.badge === 'Pro' ? 'badge-primary' : 'badge-warning'}`}>
                {item.badge}
              </span>
            )}
          </Link>
        )}
      </motion.div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">StockFlow</h1>
            <p className="text-xs text-muted-foreground">Inventory Pro</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>
        {navItems.map((item, index) => renderNavItem(item, index))}
        
        <div className="pt-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
            Settings
          </p>
          {bottomNavItems.map((item, index) => renderNavItem(item, navItems.length + index))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <span className="font-semibold text-primary">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">Admin</p>
          </div>
          <button className="btn-ghost p-2">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden btn-ghost p-2 bg-card border border-border"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-300 lg:transform-none
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {sidebarContent}
      </aside>
    </>
  );
}
