'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Post } from '@prisma/client'

interface HomePageProps {
    posts: Pick<Post, 'id' | 'title' | 'content'>[]
}

export default function HomePage({ posts }: HomePageProps) {
    const latestPosts = posts.slice(0, 3)

    return (
        <div className="container max-w-5xl py-12 space-y-16">

            {/* Hero Section */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold">
                    Welcome to my corner of the web ✨
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Code is the closest thing we have to magic
                </p>
                <Button asChild>
                    <Link href="/posts">Read the Blog</Link>
                </Button>
            </section>

            {/* Latest Posts */}
            <section>
                <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {latestPosts.map((post) => (
                        <Link key={post.id} href={`/posts/${post.id}`}>
                            <Card className="h-full hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                                    <CardDescription>{ }</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {post.content?.slice(0, 100)}...
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Tech Showcase */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Behind the Scenes</h2>
                <div className="rounded-xl border p-6 bg-muted">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>⚡ Built with Next.js App Router (v15)</li>
                        <li>🧠 Auth with NextAuth v5 + Prisma</li>
                        <li>🎨 UI powered by Tailwind + shadcn/ui</li>
                        <li>💌 Emails via Resend integration</li>
                        <li>📬 Contact form with real-time validation</li>
                    </ul>
                </div>
            </section>

        </div>
    )
}