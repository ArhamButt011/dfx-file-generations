'use client';
import DefaultLayout from '@/components/user/Layout/DefaultLayout';
import React, { useEffect } from 'react';
import Title from '@/components/user/GenerateDXF/Title';
import Input from '@/components/user/GenerateDXF/Input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

function Page() {
  const { userData, logout } = useAuth();
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
    <>
      {userData?.role === 'user' ? (
        <DefaultLayout>
          <Title />
          <Input />
        </DefaultLayout>
      ) : null}
    </>
  );
}

export default Page;