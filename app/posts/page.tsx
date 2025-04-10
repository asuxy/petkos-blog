import React from 'react'
import PostCard from '@/components/PostCard';
import prisma from "@/lib/prisma";

export const metadata = {
    title: 'Blog Posts',
    description: 'Read the latest articles on our blog.',
};

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
        },
    });

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                Blog Posts
            </h1>

            {posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No posts found. Check back later!
                </p>
            )}
        </main>
    );
}
