-- CreateTable
CREATE TABLE "Reserve" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    CONSTRAINT "Reserve_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserve_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Reserve_house_id_key" ON "Reserve"("house_id");
