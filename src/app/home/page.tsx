'use client';
import { motion } from 'framer-motion';
import { 
  Building, 
  UserPlus, 
  FileText, 
  Briefcase,
  Users,
  ArrowRight,
  Code,
  Wallet,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useUser, useDoc, useFirestore, useMemoFirebase, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserProfile {
    firstName?: string;
    lastName?: string;
    roleId?: string;
    companyId?: string;
}

export default function HomePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const auth = useAuth();
    const router = useRouter();

    const userDocRef = useMemoFirebase(() => {
        if (!user) return null;
        return doc(firestore, 'users', user.uid);
      }, [firestore, user]);
    
    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [isUserLoading, user, router]);
    
    const handleLogout = () => {
        auth.signOut().then(() => {
            router.push('/login');
        });
    };

    const isLoading = isUserLoading || isProfileLoading;
    const isDeveloper = userProfile?.roleId === 'developer';
    const hasCompany = !!userProfile?.companyId;

  const menuOptions = [
    ...(isDeveloper ? [{ 
        name: 'Developer Dashboard', 
        description: 'Manage all businesses registered in the system.', 
        icon: Code, 
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
     ...(isDeveloper ? [{ 
        name: 'Developer POS', 
        description: 'Access the POS system for development and testing.', 
        icon: Wallet, 
        href: '/pos',
        disabled: false
    }] : []),
  ];

  if (isLoading || !user) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const getInitials = () => {
    const firstName = userProfile?.firstName || '';
    const lastName = userProfile?.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const displayName = userProfile ? `${userProfile.firstName} ${userProfile.lastName}`.trim() : user?.email;
  const roleDisplay = userProfile?.roleId ? userProfile.roleId.charAt(0).toUpperCase() + userProfile.roleId.slice(1) : 'User';

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative">
        
        <div className="absolute top-6 right-6">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-3 h-auto p-2">
                        <div className="text-right">
                           <div className="font-semibold">{displayName}</div>
                           <div className="text-xs text-muted-foreground">{roleDisplay}</div>
                        </div>
                        <Avatar>
                            <AvatarImage src={user?.photoURL || ''} />
                            <AvatarFallback>{getInitials()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
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
