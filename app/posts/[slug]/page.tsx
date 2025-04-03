// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { getPostBySlug, getPosts, Post } from '@/lib/posts'; // Adjust import path

// Define the expected props, including the dynamic params
interface PostPageProps {
    params: {
        slug: string;
    };
}

// --- Static Site Generation (SSG) ---
// Tell Next.js which slugs to pre-render at build time
export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = await getPosts(); // Fetch all posts
    // Return an array of objects, each with a 'slug' property
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// --- Dynamic Metadata ---
// Generate metadata (like title and description) for each post page
export async function generateMetadata(
    { params }: PostPageProps,
    parent: ResolvingMetadata // Optional access to parent metadata
): Promise<Metadata> {
    const slug = params.slug;
    const post = await getPostBySlug(slug);

    if (!post) {
        // Optionally handle metadata for not found posts
        return {
            title: 'Post Not Found',
        };
    }

    // Get previous metadata fields (e.g., from root layout)
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: post.title,
        description: post.excerpt, // Use excerpt for meta description
        openGraph: { // Example Open Graph metadata for social sharing
            title: post.title,
            description: post.excerpt,
            images: post.imageUrl
                ? [
                    {
                        url: post.imageUrl,
                        width: 800, // Provide dimensions if known
                        height: 400,
                        alt: `Cover image for ${post.title}`,
                    },
                ]
                : [], // Add previousImages here if merging
        },
    };
}


// --- The Page Component ---
export default async function PostPage({ params }: PostPageProps) {
    const slug = params.slug;
    const post = await getPostBySlug(slug);

    // If the post doesn't exist (e.g., wrong slug), show the 404 page
    if (!post) {
        notFound(); // This Next.js function triggers the notFound UI
    }

    // Format the date nicely
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <article className="container mx-auto px-4 py-8 max-w-3xl"> {/* Limit width for readability */}
            {/* Optional Banner Image */}
            {post.imageUrl && (
                <div className="relative w-full h-64 md:h-80 mb-6 rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={post.imageUrl}
                        alt={`Banner for ${post.title}`}
                        layout="fill"
                        objectFit="cover"
                        priority // Prioritize loading the main image
                    />
                </div>
            )}

            {/* Post Header */}
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
                    {post.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Published on {formattedDate}
                </p>
            </header>

            {/* Post Content - Rendered from HTML string */}
            {/* Apply basic prose styling for Tailwind typography defaults */}
            <div
                className="prose prose-lg dark:prose-invert max-w-none" // prose classes style HTML tags
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Optional: Back link */}
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Link href="/posts" legacyBehavior>
                    <a className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        ← Back to all posts
                    </a>
                </Link>
            </div>
        </article>
    );
}