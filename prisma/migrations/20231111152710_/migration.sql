-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "product_sub_id" INTEGER NOT NULL,
    "product_nome" TEXT NOT NULL,
    "product_descrcao" TEXT NOT NULL,
    "product_valor" DOUBLE PRECISION NOT NULL,
    "product_imagem_id" INTEGER NOT NULL,
    "product_marca" INTEGER NOT NULL,
    "product_descricao" TEXT NOT NULL,
    "user_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_nome_key" ON "Product"("product_nome");
