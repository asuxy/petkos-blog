'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';

const FormSchema = z.object({
    id: z.string(),
    title: z.string().trim().nonempty({
        message: 'Title is required'
    }),
    content: z.string().trim().nonempty({
        message: 'Content is required'
    }),
});

export type State = {
    errors?: {
        title?: string[];
        content?: string[];
    };
    message?: string | null;
};

const CreatePost = FormSchema.omit({ id: true });
const UpdatePost = FormSchema.omit({ id: true });

export async function createPost(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = CreatePost.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Post.',
        };
    }

    const { title, content } = validatedFields.data;

    try {
        await prisma.post.create({
            data: {
                title,
                content,
                authorId: 1, //TODO
                published: true, //TODO
            },
        });
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create Post.',
        };
    }

    revalidatePath("/posts");
    redirect("/posts");
}

export async function updatePost(id: number, prevState: State, formData: FormData): Promise<State> {
    if (isNaN(id)) return { message: 'Invalid Post ID.' };

    const validatedFields = UpdatePost.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Post.',
        };
    }

    const { title, content } = validatedFields.data;

    try {
        await prisma.post.update({
            where: { id: id },
            data: {
                title,
                content,
            },
        });
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Update Post.',
        };
    }

    revalidatePath(`/posts`);
    revalidatePath(`/posts/${id}`);
    redirect(`/posts/${id}`);
}

export async function deletePost(id: number): Promise<void> {
    if (isNaN(id)) {
        console.error('Invalid Post ID for deletion:', id);
        return;
    }

    try {
        await prisma.post.delete({ where: { id: id } });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to delete post due to a database error.');
    }

    revalidatePath('/posts');
    redirect("/posts");
}