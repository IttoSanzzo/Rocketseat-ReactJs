-- CreateTable
CREATE TABLE "userTimeIntervals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekDay" INTEGER NOT NULL,
    "timeStartInMinutes" INTEGER NOT NULL,
    "timeEndInMinutes" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "userTimeIntervals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
