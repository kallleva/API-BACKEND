export interface ProductEditDTO {
  product_id: Int;
  product_sub_id: Int;
  product_nome: string;
  product_descrcao: string;
  product_valor: Float;
  product_imagem_id: Int;
  product_marca: Int;
  product_descricao: string;
  user_createdAt: Date;
  user_updatedAt: Date;
}
