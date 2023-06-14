import React from 'react';
import Link from 'next/link';

export default function Custom404() {
    return (
    <div className='p-5'>
        <div className=' bg-black flex flex-col items-center p-5 max-w-5xl mx-auto shadow-[0px_0px_1px_1px_#CBD5E0] rounded-xl mt-10 text-white'>
            <h1 className='text-4xl font-bold text-center p-5 '>404 - Page Not Found</h1>
            <p className=' text-center font-semibold p-6'>Sorry!! The page you are looking for does not exist. You may have mistyped the address or the page may have moved.</p>
            <Link href="/">
                <button className="px-4 py-2 text-black bg-white rounded hover:bg-red-600 shadow-lg">
                    Go back home
                </button>
            </Link>
        </div>
    </div>
    )
}
