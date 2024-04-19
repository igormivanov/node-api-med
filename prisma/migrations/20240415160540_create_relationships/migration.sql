-- AlterTable
ALTER TABLE "medical_duties" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "medical_duties" ADD CONSTRAINT "medical_duties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
