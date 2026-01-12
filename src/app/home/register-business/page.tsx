'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Building, Globe, Phone } from 'lucide-react';
import { useUser, useFirestore, addDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

const businessSchema = z.object({
  name: z.string().min(2, 'Business name must be at least 2 characters.'),
  country: z.string().min(2, 'Country is required.'),
  phone: z.string().optional(),
});

type BusinessFormData = z.infer<typeof businessSchema>;

export default function RegisterBusinessPage() {
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: '',
      country: 'Sri Lanka',
      phone: '',
    },
  });

  const onSubmit = async (data: BusinessFormData) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to register a business.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // 1. Create the company document
      const companyCollectionRef = collection(firestore, 'companies');
      const companyDocRef = await addDocumentNonBlocking(companyCollectionRef, {
        name: data.name,
        country: data.country,
        phone: data.phone,
        ownerId: user.uid,
        createdAt: new Date().toISOString(),
      });
      
      if(!companyDocRef) {
        throw new Error('Could not create company document.');
      }

      // 2. Update the user's document with the new companyId and set role to 'admin'
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDocumentNonBlocking(userDocRef, {
        companyId: companyDocRef.id,
        roleId: 'admin', // The user who registers the business becomes the admin
      });

      toast({
        title: 'Business Registered!',
        description: `${data.name} has been created successfully.`,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error registering business:', error);
      toast({
        title: 'Registration Failed',
        description: 'An error occurred while registering your business. Please try again.',
        variant: 'destructive',
      });
    }
  };

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
            Create a company profile to start using EPOS V 1.2.
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                       <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <select {...field} className="input-field pl-10 appearance-none w-full">
                            <option>Sri Lanka</option>
                            <option>India</option>
                            <option>Singapore</option>
                            <option>Malaysia</option>
                            <option>Japan</option>
                            <option>South Korea</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Canada</option>
                            <option>Australia</option>
                            <option>Germany</option>
                            <option>France</option>
                          </select>
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input type="tel" placeholder="+94 77 123 4567" className="pl-10" {...field} />
                       </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" className="w-full btn-primary" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Registering...' : 'Create Business Profile'}
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
