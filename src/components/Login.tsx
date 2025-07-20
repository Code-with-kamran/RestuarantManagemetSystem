// components/pages/Login.tsx
'use client'
import { Coffee } from 'lucide-react';
import Link from 'next/link';


import { useState } from 'react';




export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 

  return (
    // Outer container: Uses background and a gradient with primary color
    <div className="h-screen overflow-auto custom-scrollbar bg-background flex items-center justify-center  p-4">
      {/* Gradient overlay for visual effect, using primary color with opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-button-primary/20 to-button-primary/40 pointer-events-none"></div>

      {/* Login Card */}
      <div className="bg-card-background rounded-2xl shadow-2xl w-screen max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          {/* Coffee Icon */}
          <div className="w-20 h-20 bg-button-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Coffee className="w-10 h-10 text-button-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Restaurant POS</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              placeholder="Enter your password"
            />
          </div>        

          {/* Sign In Button */}
          <Link href="/dashboard"> 
          <button
             // Call handleLogin which then calls onLogin
            className="bg-button-primary hover:bg-button-primary-hover  mt-4 text-button-primary-foreground w-full rounded-full p-3 font-semibold text-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75"
          >
            Sign In
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};