import React from 'react';
import { Metadata } from 'next';
import { notFound } from "next/navigation";
import prisma from '@/lib/prisma';
import type { Post, User } from '@prisma/client';
import { DeletePostButton, UpdatePostButton, PublishPostButton, BackToPostsButton } from '@/components/ui/post-buttons';

interface PostPageProps {
    params: {
        id: string;
    };
}

type PostWithAuthor = Post & {
    author: User | null;
};

export async function generateStaticParams(): Promise<{ id: string }[]> {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
        }
    });

    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}

export async function generateMetadata(
    { params }: PostPageProps
): Promise<Metadata> {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
        return {
            title: 'Invalid Post ID',
        };
    }

    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: {
            title: true,
            content: true,
        }
    });

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    const excerpt = post.content?.substring(0, 155) + '...';

    return {
        title: post.title,
        description: excerpt, // Use generated excerpt
        openGraph: {
            title: post.title,
            description: excerpt,
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params;
    const postId = parseInt(id, 10);

    if (isNaN(postId)) {
        console.error(`Invalid post ID received: ${id}`);
        notFound();
    }

    const post: PostWithAuthor | null = await prisma.post.findUnique({
        where: { id: postId },
        include: {
            author: true,
        },
    });

    if (!post) {
        notFound();
    }

    const authorName = post.author?.name ?? 'Unknown Author';
    const renderContentAsHTML = true;

    return (
        <article className="container mx-auto px-4 py-8 max-w-3xl">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
                    {post.title}
                </h1>
                <div className='flex justify-between'>
                    <div className="text-gray-600 dark:text-gray-400 text-sm space-x-4">
                        <span>Published on </span>
                        {post.author && <span>by {authorName}</span>}
                    </div>
                    <div className="flex gap-2">
                        <UpdatePostButton id={postId} />
                        <PublishPostButton id={postId} />
                        <DeletePostButton id={postId} />
                    </div>
                </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                {renderContentAsHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
                ) : (
                    <p>Content rendering needs configuration (HTML or Markdown).</p>
                )}
            </div>

            <BackToPostsButton />
        </article>
    );
}
