-- CreateTable
CREATE TABLE "runner_metrics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "step" INTEGER NOT NULL,
    "tag" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "runId" TEXT NOT NULL,

    CONSTRAINT "runner_metrics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "runner_metrics" ADD CONSTRAINT "runner_metrics_runId_fkey" FOREIGN KEY ("runId") REFERENCES "runs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
