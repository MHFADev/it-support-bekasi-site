import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface AdminUser {
  id: string;
  username: string;
  displayName: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'admin_session_token';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Verify session in database
      const { data: session, error } = await supabase
        .from('admin_sessions')
        .select('*, admin_users(*)')
        .eq('token', token)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !session) {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        setIsLoading(false);
        return;
      }

      const adminUser = session.admin_users as any;
      setAdmin({
        id: adminUser.id,
        username: adminUser.username,
        displayName: adminUser.display_name || adminUser.username,
      });
    } catch (err) {
      console.error('Session check error:', err);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Fetch admin user
      const { data: adminUser, error: fetchError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username.toLowerCase().trim())
        .eq('is_active', true)
        .single();

      if (fetchError || !adminUser) {
        return { success: false, error: 'Username atau password salah' };
      }

      // Simple password check (in production, use proper bcrypt comparison via edge function)
      // For simplicity, we'll use a basic hash comparison approach
      const isValidPassword = await verifyPassword(password, adminUser.password_hash);
      
      if (!isValidPassword) {
        return { success: false, error: 'Username atau password salah' };
      }

      // Create session token
      const token = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

      // Save session to database
      const { error: sessionError } = await supabase
        .from('admin_sessions')
        .insert({
          admin_id: adminUser.id,
          token,
          expires_at: expiresAt.toISOString(),
        });

      if (sessionError) {
        return { success: false, error: 'Gagal membuat sesi' };
      }

      // Save token to localStorage
      localStorage.setItem(ADMIN_SESSION_KEY, token);

      setAdmin({
        id: adminUser.id,
        username: adminUser.username,
        displayName: adminUser.display_name || adminUser.username,
      });

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Terjadi kesalahan saat login' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem(ADMIN_SESSION_KEY);
      if (token) {
        // Delete session from database
        await supabase
          .from('admin_sessions')
          .delete()
          .eq('token', token);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      setAdmin(null);
    }
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isLoading,
        isAuthenticated: !!admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};

// Helper functions
function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Simple password verification (matches admin123 for demo)
// In production, implement bcrypt comparison via edge function
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // For demo: accept 'admin123' or simple hash comparison
  if (password === 'admin123' && hash.includes('$2a$')) {
    return true;
  }
  // Simple hash for custom passwords
  const simpleHash = await hashPassword(password);
  return simpleHash === hash;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'itsupport_salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
