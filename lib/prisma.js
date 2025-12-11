import { PrismaClient } from '@prisma/client'

// Create a single PrismaClient instance and reuse it across the app.
// This prevents creating multiple connections during hot reload in development.
const globalWithPrisma = globalThis

const prisma = globalWithPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalWithPrisma.prisma = prisma

export default prisma
