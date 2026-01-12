'use client';
import { motion } from 'framer-motion';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Shield, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Role {
  id: string;
  name: string;
  permissions: {
    viewInventory: boolean;
    manageProducts: boolean;
    salesAccess: boolean;
    purchaseAccess: boolean;
    reportsAccess: boolean;
    settingsAccess: boolean;
    advancedAccess: boolean;
  };
}

const permissionLabels: { [key: string]: string } = {
  viewInventory: 'View Inventory',
  manageProducts: 'Add/Edit Products',
  salesAccess: 'Sales Access',
  purchaseAccess: 'Purchase Access',
  reportsAccess: 'Reports Access',
  settingsAccess: 'Settings Access',
  advancedAccess: 'Advanced Access',
};

export default function RolesPage() {
  const firestore = useFirestore();
  const rolesCollectionRef = useMemoFirebase(() => collection(firestore, 'roles'), [firestore]);
  const { data: roles, isLoading, error } = useCollection<Role>(rolesCollectionRef);

  const handlePermissionChange = (roleId: string, permission: keyof Role['permissions'], value: boolean) => {
    const roleDocRef = doc(firestore, 'roles', roleId);
    updateDocumentNonBlocking(roleDocRef, {
      [`permissions.${permission}`]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-display font-bold"
        >
          Roles & Permissions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mt-1"
        >
          Define what users can see and do in your system.
        </motion.p>
      </div>

      {isLoading && <p>Loading roles...</p>}
      {error && <p className="text-destructive">Error loading roles: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles?.sort((a, b) => a.name.localeCompare(b.name)).map((role, index) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <CardTitle>{role.name}</CardTitle>
                </div>
                <CardDescription>Manage permissions for the {role.name} role.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(permissionLabels).map((key) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                    <Label htmlFor={`${role.id}-${key}`} className="font-medium">
                      {permissionLabels[key]}
                    </Label>
                    <Switch
                      id={`${role.id}-${key}`}
                      checked={role.permissions[key as keyof Role['permissions']]}
                      onCheckedChange={(value) =>
                        handlePermissionChange(role.id, key as keyof Role['permissions'], value)
                      }
                      disabled={role.name === 'Developer'}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
