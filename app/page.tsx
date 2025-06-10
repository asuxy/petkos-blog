import HomePage from '@/components/ui/home'
import db from '@/lib/prisma'

export default async function Page() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  return <HomePage posts={posts} />
}