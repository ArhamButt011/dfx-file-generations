'use client'
import React, { FormEvent, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';

function signup() {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(email)
            const res = await fetch('/api/user/addEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.message)
            }
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: "Our Team will reach out to you soon",
                timer: 2000,
                showConfirmButton:false,
            })
            setEmail('');

        }
        catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err instanceof Error ? err.message : String(err),
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
            })
        }
        finally {
            setLoading(false);
        }

    }
    return (
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100000]">
                    <ClipLoader color="#007bff" size={50} />
                </div>
            )}
            <h1 className="text-[32px] text-center font-foghe font-normal text-graish">
                Get Updated Or Support New Ideas!!
            </h1>
            <p className="text-[16px] text-center font-sofiapro font-normal text-[#888888] mob:px-4">
                Stay in the loop as we get ready to launch Lumashape! Sign up with your email below for exclusive updates and early access.
            </p>
            <form onSubmit={handleSignIn}>
                <div className="flex justify-center gap-[8px] mt-8 mb-12">
                    <input
                        className="w-full max-w-[239px] h-[40px] px-3 border-[1px] outline-none  rounded-xl  placeholder:text-[14px] placeholder:font-foghe"
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
                        placeholder="Enter your email address"
                    />
                    <button type="submit" className="bg-[#266CA8] text-white w-[98px] h-[41.2px] font-normal text-[14px] rounded-xl">
                        Sign up
                    </button>
                </div>
            </form>

        </>
    )
}

export default signup
