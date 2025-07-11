'use client'
import { Coffee } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from "next/navigation";

interface LoginScreenProps {
  onLogin: () => void;
  onRoleChange: (role: string) => string;
}

export const LoginScreen = ({ onLogin, onRoleChange }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter()
  const handleLogin = () => {
    if (username && password && role) {
      onRoleChange(role);
      onLogin();
    }
    console.log("handle login")
  };

  return (
    <div className="max-h-screen bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-0">
            <Coffee className="w-10 h-10 text-background" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Restaurant POS</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Role</label>
            <select 
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                onRoleChange(e.target.value);
              }}
              className="w-full pr-6 py-3 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          
          <button onClick={()=>{router.push('/dashboard')}} className='bg-amber-400 w-full rounded-full p-3'>
             Sign In
          </button>
        </div>
      </div>
    </div>
  );
};