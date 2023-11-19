-- CreateTable
CREATE TABLE "Cliente" (
    "cliente_id" SERIAL NOT NULL,
    "cliente_name" TEXT NOT NULL,
    "cliente_email" TEXT NOT NULL,
    "cliente_cpf" TEXT NOT NULL,
    "cliente_phone" TEXT NOT NULL,
    "cliente_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cliente_id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "pedido_id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "pedido_status" TEXT NOT NULL,
    "pedido_valor_total" DOUBLE PRECISION NOT NULL,
    "pedido_frete_total" DOUBLE PRECISION NOT NULL,
    "pedido_data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_pagamento_id" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("pedido_id")
);

-- CreateTable
CREATE TABLE "Pedido_item" (
    "Pedido_item_id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "Pedido_item_valor" DOUBLE PRECISION NOT NULL,
    "Pedido_item_qtd" INTEGER NOT NULL,

    CONSTRAINT "Pedido_item_pkey" PRIMARY KEY ("Pedido_item_id")
);

-- CreateTable
CREATE TABLE "Tipo_Pagamento" (
    "tipo_pagamento_id" SERIAL NOT NULL,
    "tipo_pagamento_name" TEXT NOT NULL,
    "tipo_pagamento_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_pagamento_updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipo_Pagamento_pkey" PRIMARY KEY ("tipo_pagamento_id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_tipo_pagamento_id_fkey" FOREIGN KEY ("tipo_pagamento_id") REFERENCES "Tipo_Pagamento"("tipo_pagamento_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido_item" ADD CONSTRAINT "Pedido_item_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "Pedido"("pedido_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido_item" ADD CONSTRAINT "Pedido_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
