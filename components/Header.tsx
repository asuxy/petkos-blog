import Link from 'next/link'
import React from 'react'
import HeaderInfo from './HeaderInfo'

const Header = () => {
    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-5xl">
                <Link href='/' className="text-xl font-bold hover:text-gray-300">
                    Home
                </Link>
                <nav className="space-x-6">
                    <Link href='/about' className="hover:text-blue-400">
                        About
                    </Link>
                    <Link href='/posts' className="hover:text-blue-400">
                        Blog
                    </Link>
                    <Link href='/contacts' className="hover:text-blue-400">
                        Contacts
                    </Link>
                </nav>
                <p>
                    login
                </p>
            </div>
            <HeaderInfo />
        </header>
    )
}

export default Header