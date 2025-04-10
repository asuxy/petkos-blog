// components/PostCard.js
import Link from 'next/link';
import { notFound } from "next/navigation";
import type { Post, User } from '@prisma/client';

type PostWithAuthor = Post & {
    author: User | null;
};

interface PostCardProps {
    post: PostWithAuthor;
}

export default async function PostCard({ post }: PostCardProps) {
    if (!post) {
        // Although unlikely if called correctly from PostsPage, good practice
        return notFound();;
    }

    const authorName = post.author?.name ?? 'Unknown Author';
    const postPreview = post.content?.substring(0, 100) + '...';

    return (
        <Link href={`/posts/${post.id}`} legacyBehavior>
            <a className="block border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out bg-white dark:bg-gray-800 dark:border-gray-700">
                {/*post.imageUrl && (
                    <div className="relative w-full h-48">
                        <Image
                            src={post.imageUrl}
                            alt={`Cover image for ${post.title}`}
                            layout="fill"
                            objectFit="cover" 
                            className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    </div>
                )*/}

                <div className="p-4">
                    {/*
                    {post.date && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    )}
                    */}

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        By {authorName}
                    </p>

                    {/* Excerpt */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                        {postPreview}
                    </p>
                </div>
            </a>
        </Link>
    );
}