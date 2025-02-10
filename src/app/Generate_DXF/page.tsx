'use client';
import DefaultLayout from '@/components/user/Layout/DefaultLayout';
import React, { useEffect } from 'react';
import Title from '@/components/user/GenerateDXF/Title';
import Input from '@/components/user/GenerateDXF/Input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Contour from '@/components/user/GenerateDXF/Contour'

function Page() {  // Capitalized component name
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { userData,isAuthenticated } = useAuth();
  
  const router = useRouter();

  useEffect(() => {
    if (!token || !isAuthenticated) {
      router.push('/user');
    }
  }, [token, router]);

  return (
    <>
      {userData?.role === 'user' ? (
        <DefaultLayout>
          <Title />
          <Input />
          <Contour />
        </DefaultLayout>
      ) : null}
    </>
  );
}

export default Page;
