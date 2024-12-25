/*
  Warnings:

  - You are about to drop the column `avatar` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `houseId` on the `members` table. All the data in the column will be lost.
  - Added the required column `avatar_url` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender_id` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house_id` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_houseId_fkey";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "avatar",
DROP COLUMN "gender",
DROP COLUMN "houseId",
ADD COLUMN     "avatar_url" VARCHAR(2048) NOT NULL,
ADD COLUMN     "gender_id" INTEGER NOT NULL,
ADD COLUMN     "house_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "genders" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "genders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
