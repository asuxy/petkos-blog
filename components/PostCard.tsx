// components/PostCard.js
import Link from 'next/link';
import Image from 'next/image'; // Use next/image for optimization
import { Post } from '@/lib/posts';

export default function PostCard({ post }: { post: Post }) {
    if (!post) return null;

    return (
        <Link href={`/posts/${post.slug}`} legacyBehavior>
            <a className="block border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out bg-white dark:bg-gray-800 dark:border-gray-700">
                {/* Optional Image */}
                {post.imageUrl && (
                    <div className="relative w-full h-48"> {/* Fixed height container */}
                        <Image
                            src={post.imageUrl}
                            alt={`Cover image for ${post.title}`}
                            layout="fill" // Fills the container
                            objectFit="cover" // Scales while maintaining aspect ratio, cropping if necessary
                            className="transition-transform duration-300 ease-in-out group-hover:scale-105" // Example hover effect (add 'group' to the link if needed)
                        />
                    </div>
                )}

                <div className="p-4">
                    {/* Optional Date */}
                    {post.date && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3"> {/* Limits excerpt to 3 lines */}
                        {post.excerpt}
                    </p>
                </div>
            </a>
        </Link>
    );
}