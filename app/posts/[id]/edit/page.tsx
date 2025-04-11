import EditPostForm from '@/components/forms/EditPostForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Post } from '@prisma/client';

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
        notFound();
    }

    // Fetch the post data needed for the form
    const post: Post | null = await prisma.post.findUnique({
        where: { id: id },
        select: {
            id: true,
            title: true,
            content: true,
            published: true,
            authorId: true,
        }
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <EditPostForm post={post} />
        </div>
    )
}
