-- CreateTable
CREATE TABLE "categoria" (
    "categoria_id" SERIAL NOT NULL,
    "categoria_nome" TEXT NOT NULL,
    "categoria_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "sub_categoria" (
    "sub_categoria_id" SERIAL NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "sub_categoria_nome" TEXT NOT NULL,
    "sub_categoria_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sub_categoria_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_categoria_pkey" PRIMARY KEY ("sub_categoria_id")
);

-- CreateTable
CREATE TABLE "imagem" (
    "imagem_id" SERIAL NOT NULL,
    "imagem_path" TEXT NOT NULL,
    "categoria_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoria_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imagem_pkey" PRIMARY KEY ("imagem_id")
);

-- CreateTable
CREATE TABLE "imagem_item" (
    "imagem_item_id" SERIAL NOT NULL,
    "imagem_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "sub_categoria_nome" TEXT NOT NULL,
    "sub_categoria_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sub_categoria_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imagem_item_pkey" PRIMARY KEY ("imagem_item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoria_categoria_nome_key" ON "categoria"("categoria_nome");

-- CreateIndex
CREATE UNIQUE INDEX "sub_categoria_sub_categoria_nome_key" ON "sub_categoria"("sub_categoria_nome");

-- CreateIndex
CREATE UNIQUE INDEX "imagem_item_sub_categoria_nome_key" ON "imagem_item"("sub_categoria_nome");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_sub_id_fkey" FOREIGN KEY ("product_sub_id") REFERENCES "sub_categoria"("sub_categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categoria" ADD CONSTRAINT "sub_categoria_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagem_item" ADD CONSTRAINT "imagem_item_imagem_id_fkey" FOREIGN KEY ("imagem_id") REFERENCES "imagem"("imagem_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagem_item" ADD CONSTRAINT "imagem_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
