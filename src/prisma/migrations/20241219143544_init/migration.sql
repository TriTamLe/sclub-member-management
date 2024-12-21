-- CreateTable
CREATE TABLE "houses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "houses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);
