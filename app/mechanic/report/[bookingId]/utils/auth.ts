/**
 * Check if the current user is an admin
 * Checks both adminToken/adminUser and regular token/user for admin role
 */
export function isAdminUser(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check admin token first (preferred method)
  const adminToken = localStorage.getItem('adminToken');
  const adminUserStr = localStorage.getItem('adminUser');
  
  if (adminToken && adminUserStr) {
    try {
      const adminUser = JSON.parse(adminUserStr);
      if (adminUser && typeof adminUser === 'object' && adminUser.role === 'admin') {
        return true;
      }
    } catch (error) {
      console.error('Error parsing admin user data:', error);
    }
  }
  
  // Also check regular user token (in case admin uses regular login)
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user && typeof user === 'object' && user.role === 'admin') {
        return true;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
  
  return false;
}

