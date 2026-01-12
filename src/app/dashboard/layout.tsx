'use client';
import { motion } from 'framer-motion';
import { Bell, Search, Plus, Menu, X, Sparkles } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border px-6 flex items-center justify-between">
         <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden btn-ghost p-2 -ml-2"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-4 flex-1 lg:pl-0">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products, suppliers, orders..."
                className="input-field pl-10 py-2 text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-primary py-2 text-sm hidden sm:flex">
              <Plus className="w-4 h-4" />
              <span>Quick Add</span>
            </button>
            <button className="btn-ghost p-2 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
