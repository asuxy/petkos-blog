import { PrismaClient, Prisma } from '../src/app/generated/prisma'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        name: 'Petko Petkov',
        email: 'petkov.k.petko@gmail.com',
        posts: {
            create: [
                {
                    title: 'Generated first initial post',
                    content: 'Has some content, for display purposes. Testing visibility and working with data',
                    published: true,
                },
                {
                    title: 'Second generated post',
                    content: 'This post is not published. Used for display purposes',
                },
            ],
        },
    },
    {
        name: 'Moni',
        email: 'monitoo@gmail.com',
        posts: {
            create: [
                {
                    title: 'Protein cookies recipe',
                    content: 'Some recipe about cookies. List of ingredients .....',
                    published: true,
                },
            ],
        },
    }
]

export async function main() {
    for (const u of userData) {
        await prisma.user.create({ data: u })
    }
}

main()