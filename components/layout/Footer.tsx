import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 py-6">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm max-w-5xl">
                <p>© {new Date().getFullYear()} My Awesome Blog. All rights reserved.</p>
            </div>
        </footer>
    )
}