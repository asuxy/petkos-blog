import HomePage from '@/components/ui/home'
import prisma from '@/lib/prisma'

export default async function Page() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  return <HomePage posts={posts} />
}