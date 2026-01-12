'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
        </Link>

        <h1 className="text-3xl font-display font-bold mb-4">Forgot Password</h1>
        <p className="text-muted-foreground mb-8">
          Enter your email to receive a password reset link.
        </p>

        <form className="space-y-4">
           <div>
              <label className="block text-sm font-medium mb-2 text-left">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Send Reset Link
            </button>
        </form>
        
        <button 
          onClick={() => router.back()} 
          className="btn-ghost mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>
      </motion.div>
    </div>
  );
};
