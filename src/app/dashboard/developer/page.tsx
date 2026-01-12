'use client';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Building, Users } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';

interface Company {
    id: string;
    name: string;
    ownerId: string;
    status: 'pending' | 'approved' | 'rejected' | 'pending_details';
    ownerFullName?: string;
    ownerContact?: string;
    ownerNic?: string;
    package?: string;
    createdAt: string;
}

export default function DeveloperDashboard() {
  const firestore = useFirestore();

  const companiesCollectionRef = useMemoFirebase(() => collection(firestore, 'companies'), [firestore]);
  const { data: companies, isLoading: companiesLoading } = useCollection<Company>(companiesCollectionRef);
  
  const usersCollectionRef = useMemoFirebase(() => collection(firestore, 'users'), [firestore]);
  const { data: users, isLoading: usersLoading } = useCollection<any>(usersCollectionRef);

  const handleCompanyRequest = (companyId: string, status: 'approved' | 'rejected') => {
      const companyDocRef = doc(firestore, 'companies', companyId);
      updateDocumentNonBlocking(companyDocRef, { status });
  };
  
  const pendingCompanies = companies?.filter(c => c.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-display font-bold"
          >
            Developer Panel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Manage users and companies registered in the system.
          </motion.p>
        </div>
      </div>

       <Tabs defaultValue="requests" className="w-full">
            <TabsList>
                <TabsTrigger value="requests">
                    <Building className="w-4 h-4 mr-2" />
                    Business Requests
                    {pendingCompanies && pendingCompanies.length > 0 && (
                        <Badge className="ml-2">{pendingCompanies.length}</Badge>
                    )}
                </TabsTrigger>
                <TabsTrigger value="companies">
                    <Building className="w-4 h-4 mr-2" />
                    All Companies
                </TabsTrigger>
                 <TabsTrigger value="users">
                    <Users className="w-4 h-4 mr-2" />
                    All Users
                </TabsTrigger>
            </TabsList>

            <TabsContent value="requests">
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Business Registrations</CardTitle>
                        <CardDescription>Review and approve or reject new business submissions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company Name</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Package</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companiesLoading && <TableRow><TableCell colSpan={5}>Loading requests...</TableCell></TableRow>}
                                {pendingCompanies?.map(company => (
                                     <TableRow key={company.id}>
                                         <TableCell>{company.name}</TableCell>
                                         <TableCell>
                                             <div className="font-medium">{company.ownerFullName}</div>
                                             <div className="text-sm text-muted-foreground">{company.ownerContact}</div>
                                         </TableCell>
                                         <TableCell><Badge variant="secondary">{company.package}</Badge></TableCell>
                                         <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                                         <TableCell className="text-right space-x-2">
                                              <Button size="sm" variant="outline" onClick={() => handleCompanyRequest(company.id, 'rejected')}><X className="w-4 h-4"/></Button>
                                              <Button size="sm" onClick={() => handleCompanyRequest(company.id, 'approved')}><Check className="w-4 h-4"/></Button>
                                         </TableCell>
                                     </TableRow>
                                ))}
                                {pendingCompanies?.length === 0 && <TableRow><TableCell colSpan={5} className="text-center">No pending requests.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="companies">
                <Card>
                    <CardHeader><CardTitle>All Companies</CardTitle></CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Owner ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                 {companiesLoading && <TableRow><TableCell colSpan={4}>Loading companies...</TableCell></TableRow>}
                                 {companies?.map(company => (
                                     <TableRow key={company.id}>
                                         <TableCell>{company.name}</TableCell>
                                         <TableCell>{company.ownerId}</TableCell>
                                         <TableCell><Badge variant={company.status === 'approved' ? 'success' : company.status === 'pending' ? 'default' : 'destructive'}>{company.status}</Badge></TableCell>
                                         <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                                     </TableRow>
                                 ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
             </TabsContent>

             <TabsContent value="users">
                <Card>
                    <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
                     <CardContent>
                        <Table>
                             <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Company ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usersLoading && <TableRow><TableCell colSpan={4}>Loading users...</TableCell></TableRow>}
                                {users?.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.firstName} {user.lastName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell><Badge variant="secondary">{user.roleId}</Badge></TableCell>
                                        <TableCell>{user.companyId || 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
