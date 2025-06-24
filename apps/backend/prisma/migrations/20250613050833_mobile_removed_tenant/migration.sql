/*
  Warnings:

  - You are about to drop the column `mobile` on the `Tenant` table. All the data in the column will be lost.
  - Made the column `phone` on table `Tenant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "mobile",
ALTER COLUMN "phone" SET NOT NULL;
