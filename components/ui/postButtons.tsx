import { deletePost } from '@/lib/actions/blogActions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button, buttonVariants } from './button';
import { cn } from '@/lib/utils';

export function CreatePostButton() {
    return (
        <Link
            href="/posts/new"
            className={cn(buttonVariants({ variant: 'default' }))} // Apply variants directly
        >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Post
        </Link>
    );
}

export function UpdatePostButton({ id }: { id: number }) {
    return (
        <Link
            href={`/posts/${id}/edit`}
            title="Edit Post"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))} // Ghost variant, icon size
        >
            <span className="sr-only">Edit Post</span>
            <PencilIcon className="h-5 w-5" /> {/* Adjust icon size */}
        </Link>
    );
}
function DeleteSubmitButton() {
    return (
        <Button
            variant="destructive" // Destructive variant
            size="icon" // Icon size
            type="submit"
            title="Delete Post"
        >
            <span className="sr-only">Delete Post</span>
            <TrashIcon className="h-5 w-5" /> {/* Adjust icon size */}
        </Button>
    );
}

export function DeletePostButton({ id }: { id: number }) {
    const deletePostWithId = deletePost.bind(null, id);

    return (
        <form action={deletePostWithId}>
            {/* Add confirmation later: onClick={(e) => !confirm('Are you sure?') && e.preventDefault()} */}
            <DeleteSubmitButton /> {/* Render the button that uses useFormStatus */}
        </form>
    );
}
