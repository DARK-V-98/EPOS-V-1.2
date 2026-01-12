'use client';
import { motion } from 'framer-motion';
import { useUser, useDoc, useCollection, useFirestore, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc, collection, query, where, deleteDoc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Building, Users, Mail, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfile {
  companyId?: string;
}

interface CompanyUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
}

interface JoinRequest {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    createdAt: string;
    status: 'pending' | 'approved' | 'denied';
}

export default function CompanyManagementPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userDocRef);
  const companyId = userProfile?.companyId;

  // Fetch users of the same company
  const companyUsersCollectionRef = useMemoFirebase(() => {
    if (!companyId) return null;
    return query(collection(firestore, 'users'), where('companyId', '==', companyId));
  }, [firestore, companyId]);
  const { data: companyUsers, isLoading: usersLoading } = useCollection<CompanyUser>(companyUsersCollectionRef);
  
  // Fetch join requests for the company
  const joinRequestsCollectionRef = useMemoFirebase(() => {
    if (!companyId) return null;
    return collection(firestore, `companies/${companyId}/joinRequests`);
  }, [firestore, companyId]);
  const { data: joinRequests, isLoading: requestsLoading } = useCollection<JoinRequest>(joinRequestsCollectionRef);

  const handleRequest = async (requestId: string, newStatus: 'approved' | 'denied') => {
    if (!companyId) return;

    const requestDocRef = doc(firestore, `companies/${companyId}/joinRequests`, requestId);
    const request = joinRequests?.find(r => r.id === requestId);
    
    if (!request) return;

    try {
        if (newStatus === 'approved') {
            // Update user's companyId and role
            const userToUpdateRef = doc(firestore, 'users', request.userId);
            await updateDocumentNonBlocking(userToUpdateRef, { companyId: companyId, roleId: 'staff' });
        }
        
        // Update the request status
        await updateDocumentNonBlocking(requestDocRef, { status: newStatus });
        
        toast({
            title: `Request ${newStatus}`,
            description: `The request from ${request.userName} has been ${newStatus}.`,
        });

    } catch (error) {
        console.error("Error handling request:", error);
        toast({ title: 'Error', description: 'Failed to update request.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
       <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-display font-bold"
          >
            Company Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Manage your company's users and join requests.
          </motion.p>
        </div>

        <Tabs defaultValue="users" className="w-full">
            <TabsList>
                <TabsTrigger value="users">
                    <Users className="w-4 h-4 mr-2" />
                    Company Users
                </TabsTrigger>
                <TabsTrigger value="requests">
                    <Mail className="w-4 h-4 mr-2" />
                    Join Requests
                    {joinRequests && joinRequests.filter(r => r.status === 'pending').length > 0 && (
                        <Badge className="ml-2">{joinRequests.filter(r => r.status === 'pending').length}</Badge>
                    )}
                </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
                <Card>
                    <CardHeader>
                        <CardTitle>Company Users</CardTitle>
                        <CardDescription>Users who are part of your company.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {usersLoading && <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>}
                               {companyUsers?.map(member => (
                                   <TableRow key={member.id}>
                                       <TableCell>{member.firstName} {member.lastName}</TableCell>
                                       <TableCell>{member.email}</TableCell>
                                       <TableCell>
                                           <Badge variant="secondary">{member.roleId}</Badge>
                                       </TableCell>
                                   </TableRow>
                               ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="requests">
                <Card>
                    <CardHeader>
                        <CardTitle>Join Requests</CardTitle>
                        <CardDescription>Approve or deny requests to join your company.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requestsLoading && <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>}
                                {joinRequests?.map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell>
                                            <div className="font-medium">{req.userName}</div>
                                            <div className="text-sm text-muted-foreground">{req.userEmail}</div>
                                        </TableCell>
                                        <TableCell>{new Date(req.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={req.status === 'pending' ? 'default' : req.status === 'approved' ? 'success' : 'destructive'}>
                                                {req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {req.status === 'pending' && (
                                                <div className="space-x-2">
                                                    <Button size="sm" variant="outline" onClick={() => handleRequest(req.id, 'denied')}><X className="w-4 h-4"/></Button>
                                                    <Button size="sm" onClick={() => handleRequest(req.id, 'approved')}><Check className="w-4 h-4"/></Button>
                                                </div>
                                            )}
                                        </TableCell>
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
