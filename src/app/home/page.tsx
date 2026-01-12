'use client';
import { motion } from 'framer-motion';
import { 
  Building, 
  UserPlus, 
  FileText, 
  Briefcase,
  Users,
  ArrowRight
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
      return <div className="min-h-screen flex items-center justify-center">Loading...</div> // Or a proper skeleton loader
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
            <h1 className="text-4xl font-display font-bold">Welcome to EPOS V 1.2</h1>
            <p className="text-muted-foreground mt-2">Please select an option to continue.</p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl"
            initial="initial"
            animate="animate"
            variants={{
                animate: {
                    transition: {
                        staggerChildren: 0.1,
                    },
                },
            }}
        >
            {menuOptions.map((item) => (
            <motion.div
                key={item.name}
                variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                }}
            >
                <div className={`
                    group relative glass-card p-6 h-full flex flex-col justify-between 
                    transition-all duration-300
                    ${item.disabled 
                        ? 'opacity-50 cursor-not-allowed bg-secondary/30' 
                        : 'hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-1 hover:shadow-xl'
                    }
                `}>
                    <div>
                        <div className={`
                            inline-block p-3 rounded-lg bg-primary/10 mb-4
                            transition-colors duration-300
                            ${!item.disabled ? 'group-hover:bg-primary/20' : ''}
                        `}>
                            <item.icon className={`w-7 h-7 text-primary`} />
                        </div>
                        <h2 className="text-lg font-display font-semibold mb-2 text-foreground">{item.name}</h2>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    
                    <div className="mt-4">
                        {item.disabled ? (
                            <p className="text-xs text-destructive mt-2">{item.disabledText}</p>
                        ) : (
                            <div className="flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span>Continue</span>
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                        )}
                    </div>

                    {!item.disabled && (
                         <Link href={item.href} className="stretched-link" />
                    )}
                </div>
            </motion.div>
            ))}
        </motion.div>
    </div>
  );
}
