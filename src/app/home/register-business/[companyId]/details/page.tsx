'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useUser, useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const detailsSchema = z.object({
  ownerFullName: z.string().min(2, 'Full name is required.'),
  ownerContact: z.string().min(10, 'A valid contact number is required.'),
  ownerNic: z.string().min(10, 'A valid NIC is required.'),
  ownerAddress: z.string().min(5, 'Address is required.'),
  officeContact: z.string().optional(),
  workerRange: z.string().min(1, 'Please select a range.'),
  package: z.string().min(1, 'Please select a package.'),
  isRegistered: z.boolean().default(false),
  registrationNumber: z.string().optional(),
}).refine(data => {
    if (data.isRegistered) {
        return !!data.registrationNumber && data.registrationNumber.length > 0;
    }
    return true;
}, {
    message: "Registration number is required if the business is registered.",
    path: ["registrationNumber"],
});

type DetailsFormData = z.infer<typeof detailsSchema>;

export default function BusinessDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const companyId = params.companyId as string;
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<DetailsFormData>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      isRegistered: false,
    },
  });

  const onSubmit = async (data: DetailsFormData) => {
    if (!user || !companyId) {
      toast({
        title: 'Error',
        description: 'Invalid session. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const companyDocRef = doc(firestore, 'companies', companyId);
      await updateDocumentNonBlocking(companyDocRef, {
        ...data,
        status: 'pending', // Update status to 'pending' for developer review
      });

      toast({
        title: 'Registration Submitted!',
        description: 'Your business details have been sent for review.',
      });

      router.push('/home'); // Redirect to a page that shows pending status
    } catch (error) {
      console.error('Error submitting details:', error);
      toast({
        title: 'Submission Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const isRegistered = form.watch('isRegistered');

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl glass-card p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold">Almost there!</h1>
          <p className="text-muted-foreground">
            Please provide a few more details about your business.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                 <h2 className="text-lg font-semibold border-b pb-2">Owner Details</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="ownerFullName" render={({ field }) => (
                        <FormItem><FormLabel>Owner's Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="ownerContact" render={({ field }) => (
                        <FormItem><FormLabel>Owner's Contact No.</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                 </div>
                 <FormField control={form.control} name="ownerNic" render={({ field }) => (
                    <FormItem><FormLabel>Owner's NIC</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                 )}/>
                 <FormField control={form.control} name="ownerAddress" render={({ field }) => (
                    <FormItem><FormLabel>Address on NIC</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                 )}/>
            </div>
            
             <div className="space-y-4">
                 <h2 className="text-lg font-semibold border-b pb-2">Company Details</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="officeContact" render={({ field }) => (
                        <FormItem><FormLabel>Office Contact No. (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="workerRange" render={({ field }) => (
                        <FormItem><FormLabel>Number of Workers</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a range" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="1-5">1-5</SelectItem><SelectItem value="5-10">5-10</SelectItem><SelectItem value="10-20">10-20</SelectItem><SelectItem value="20-50">20-50</SelectItem><SelectItem value="50-100">50-100</SelectItem><SelectItem value="100+">100+</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                 </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="package" render={({ field }) => (
                        <FormItem><FormLabel>Package</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a package" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="basic">Basic</SelectItem><SelectItem value="pro">Pro</SelectItem><SelectItem value="enterprise">Enterprise</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="registrationNumber" render={({ field }) => (
                        <FormItem className={!isRegistered ? 'opacity-50' : ''}>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl><Input {...field} disabled={!isRegistered} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>
                 <FormField control={form.control} name="isRegistered" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none"><FormLabel>Is your business registered?</FormLabel></div>
                    </FormItem>
                )}/>
            </div>
            
            <Button type="submit" className="w-full btn-primary" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
