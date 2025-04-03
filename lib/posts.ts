// Define the structure of a single post
export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    imageUrl?: string; // Optional image URL
    date: string; // Keep as string for simplicity, can parse later
    content: string; // Add full content for the individual page
}

export const mockPosts: Post[] = [
    {
        id: '1',
        slug: 'first-post',
        title: 'My First Blog Post',
        excerpt: 'This is a short summary of my very first blog post. It talks about exciting things!',
        imageUrl: 'https://placehold.co/600x400?text=Hello+World',
        date: '2023-10-27',
        content: `
            <p>This is the <strong>full content</strong> of the first blog post.</p>
            <p>You can use HTML here if you're generating it from Markdown or a CMS.</p>
            <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      `,
    },
    {
        id: '2',
        slug: 'tailwind-css-intro',
        title: 'Getting Started with Tailwind CSS',
        excerpt: 'Learn the basics of Tailwind CSS and how it speeds up UI development. Utility-first is awesome.',
        imageUrl: 'https://placehold.co/600x400/orange/white',
        date: '2023-10-26',
        content: `
            <p>Tailwind CSS is a utility-first CSS framework packed with classes like <code>flex</code>, <code>pt-4</code>, <code>text-center</code> and <code>rotate-90</code> that can be composed to build any design, directly in your markup.</p>
            <h2>Why Utility-First?</h2>
            <p>Instead of writing custom CSS, you apply pre-existing classes directly in your HTML.</p>
            <pre><code class="language-html"><div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <!-- ... -->
            </div></code></pre>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      `,
    },
    {
        id: '3',
        slug: 'nextjs-features',
        title: 'Exploring Cool Next.js Features',
        excerpt: 'A dive into server components, routing, and image optimization in Next.js.',
        imageUrl: 'https://placehold.co/600x400?font=roboto',
        date: '2023-10-25',
        content: `
            <p>Next.js offers fantastic features out-of-the-box.</p>
            <h3>Server Components</h3>
            <p>Fetch data directly on the server, reducing client-side JavaScript.</p>
            <h3>App Router</h3>
            <p>A new paradigm for routing and layouts in Next.js 13+.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        `,
    },
    {
        id: '4',
        slug: 'react-hooks-deep-dive',
        title: 'React Hooks: A Deep Dive',
        excerpt: 'Understanding useState, useEffect, and custom hooks in depth.',
        imageUrl: 'https://placehold.co/600x400@2x.png',
        date: '2023-10-24',
        content: `
            <p>React Hooks revolutionized how we write functional components.</p>
            <h4>useState</h4>
            <p>Manages local component state.</p>
            <h4>useEffect</h4>
            <p>Handles side effects like data fetching or subscriptions.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `,
    },
];

export const getPosts = async (): Promise<Post[]> => {
    // In a real app: fetch from API, CMS, read files, etc.
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
    return mockPosts;
};


export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return mockPosts.find(post => post.slug === slug);
}
