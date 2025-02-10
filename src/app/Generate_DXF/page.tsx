'use client';
import DefaultLayout from '@/components/user/Layout/DefaultLayout';
import React, { useEffect } from 'react';
import Title from '@/components/user/GenerateDXF/Title';
import Input from '@/components/user/GenerateDXF/Input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function Page() {  // Capitalized component name
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/user');
    }
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
