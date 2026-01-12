'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { KeyRound, Building, User, Info } from 'lucide-react';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, query, where, getDocs, doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const joinSchema = z.object({
  companyCode: z.string().length(6, 'Company code must be 6 characters.'),
});

type JoinFormData = z.infer<typeof joinSchema>;

interface Company {
    id: string;
    name: string;
    country: string;
}

export default function JoinBusinessPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [foundCompany, setFoundCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const form = useForm<JoinFormData>({
    resolver: zodResolver(joinSchema),
  });

  const handleFindCompany = async (data: JoinFormData) => {
    setIsLoading(true);
    setFoundCompany(null);
    setRequestSent(false);
    
    const companiesRef = collection(firestore, 'companies');
    const q = query(companiesRef, where('id', '==', data.companyCode));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast({
          title: 'Not Found',
          description: 'No company found with that code. Please check and try again.',
          variant: 'destructive',
        });
      } else {
        const companyDoc = querySnapshot.docs[0];
        setFoundCompany({ id: companyDoc.id, ...companyDoc.data() as Omit<Company, 'id'> });
      }
    } catch (error) {
      console.error("Error finding company:", error);
      toast({
        title: 'Error',
        description: 'Could not perform search. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendRequest = async () => {
    if (!user || !foundCompany) return;
    
    setIsLoading(true);
    try {
        const requestsRef = collection(firestore, `companies/${foundCompany.id}/joinRequests`);
        await addDocumentNonBlocking(requestsRef, {
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName || 'N/A',
            status: 'pending',
            createdAt: new Date().toISOString(),
        });

        setRequestSent(true);
        toast({
            title: 'Request Sent!',
            description: `Your request to join ${foundCompany.name} has been sent for approval.`,
        });

    } catch (error) {
        console.error("Error sending join request:", error);
        toast({
            title: 'Error',
            description: 'Could not send your request. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold">Join a Business</h1>
          <p className="text-muted-foreground">
            Enter your company's secret code to request access.
          </p>
        </div>

        {!foundCompany ? (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFindCompany)} className="space-y-6 glass-card p-8">
                <FormField
                control={form.control}
                name="companyCode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Company Code</FormLabel>
                    <FormControl>
                        <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input placeholder="e.g., AB12CD" className="pl-10 font-mono tracking-widest" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Find Company'}
                </Button>
            </form>
            </Form>
        ) : (
             <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="glass-card p-8 text-center">
                <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-xl font-bold">{foundCompany.name}</h2>
                <p className="text-muted-foreground mb-6">{foundCompany.country}</p>
                
                {requestSent ? (
                    <Alert variant="default" className="text-left">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Request Sent</AlertTitle>
                        <AlertDescription>
                            Your request is pending approval from an administrator of {foundCompany.name}. You can check the status on the "My Join Requests" page.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Button onClick={handleSendRequest} className="w-full btn-primary" disabled={isLoading}>
                        {isLoading ? 'Sending Request...' : 'Send Join Request'}
                    </Button>
                )}

                <Button variant="link" className="mt-4" onClick={() => setFoundCompany(null)}>Search for another company</Button>
            </motion.div>
        )}
      </motion.div>
    </div>
  );
}
