-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_emauil" TEXT NOT NULL,
    "user_cpf" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_phone" TEXT NOT NULL,
    "user_typeuser" INTEGER NOT NULL,
    "user_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_emauil_key" ON "User"("user_emauil");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_cpf_key" ON "User"("user_cpf");
