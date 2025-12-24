-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "imageBucket" TEXT,
ADD COLUMN     "imagePath" TEXT;

-- CreateIndex
CREATE INDEX "Listing_expiresAt_idx" ON "Listing"("expiresAt");
