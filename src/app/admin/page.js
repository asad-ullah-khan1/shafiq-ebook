'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    // Check admin status
    useEffect(() => {
        const checkAdminStatus = () => {
            // Check localStorage first
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                const parsedData = JSON.parse(storedUserData);
                if (parsedData.role === 'admin') {
                    setIsAdmin(true);
                    return;
                }
            }

            // If not in localStorage, check session
            if (session?.user?.role === 'admin') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
                router.push('/');
            }
        };

        if (status !== 'loading') {
            checkAdminStatus();
        }
    }, [session, status, router]);

    // Fetch users when admin status is confirmed
    useEffect(() => {
        if (isAdmin && status === 'authenticated') {
            fetchUsers();
        }
    }, [isAdmin, status]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            setUsers(data.users);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (userId) => {
        try {
            const res = await fetch('/api/admin/approve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            fetchUsers();
        } catch (error) {
            setError(error.message);
        }
    };

    // Initial loading state
    if (status === 'loading' || (status === 'authenticated' && !isAdmin)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    // Not admin
    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Unauthorized Access</h2>
                    <p className="text-gray-600">You don't have permission to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-2 text-sm text-gray-600">Manage users and their subscription statuses.</p>
                </div>
            </div>

            {error && (
                <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-lg font-semibold text-gray-700">Loading...</div>
            ) : (
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                                Username
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Email
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Subscription Tier
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Payment Status
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                    {user.username}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {user.subscriptionTier}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {user.paymentStatus}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {user.paymentStatus === 'pending' && (
                                                        <button
                                                            onClick={() => handleApprove(user._id)}
                                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}