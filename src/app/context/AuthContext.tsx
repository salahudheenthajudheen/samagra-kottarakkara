'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  user: any | null;
  session: any | null;
  isLoading: boolean;
  isAdmin: boolean;
  schoolId: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: false,
  isAdmin: true, // Default to true for now to allow access
  schoolId: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<any | null>(null);
  const [session] = useState<any | null>(null);
  const [isLoading] = useState(false);
  const [isAdmin] = useState(true); // Default to true for now
  const [schoolId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isAdmin, schoolId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 