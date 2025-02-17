import React from 'react'
import DefaultLayout from '@/components/user/Layout/DefaultLayout';
import FilesTable from '@/components/user/Files/FilesTable';

function Page() {
    return (
        <DefaultLayout>
            <FilesTable />
        </DefaultLayout>
    )
}

export default Page
