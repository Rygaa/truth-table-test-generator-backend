-- CreateTable
CREATE TABLE "condition" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "projectId" TEXT NOT NULL,

    CONSTRAINT "condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "condition" ADD CONSTRAINT "condition_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
