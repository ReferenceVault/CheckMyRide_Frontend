'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AdminLayout from '../../../components/layout/AdminLayout';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'mechanic';
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAdminAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: string | null; userName: string }>({
    isOpen: false,
    userId: null,
    userName: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && user) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isAuthLoading, user]);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setError(null);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('Authentication required. Please login again.');
        setIsLoadingUsers(false);
        return;
      }

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });

      const response = await fetch(`${API_URL}/api/auth/users?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
      setPagination(data.pagination || {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0,
      });
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError(error.message || 'Failed to fetch users');
      toast.error(error.message || 'Failed to fetch users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800 border-purple-200',
      mechanic: 'bg-blue-100 text-blue-800 border-blue-200',
      user: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return styles[role as keyof typeof styles] || styles.user;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDeleteClick = (userId: string, userName: string) => {
    setDeleteModal({
      isOpen: true,
      userId,
      userName,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.userId) return;

    setIsDeleting(true);

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Authentication required. Please login again.');
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/users/${deleteModal.userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }

      toast.success('User deleted successfully!');
      setDeleteModal({ isOpen: false, userId: null, userName: '' });
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, userId: null, userName: '' });
  };

  return (
    <AdminLayout
      pageTitle="Users"
      pageSubtitle="Manage all system users"
      headerActions={
        <button
          onClick={fetchUsers}
          disabled={isLoadingUsers}
          className="p-2 rounded-xl text-[#64748b] hover:bg-[#E54E3D]/10 hover:text-[#E54E3D] transition-colors disabled:opacity-50"
          title="Refresh"
        >
          <svg className={`h-5 w-5 ${isLoadingUsers ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      }
    >
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Create User Button */}
          <div className="mb-6 flex items-center justify-between">
            <div></div>
            <button
              onClick={() => router.push('/admin/dashboard/users/create')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E54E3D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d14130] transition-colors shadow-lg"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create User
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-2xl bg-red-950/50 border border-red-800/50 p-4">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-red-300">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Users Table */}
          {isLoadingUsers ? (
            <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl p-12 shadow-xl border border-slate-700/50 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E54E3D] mx-auto mb-4"></div>
              <p className="text-slate-300">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl p-12 shadow-xl border border-slate-700/50 text-center">
              <svg className="h-16 w-16 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-white mb-2">No users found</h3>
              <p className="text-slate-400">There are no users in the system.</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-800/60 backdrop-blur-xl shadow-xl border border-slate-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50 border-b border-slate-600/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Full Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Role</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Created At</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-white">{user.username}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-300">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border capitalize ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-400">{formatDate(user.createdAt)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => router.push(`/admin/dashboard/users/edit/${user._id}`)}
                              className="p-2 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-colors"
                              title="Edit user"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(user._id, user.username)}
                              className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                              title="Delete user"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.total > 0 && (
                <div className="px-6 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-slate-400">
                    Showing <span className="font-semibold text-white">{(currentPage - 1) * pagination.limit + 1}</span> to <span className="font-semibold text-white">{Math.min(currentPage * pagination.limit, pagination.total)}</span> of <span className="font-semibold text-white">{pagination.total}</span> users
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-700/50 hover:bg-[#E54E3D] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700/50 transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {pagination.pages <= 7 ? (
                        // Show all pages if 7 or fewer
                        Array.from({ length: pagination.pages }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-w-[36px] ${
                                currentPage === pageNum
                                  ? 'bg-[#E54E3D] text-white'
                                  : 'text-white bg-slate-700/50 hover:bg-[#E54E3D]/50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })
                      ) : (
                        // Show first, last, and pages around current
                        <>
                          <button
                            onClick={() => setCurrentPage(1)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-w-[36px] ${
                              currentPage === 1
                                ? 'bg-[#E54E3D] text-white'
                                : 'text-white bg-slate-700/50 hover:bg-[#E54E3D]/50'
                            }`}
                          >
                            1
                          </button>
                          {currentPage > 3 && <span className="text-slate-400 px-1">...</span>}
                          {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                            let pageNum;
                            if (currentPage <= 3) {
                              pageNum = i + 2;
                            } else if (currentPage >= pagination.pages - 2) {
                              pageNum = pagination.pages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            if (pageNum <= 1 || pageNum >= pagination.pages) return null;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-w-[36px] ${
                                  currentPage === pageNum
                                    ? 'bg-[#E54E3D] text-white'
                                    : 'text-white bg-slate-700/50 hover:bg-[#E54E3D]/50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                          {currentPage < pagination.pages - 2 && <span className="text-slate-400 px-1">...</span>}
                          <button
                            onClick={() => setCurrentPage(pagination.pages)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors min-w-[36px] ${
                              currentPage === pagination.pages
                                ? 'bg-[#E54E3D] text-white'
                                : 'text-white bg-slate-700/50 hover:bg-[#E54E3D]/50'
                            }`}
                          >
                            {pagination.pages}
                          </button>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(pagination.pages, prev + 1))}
                      disabled={currentPage === pagination.pages}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-700/50 hover:bg-[#E54E3D] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700/50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="rounded-2xl bg-slate-800/95 backdrop-blur-xl shadow-2xl border border-slate-700/50 p-6 max-w-md w-full">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Delete User</h3>
                <p className="text-sm text-slate-300 mb-4">
                  Are you sure you want to delete <span className="font-semibold text-white">{deleteModal.userName}</span>? This action cannot be undone.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDeleteCancel}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-700/50 text-white font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

