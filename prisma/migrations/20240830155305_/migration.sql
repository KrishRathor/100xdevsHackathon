-- CreateTable
CREATE TABLE "Pr" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bountyId" TEXT NOT NULL,
    "solverId" TEXT NOT NULL,

    CONSTRAINT "Pr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solver" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publicAdress" TEXT NOT NULL,
    "githubUsername" TEXT NOT NULL,

    CONSTRAINT "Solver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solver_publicAdress_key" ON "Solver"("publicAdress");
