import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
})

// Async function NOT PrismaPromise
async function createA() {
    return prisma.test.create({ data: { name: 'a' } })
}

// Async function NOT PrismaPromise with error
async function createB() {
    const b = prisma.test.create({ data: { name: 'b' } })
    // error here
    throw new Error()
    return b
}

async function main() {
    const a: any = createA()
    const b: any = createB()
    await prisma.$transaction([a, b])
}

main()
    .then(() => {
        console.debug(1)
    })
    .catch((e) => {
        throw e
    })
    .finally(() => {
        // Disconnect later
        // I notice this and async function together cause the pb
        setTimeout(() => {
            prisma.$disconnect()
        }, 0)
    })
