'use client';
import React, { useEffect } from 'react';
import Index from '@/components/user/Subscription';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import DefaultLayout from '@/components/user/Layout/DefaultLayout';
import SubscriptionTable from '@/components/user/Subscription/SubscriptionTable';
function Page() {

    const { logout } = useAuth();
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                logout();
                router.push('/user');
                return;
            }
            try {
                await axios.post('/api/auth/verifyToken', { token });
            } catch (error: unknown) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    console.log("Token expired or invalid. Logging out...");
                    logout();
                    router.push('/user');
                }
            }
        };
        verifyToken();
    }, [token, router]);

    return (
        <DefaultLayout>
            <Index />
            <SubscriptionTable />
        </DefaultLayout>
    )
}

export default Page
