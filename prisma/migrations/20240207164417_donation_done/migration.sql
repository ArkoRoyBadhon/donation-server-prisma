-- CreateTable
CREATE TABLE "DonationDone" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "donationId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DonationDone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DonationDone" ADD CONSTRAINT "DonationDone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationDone" ADD CONSTRAINT "DonationDone_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
