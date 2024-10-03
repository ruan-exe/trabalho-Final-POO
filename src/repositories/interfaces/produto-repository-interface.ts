import { Produto } from "../../entities/produto";

export interface IProdutoRepository {
  create(produto: Produto): Promise<Produto>;
  atualizaProduto(produto: Produto): Promise<Produto>;
  atualizaEstoque(idProduto: string, produto: Produto): Promise<Produto>;
  findById(id: string): Promise<Produto | undefined>;
  findByDesc(descricao: string): Promise<Produto | undefined>;
}

