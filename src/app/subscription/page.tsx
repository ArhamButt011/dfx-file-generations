import React from 'react'
import Index from '@/components/user/Subscription';
import DefaultLayout from '@/components/user/Layout/DefaultLayout';
import SubscriptionTable from '@/components/user/Subscription/SubscriptionTable';
function Page() {
    return (
        <DefaultLayout>
            <Index />
            <SubscriptionTable />
        </DefaultLayout>
    )
}

export default Page
