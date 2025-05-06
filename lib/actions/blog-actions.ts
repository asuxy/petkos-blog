'use server'

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postSchema } from "../zod-schemas";

export type State = {
    errors?: {
        title?: string[];
        content?: string[];
    };
    message?: string | null;
};

const CreatePost = postSchema.omit({ id: true });
const UpdatePost = postSchema.omit({ id: true });

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

    let post;

    try {
        post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: 1, //TODO
                published: false,
            },
        });

        console.log(post);
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create Post.',
        };
    }

    revalidatePath("/posts");
    revalidatePath(`/posts/${post.id}`);
    redirect(`/posts/${post.id}`);
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

export async function publishPost(id: number): Promise<void> {
    try {
        const post = await prisma.post.findUnique({ where: { id } });

        if (!post) {
            throw new Error("Post not found");
        }

        await prisma.post.update({
            where: { id },
            data: {
                published: true,
                publishedAt: Date.now().toLocaleString(),
            },
        });

    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to publish post due to a database error.");
    }

    revalidatePath("/posts");
    redirect("/posts");
}

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany();

        const categoryOptions = categories.map((c) => ({
            label: c.name,
            value: String(c.id),
        }))

        return categoryOptions;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to load categories");
    }
}