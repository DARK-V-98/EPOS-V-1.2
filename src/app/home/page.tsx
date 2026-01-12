'use client';
import { motion } from 'framer-motion';
import { 
  Building, 
  UserPlus, 
  FileText, 
  Briefcase,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

interface UserProfile {
    roleId?: string;
    companyId?: string;
}

export default function HomePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
      }, [firestore, user]);
    
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    const isLoading = isUserLoading || isProfileLoading;
    const isDeveloper = userProfile?.roleId === 'developer';
    const hasCompany = !!userProfile?.companyId;

  const menuOptions = [
    ...(isDeveloper ? [{ 
        name: 'Developer Dashboard', 
        description: 'Manage all businesses registered in the system.', 
        icon: Users, 
        href: '/dashboard/developer',
        disabled: false
    }] : []),
    { 
        name: 'My Dashboard', 
        description: 'Access your company\'s POS and dashboard.', 
        icon: Briefcase, 
        href: '/dashboard',
        disabled: !hasCompany,
        disabledText: 'You must be part of a company to access the dashboard.'
    },
    { 
        name: 'Register a Business', 
        description: 'Create a new company profile for your business.', 
        icon: Building, 
        href: '/home/register-business',
        disabled: hasCompany,
        disabledText: 'You are already part of a company.'
    },
    { 
        name: 'Join a Business', 
        description: 'Find and join an existing company with a secret code.', 
        icon: UserPlus, 
        href: '/home/join-business',
        disabled: hasCompany,
        disabledText: 'You are already part of a company.'
    },
    { 
        name: 'My Join Requests', 
        description: 'View the status of your requests to join companies.', 
        icon: FileText, 
        href: '/home/requests',
        disabled: hasCompany,
        disabledText: 'You are already part of a company.'
    },
  ];

  if (isLoading) {
      return <div>Loading...</div> // Or a proper skeleton loader
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
            <h1 className="text-4xl font-display font-bold">Welcome to StockFlow</h1>
            <p className="text-muted-foreground mt-2">Please select an option to continue.</p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
        >
            {menuOptions.map((item) => (
            <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={!item.disabled ? { scale: 1.05, y: -5 } : {}}
            >
                <div className={`relative glass-card p-6 text-center h-full flex flex-col justify-between ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}>
                    <div>
                        <div className={`inline-block p-4 rounded-xl bg-primary/10 mb-4`}>
                            <item.icon className={`w-8 h-8 text-primary`} />
                        </div>
                        <h2 className="text-lg font-display font-semibold mb-2">{item.name}</h2>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {item.disabled ? (
                        <p className="text-xs text-destructive mt-4">{item.disabledText}</p>
                    ) : (
                         <Link href={item.href} className="stretched-link" />
                    )}
                </div>
            </motion.div>
            ))}
        </motion.div>
    </div>
  );
}
