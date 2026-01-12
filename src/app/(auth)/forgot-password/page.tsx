'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Password Reset Email Sent',
      description: 'Please check your inbox for instructions to reset your password.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email and we will send you instructions to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleReset} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Remembered your password?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
