-- CreateTable
CREATE TABLE "medical_duties" (
    "id" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medical_duties_pkey" PRIMARY KEY ("id")
);
