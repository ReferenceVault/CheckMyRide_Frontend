import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  fullName?: string;
}

export function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Check for admin token and user
      const adminToken = localStorage.getItem('adminToken');
      const adminUserStr = localStorage.getItem('adminUser');

      if (!adminToken || !adminUserStr) {
        router.push('/admin/login');
        setIsLoading(false);
        return;
      }

      try {
        const adminUser = JSON.parse(adminUserStr);
        
        // Check if user has admin role
        if (adminUser.role !== 'admin') {
          // User is not admin, redirect to login
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
          setIsLoading(false);
          return;
        }

        setUser(adminUser);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error parsing admin user data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  return {
    user,
    isAdmin,
    isLoading,
    logout,
  };
}

