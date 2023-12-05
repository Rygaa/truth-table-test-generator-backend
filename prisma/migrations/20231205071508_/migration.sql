-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "jwtokens" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
