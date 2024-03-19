import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// PrismaClient가 global에 없는 경우에만 인스턴스화
const prisma = globalThis.prisma || new PrismaClient();

// 프로덕션 상태가 아닐 때 globalThis 개체에 저장
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
