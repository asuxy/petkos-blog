import { deletePost, publishPost } from '@/lib/actions/blog-actions';
import Link from 'next/link';
import { Button } from './button';
import { RocketIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

export function CreatePostButton() {
    return (
        <Button asChild>
            <Link href="/posts/new">
                <PlusIcon className="h-5 w-5 mr-2" />
                New Post
            </Link>
        </Button>
    );
}

export function UpdatePostButton({ id }: { id: number }) {
    return (
        <Button variant="secondary" size="icon">
            <Link href={`/posts/${id}/edit`} title="Edit Post">
                <span className="sr-only">Edit Post</span>
                <PencilIcon className="h-4 w-4" />
            </Link>
        </Button>
    );
}

export function DeletePostButton({ id }: { id: number }) {
    const action = deletePost.bind(null, id);
    return (
        <form action={action}>
            <Button
                variant="destructive"
                size="icon"
                type="submit"
                title="Delete Post"
            >
                <span className="sr-only">Delete Post</span>
                <TrashIcon className="h-4 w-4" />
            </Button>
        </form>
    );
}

export function PublishPostButton({ id }: { id: number }) {
    const action = publishPost.bind(null, id);
    return (
        <form action={action}>
            <Button variant="secondary" size="icon">
                <span className="sr-only">Publish Post</span>
                <RocketIcon className="h-4 w-4" />
            </Button>
        </form>
    );
}

export function BackToPostsButton() {
    return (
        <div className="mt-12 pt-6 border-t border-border">
            <Button asChild variant="link" className="text-base">
                <Link href="/posts">
                    ← Back to all posts
                </Link>
            </Button>
        </div>
    )
}