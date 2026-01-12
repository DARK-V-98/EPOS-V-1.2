'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Building, Info, FileCheck, Clock } from 'lucide-react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { collection, doc, addDoc, query, where, getDocs } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const businessNameSchema = z.object({
  name: z.string().min(2, 'Business name must be at least 2 characters.'),
});
type BusinessNameFormData = z.infer<typeof businessNameSchema>;

export default function RegisterBusinessPage() {
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const [companyStatus, setCompanyStatus] = useState<'not_registered' | 'pending' | 'approved' | 'rejected'>('not_registered');
  const [companyId, setCompanyId] = useState<string | null>(null);

  const companyQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'companies'), where('ownerId', '==', user.uid));
  }, [firestore, user]);

  useDoc(companyQuery, {
    onSuccess: (snapshot) => {
      if (!snapshot.empty) {
        const companyDoc = snapshot.docs[0];
        setCompanyId(companyDoc.id);
        const companyData = companyDoc.data();
        if (companyData) {
          setCompanyStatus(companyData.status || 'pending');
        }
      }
    }
  });

  const form = useForm<BusinessNameFormData>({
    resolver: zodResolver(businessNameSchema),
    defaultValues: { name: '' },
  });

  const onSubmit = async (data: BusinessNameFormData) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to register a business.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const companyCollectionRef = collection(firestore, 'companies');
      const companyDocRef = await addDoc(companyCollectionRef, {
        name: data.name,
        ownerId: user.uid,
        createdAt: new Date().toISOString(),
        status: 'pending_details', // New status
      });

      if (!companyDocRef) {
        throw new Error('Could not create company document.');
      }
      
      router.push(`/home/register-business/${companyDocRef.id}/details`);

    } catch (error) {
      console.error('Error registering business name:', error);
      toast({
        title: 'Registration Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  if (companyId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg glass-card p-8"
        >
          <div className="text-center">
            {companyStatus === 'pending' && (
              <>
                <Clock className="w-12 h-12 text-warning mx-auto mb-4" />
                <h1 className="text-3xl font-display font-bold">Registration Pending</h1>
                <p className="text-muted-foreground mt-2">
                  Your business registration is currently under review by our team.
                </p>
                 <p className="text-sm text-muted-foreground mt-2">
                   You will be notified once a decision has been made.
                 </p>
              </>
            )}
             {companyStatus === 'approved' && (
              <>
                <FileCheck className="w-12 h-12 text-success mx-auto mb-4" />
                <h1 className="text-3xl font-display font-bold">Registration Approved!</h1>
                <p className="text-muted-foreground mt-2">
                  Congratulations! Your business is now active. You can access your dashboard.
                </p>
                <Link href="/dashboard" className="btn-primary mt-6">Go to Dashboard</Link>
              </>
            )}
             {companyStatus === 'rejected' && (
              <>
                <Info className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h1 className="text-3xl font-display font-bold">Registration Update</h1>
                 <p className="text-muted-foreground mt-2">
                  There was an issue with your registration. Please check your email for details from our support team.
                </p>
              </>
            )}
            <Link href="/home" className="block mt-6 text-sm text-primary hover:underline">Back to Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass-card p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold">Register Your Business</h1>
          <p className="text-muted-foreground">
            Let's start with your business name.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input placeholder="Your Company LLC" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full btn-primary" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Saving...' : 'Continue'}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground mt-6">
            Already have a business? <Link href="/home/join-business" className="text-primary hover:underline">Join one instead</Link>.
        </p>
      </motion.div>
    </div>
  );
}
